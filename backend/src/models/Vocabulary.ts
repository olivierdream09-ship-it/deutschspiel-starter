import pool from './User';

export interface VocabularyItem {
  id: string;
  german_word: string;
  translation: string;
  article?: string;
  plural_form?: string;
  level: string;
  category: string;
  audio_url?: string;
  image_url?: string;
  example_sentence?: string;
  difficulty_score: number;
  times_used: number;
  success_rate: number;
  created_at: Date;
}

export class VocabularyModel {
  static async findByLevel(level: string, limit: number = 20): Promise<VocabularyItem[]> {
    const result = await pool.query(
      'SELECT * FROM vocabulary WHERE level = $1 ORDER BY RANDOM() LIMIT $2',
      [level, limit]
    );
    return result.rows;
  }

  static async findByCategory(category: string, level?: string): Promise<VocabularyItem[]> {
    if (level) {
      const result = await pool.query(
        'SELECT * FROM vocabulary WHERE category = $1 AND level = $2 ORDER BY difficulty_score',
        [category, level]
      );
      return result.rows;
    } else {
      const result = await pool.query(
        'SELECT * FROM vocabulary WHERE category = $1 ORDER BY level, difficulty_score',
        [category]
      );
      return result.rows;
    }
  }

  static async batchCreate(vocabularyList: Omit<VocabularyItem, 'id' | 'created_at'>[]): Promise<VocabularyItem[]> {
    const values = vocabularyList.map(item => 
      `('${item.german_word}', '${item.translation}', '${item.article || ''}', '${item.plural_form || ''}', '${item.level}', '${item.category}', '${item.audio_url || ''}', '${item.image_url || ''}', '${item.example_sentence || ''}', ${item.difficulty_score})`
    ).join(',');

    const query = `
      INSERT INTO vocabulary (german_word, translation, article, plural_form, level, category, audio_url, image_url, example_sentence, difficulty_score)
      VALUES ${values}
      RETURNING *
    `;

    const result = await pool.query(query);
    return result.rows;
  }

  static async updateUsageStats(wordId: string, isCorrect: boolean): Promise<void> {
    await pool.query(
      `UPDATE vocabulary 
       SET times_used = times_used + 1,
           success_rate = ((success_rate * times_used) + $1) / (times_used + 1)
       WHERE id = $2`,
      [isCorrect ? 1 : 0, wordId]
    );
  }
}
