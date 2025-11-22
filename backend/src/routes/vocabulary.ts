import express from 'express';
import { VocabularyModel } from '../models/Vocabulary';

const router = express.Router();

// Obtenir le vocabulaire par niveau
router.get('/', async (req, res) => {
  try {
    const { level, category, limit } = req.query;
    
    let vocabulary;
    if (category) {
      vocabulary = await VocabularyModel.findByCategory(
        category as string, 
        level as string
      );
    } else if (level) {
      vocabulary = await VocabularyModel.findByLevel(
        level as string, 
        parseInt(limit as string) || 20
      );
    } else {
      return res.status(400).json({ error: 'Level or category required' });
    }

    res.json({ vocabulary, count: vocabulary.length });
  } catch (error) {
    console.error('Error fetching vocabulary:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du vocabulaire' });
  }
});

// Obtenir les catégories disponibles
router.get('/categories', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT category, level, COUNT(*) as word_count
      FROM vocabulary 
      GROUP BY category, level 
      ORDER BY level, category
    `);
    
    res.json({ categories: result.rows });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des catégories' });
  }
});

// Note: pool doit être importé
const pool = require('../models/User').default;

export default router;
