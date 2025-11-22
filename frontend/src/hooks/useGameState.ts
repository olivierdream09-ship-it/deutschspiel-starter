import { useState, useCallback } from 'react';

interface GameState {
  isPlaying: boolean;
  score: number;
  startTime: number | null;
  endTime: number | null;
}

interface UseGameStateReturn extends GameState {
  startGame: () => void;
  updateScore: (points: number) => void;
  endGame: (finalScore: number) => void;
  resetGame: () => void;
}

export const useGameState = (gameType: string): UseGameStateReturn => {
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    score: 0,
    startTime: null,
    endTime: null
  });

  const startGame = useCallback(() => {
    setGameState({
      isPlaying: true,
      score: 0,
      startTime: Date.now(),
      endTime: null
    });
  }, []);

  const updateScore = useCallback((points: number) => {
    setGameState(prev => ({
      ...prev,
      score: prev.score + points
    }));
  }, []);

  const endGame = useCallback((finalScore: number) => {
    setGameState(prev => ({
      ...prev,
      isPlaying: false,
      score: finalScore,
      endTime: Date.now()
    }));

    // Sauvegarder les résultats (à implémenter avec l'API)
    saveGameResults(gameType, finalScore);
  }, [gameType]);

  const resetGame = useCallback(() => {
    setGameState({
      isPlaying: false,
      score: 0,
      startTime: null,
      endTime: null
    });
  }, []);

  const saveGameResults = async (type: string, score: number) => {
    try {
      // À implémenter avec l'API réelle
      console.log('Saving game results:', { type, score });
      // await fetch('/api/games/session', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ gameType: type, score })
      // });
    } catch (error) {
      console.error('Error saving game results:', error);
    }
  };

  return {
    ...gameState,
    startGame,
    updateScore,
    endGame,
    resetGame
  };
};

export default useGameState;
