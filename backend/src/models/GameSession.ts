import pool from './User';

export interface GameSession {
  id: string;
  user_id: string;
  game_type: string;
  difficulty_level: string;
  score: number;
  max_score: number;
  time_spent: number;
  completed_at: Date;
  metadata: any;
}

export class GameSessionModel {
  static async create(sessionData: {
    userId: string;
    gameType: string;
    difficultyLevel: string;
    maxScore: number;
    metadata?: any;
  }): Promise<GameSession> {
    const result = await pool.query(
      `INSERT INTO game_sessions (user_id, game_type, difficulty_level, max_score, metadata)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [sessionData.userId, sessionData.gameType, sessionData.difficultyLevel, sessionData.maxScore, sessionData.metadata || {}]
    );
    return result.rows[0];
  }

  static async completeSession(sessionId: string, score: number, timeSpent: number): Promise<GameSession> {
    const result = await pool.query(
      `UPDATE game_sessions 
       SET score = $1, time_spent = $2, completed_at = NOW()
       WHERE id = $3
       RETURNING *`,
      [score, timeSpent, sessionId]
    );
    return result.rows[0];
  }

  static async getUserStats(userId: string): Promise<{
    totalGames: number;
    totalXP: number;
    averageScore: number;
    favoriteGame: string;
  }> {
    const result = await pool.query(
      `SELECT 
        COUNT(*) as total_games,
        COALESCE(SUM(score), 0) as total_xp,
        COALESCE(AVG(score), 0) as average_score,
        (
          SELECT game_type 
          FROM game_sessions 
          WHERE user_id = $1 
          GROUP BY game_type 
          ORDER BY COUNT(*) DESC 
          LIMIT 1
        ) as favorite_game
       FROM game_sessions 
       WHERE user_id = $1 AND completed_at IS NOT NULL`,
      [userId]
    );
    
    return {
      totalGames: parseInt(result.rows[0].total_games),
      totalXP: parseInt(result.rows[0].total_xp),
      averageScore: parseFloat(result.rows[0].average_score),
      favoriteGame: result.rows[0].favorite_game
    };
  }
}
