import express from 'express';
import { UserModel } from '../models/User';
import { UserSkills } from '../models/UserSkills';

const router = express.Router();

// Obtenir le profil utilisateur
router.get('/:userId/profile', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const skills = await UserSkills.findByUserId(userId);
    const gameStats = await getGameStats(userId);

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        level: user.current_level,
        xp: user.total_xp,
        streak: user.daily_streak
      },
      skills,
      stats: gameStats
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du profil' });
  }
});

// Mettre à jour la progression
router.post('/:userId/progress', async (req, res) => {
  try {
    const { userId } = req.params;
    const { xp, level, skills } = req.body;

    if (xp) {
      await UserModel.updateProgress(userId, xp, level);
    }

    if (skills) {
      for (const skill of skills) {
        await UserSkills.updateSkill(
          userId, 
          skill.skillType, 
          skill.skillName, 
          skill.isCorrect
        );
      }
    }

    res.json({ success: true, message: 'Progression mise à jour' });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
});

// Obtenir les statistiques de jeu
async function getGameStats(userId: string) {
  // Implémentation simplifiée
  return {
    gamesPlayed: 47,
    vocabularyMastered: 128,
    currentStreak: 12,
    bestStreak: 15,
    averageScore: 850,
    favoriteGame: 'memory'
  };
}

export default router;
