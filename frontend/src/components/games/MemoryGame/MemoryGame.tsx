import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MemoryCard, VocabularyItem } from '../../../types/game';
import MemoryCardComponent from './MemoryCardComponent';
import GameHeader from './GameHeader';
import GameControls from './GameControls';
import { useGameTimer } from '../../../hooks/useGameTimer';
import './MemoryGame.css';

interface MemoryGameProps {
  vocabulary: VocabularyItem[];
  onGameComplete: (score: number, timeSpent: number, moves: number) => void;
}

const MemoryGame: React.FC<MemoryGameProps> = ({ vocabulary, onGameComplete }) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameStatus, setGameStatus] = useState<'idle' | 'playing' | 'completed'>('idle');
  
  const { time, startTimer, stopTimer, resetTimer } = useGameTimer();

  // Initialiser le jeu
  const initializeGame = useCallback(() => {
    const gameCards: MemoryCard[] = vocabulary.flatMap((word, index) => [
      {
        id: index * 2,
        type: 'german',
        content: word.german_word,
        pairId: index,
        article: word.article,
        audioUrl: word.audio_url
      },
      {
        id: index * 2 + 1,
        type: 'translation',
        content: word.translation,
        pairId: index
      }
    ]);

    // Mélanger les cartes
    const shuffledCards = [...gameCards].sort(() => Math.random() - 0.5);
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameStatus('idle');
    resetTimer();
  }, [vocabulary, resetTimer]);

  // Démarrer le jeu au premier clic
  const startGame = () => {
    if (gameStatus === 'idle') {
      setGameStatus('playing');
      startTimer();
    }
  };

  // Gérer le clic sur une carte
  const handleCardClick = useCallback((cardId: number) => {
    if (gameStatus !== 'playing') {
      startGame();
    }

    if (flippedCards.length >= 2 || flippedCards.includes(cardId) || matchedCards.includes(cardId)) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      checkForMatch(newFlippedCards);
    }
  }, [flippedCards, matchedCards, gameStatus]);

  // Vérifier si les cartes retournées forment une paire
  const checkForMatch = (flipped: number[]) => {
    const [firstId, secondId] = flipped;
    const firstCard = cards.find(c => c.id === firstId);
    const secondCard = cards.find(c => c.id === secondId);

    if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
      // Match trouvé !
      setMatchedCards(prev => [...prev, firstCard.pairId]);
      setFlippedCards([]);
      
      // Vérifier si le jeu est terminé
      if (matchedCards.length + 1 === cards.length / 2) {
        completeGame();
      }
    } else {
      // Pas de match, retourner les cartes après un délai
      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  };

  // Terminer le jeu
  const completeGame = () => {
    stopTimer();
    setGameStatus('completed');
    
    const score = calculateScore(moves + 1, time, cards.length / 2);
    onGameComplete(score, time, moves + 1);
  };

  // Calculer le score
  const calculateScore = (totalMoves: number, totalTime: number, totalPairs: number): number => {
    const baseScore = 1000;
    const perfectMoves = totalPairs * 2;
    const moveEfficiency = Math.max(0, perfectMoves / totalMoves);
    const timeEfficiency = Math.max(0, 1 - (totalTime / 300)); // 5 minutes max
    
    return Math.round(baseScore * moveEfficiency * timeEfficiency);
  };

  // Réinitialiser le jeu
  const handleRestart = () => {
    initializeGame();
  };

  // Initialiser le jeu au chargement
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return (
    <div className="memory-game">
      <GameHeader
        moves={moves}
        time={time}
        matchedPairs={matchedCards.length}
        totalPairs={cards.length / 2}
        gameStatus={gameStatus}
      />

      <div className="memory-board">
        {cards.map((card) => (
          <MemoryCardComponent
            key={card.id}
            card={card}
            isFlipped={flippedCards.includes(card.id) || matchedCards.includes(card.pairId)}
            isMatched={matchedCards.includes(card.pairId)}
            onClick={() => handleCardClick(card.id)}
            disabled={flippedCards.length === 2}
          />
        ))}
      </div>

      <GameControls
        onRestart={handleRestart}
        gameStatus={gameStatus}
        moves={moves}
        time={time}
      />

      {/* Modal de fin de jeu */}
      <AnimatePresence>
        {gameStatus === 'completed' && (
          <motion.div
            className="completion-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="completion-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <div className="completion-content">
                <motion.div
                  className="trophy"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  🏆
                </motion.div>
                
                <h2>Félicitations !</h2>
                <p>Vous avez terminé le jeu !</p>
                
                <div className="completion-stats">
                  <div className="stat">
                    <span className="value">{moves}</span>
                    <span className="label">Coups</span>
                  </div>
                  <div className="stat">
                    <span className="value">
                      {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
                    </span>
                    <span className="label">Temps</span>
                  </div>
                  <div className="stat">
                    <span className="value">
                      {calculateScore(moves, time, cards.length / 2)}
                    </span>
                    <span className="label">Points</span>
                  </div>
                  <div className="stat">
                    <span className="value">
                      {Math.round((matchedCards.length / (cards.length / 2)) * 100)}%
                    </span>
                    <span className="label">Précision</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="play-again-btn"
                  onClick={handleRestart}
                >
                  🎮 Rejouer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoryGame;
