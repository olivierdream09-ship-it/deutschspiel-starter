import express from 'express';
import { GameSessionModel } from '../models/GameSession';
import { VocabularyModel } from '../models/Vocabulary';
import { UserModel } from '../models/User';

const router = express.Router();

// Démarrer une nouvelle session de jeu
router.post('/session', async (req, res) => {
  try {
    const { gameType, difficulty, category, userId } = req.body;

    // Récupérer le vocabulaire approprié
    let vocabulary;
    if (category) {
      vocabulary = await VocabularyModel.findByCategory(category, difficulty);
    } else {
      vocabulary = await VocabularyModel.findByLevel(difficulty);
    }

    // Créer la session
    const session = await GameSessionModel.create({
      userId,
      gameType,
      difficultyLevel: difficulty,
      maxScore: 1000,
      metadata: { category, vocabularyCount: vocabulary.length }
    });

    res.json({
      sessionId: session.id,
      vocabulary: vocabulary,
      gameConfig: {
        type: gameType,
        difficulty,
        maxTime: 300, // 5 minutes
        maxScore: 1000
      }
    });
  } catch (error) {
    console.error('Error starting game session:', error);
    res.status(500).json({ error: 'Erreur lors du démarrage de la session' });
  }
});

// Terminer une session de jeu
router.post('/session/:sessionId/complete', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { score, timeSpent, userId } = req.body;

    const session = await GameSessionModel.completeSession(sessionId, score, timeSpent);
    
    // Mettre à jour les XP de l'utilisateur
    await UserModel.updateProgress(userId, score);

    // Mettre à jour les statistiques d'usage du vocabulaire
    if (req.body.usedVocabulary) {
      for (const vocab of req.body.usedVocabulary) {
        await VocabularyModel.updateUsageStats(vocab.wordId, vocab.isCorrect);
      }
    }

    res.json({
      success: true,
      session: session,
      xpEarned: score,
      levelUp: false // À implémenter avec la logique de niveau
    });
  } catch (error) {
    console.error('Error completing game session:', error);
    res.status(500).json({ error: 'Erreur lors de la sauvegarde des résultats' });
  }
});

// Obtenir les statistiques de jeu d'un utilisateur
router.get('/user/:userId/stats', async (req, res) => {
  try {
    const { userId } = req.params;
    const stats = await GameSessionModel.getUserStats(userId);
    res.json(stats);
  } catch (error) {
    console.error('Error getting user stats:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des statistiques' });
  }
});

// Obtenir le classement
router.get('/leaderboard', async (req, res) => {
  try {
    const { period = 'weekly' } = req.query;
    
    // Implémentation simplifiée du classement
    const result = await pool.query(`
      SELECT u.username, u.total_xp, u.current_level
      FROM users u
      ORDER BY u.total_xp DESC
      LIMIT 10
    `);

    res.json({ leaderboard: result.rows, period });
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du classement' });
  }
});

// Note: pool doit être importé depuis User.ts
const pool = require('./User').default;

export default router;
