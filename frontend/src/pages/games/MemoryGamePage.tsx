import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MemoryGame from '../../components/games/MemoryGame/MemoryGame';
import GameDifficultySelector from '../../components/games/GameDifficultySelector';
import GameStats from '../../components/games/GameStats';
import { VocabularyItem } from '../../types/game';
import './MemoryGamePage.css';

const MemoryGamePage: React.FC = () => {
  const [difficulty, setDifficulty] = useState<string>('A1');
  const [category, setCategory] = useState<string>('all');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameStats, setGameStats] = useState<any>(null);

  // Données de démonstration - En production, ça viendra de l'API
  const demoVocabulary: VocabularyItem[] = [
    { id: '1', german_word: 'Haus', translation: 'maison', article: 'das', level: 'A1', category: 'habitation' },
    { id: '2', german_word: 'Buch', translation: 'livre', article: 'das', level: 'A1', category: 'éducation' },
    { id: '3', german_word: 'Freund', translation: 'ami', article: 'der', level: 'A1', category: 'social' },
    { id: '4', german_word: 'Apfel', translation: 'pomme', article: 'der', level: 'A1', category: 'nourriture' },
    { id: '5', german_word: 'Wasser', translation: 'eau', article: 'das', level: 'A1', category: 'nourriture' },
    { id: '6', german_word: 'Mutter', translation: 'mère', article: 'die', level: 'A1', category: 'famille' },
    { id: '7', german_word: 'Schule', translation: 'école', article: 'die', level: 'A1', category: 'éducation' },
    { id: '8', german_word: 'Auto', translation: 'voiture', article: 'das', level: 'A1', category: 'transport' },
    { id: '9', german_word: 'Hund', translation: 'chien', article: 'der', level: 'A1', category: 'animaux' },
    { id: '10', german_word: 'Katze', translation: 'chat', article: 'die', level: 'A1', category: 'animaux' },
    { id: '11', german_word: 'Vater', translation: 'père', article: 'der', level: 'A1', category: 'famille' },
    { id: '12', german_word: 'Bruder', translation: 'frère', article: 'der', level: 'A1', category: 'famille' }
  ];

  const handleGameComplete = (score: number, timeSpent: number, moves: number) => {
    setGameStats({
      score,
      timeSpent,
      moves,
      accuracy: (demoVocabulary.length / moves) * 100
    });
    setGameStarted(false);
  };

  const startNewGame = () => {
    setGameStarted(true);
    setGameStats(null);
  };

  if (!gameStarted) {
    return (
      <div className="memory-game-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="game-setup"
        >
          <div className="game-header">
            <h1>🎴 Wortmeister - Memory Vocabulaire</h1>
            <p>Trouvez les paires de mots allemands et leurs traductions françaises</p>
          </div>

          {gameStats && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="game-results"
            >
              <h2>🎉 Partie Terminée !</h2>
              <div className="results-grid">
                <div className="result-item">
                  <span className="result-value">{gameStats.score}</span>
                  <span className="result-label">Points</span>
                </div>
                <div className="result-item">
                  <span className="result-value">{gameStats.moves}</span>
                  <span className="result-label">Coups</span>
                </div>
                <div className="result-item">
                  <span className="result-value">{Math.round(gameStats.timeSpent / 60)}:{(gameStats.timeSpent % 60).toString().padStart(2, '0')}</span>
                  <span className="result-label">Temps</span>
                </div>
                <div className="result-item">
                  <span className="result-value">{Math.round(gameStats.accuracy)}%</span>
                  <span className="result-label">Précision</span>
                </div>
              </div>
            </motion.div>
          )}

          <GameDifficultySelector
            difficulty={difficulty}
            category={category}
            onDifficultyChange={setDifficulty}
            onCategoryChange={setCategory}
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="start-game-button"
            onClick={startNewGame}
          >
            🎮 Commencer une Nouvelle Partie
          </motion.button>

          <div className="game-instructions">
            <h3>📋 Comment Jouer ?</h3>
            <ul>
              <li>Retournez deux cartes à la fois pour trouver les paires</li>
              <li>Associez les mots allemands avec leurs traductions françaises</li>
              <li>Moins de coups = plus de points !</li>
              <li>Le chronomètre démarre quand vous commencez à jouer</li>
            </ul>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="memory-game-page">
      <MemoryGame
        vocabulary={demoVocabulary.filter(word => 
          (difficulty === 'all' || word.level === difficulty) &&
          (category === 'all' || word.category === category)
        ).slice(0, 8)} // 8 paires pour commencer
        onGameComplete={handleGameComplete}
      />
    </div>
  );
};

export default MemoryGamePage;
