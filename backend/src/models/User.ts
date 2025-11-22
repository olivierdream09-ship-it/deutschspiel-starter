import { Pool } from 'pg';

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'deutschspiel',
  password: 'password',
  port: 5432,
});

export interface User {
  id: string;
  email: string;
  username: string;
  current_level: string;
  total_xp: number;
  daily_streak: number;
  created_at: Date;
}

export class UserModel {
  static async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0] || null;
  }

  static async create(userData: {
    email: string;
    username: string;
    passwordHash: string;
  }): Promise<User> {
    const result = await pool.query(
      `INSERT INTO users (email, username, password_hash) 
       VALUES ($1, $2, $3) 
       RETURNING id, email, username, current_level, total_xp, daily_streak, created_at`,
      [userData.email, userData.username, userData.passwordHash]
    );
    return result.rows[0];
  }

  static async updateProgress(userId: string, xp: number, level?: string): Promise<void> {
    if (level) {
      await pool.query(
        'UPDATE users SET total_xp = total_xp + $1, current_level = $2, updated_at = NOW() WHERE id = $3',
        [xp, level, userId]
      );
    } else {
      await pool.query(
        'UPDATE users SET total_xp = total_xp + $1, updated_at = NOW() WHERE id = $2',
        [xp, userId]
      );
    }
  }
}

export default pool;
