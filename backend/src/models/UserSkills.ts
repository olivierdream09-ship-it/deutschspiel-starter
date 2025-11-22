import pool from './User';

export interface UserSkill {
  id: string;
  user_id: string;
  skill_type: string;
  skill_name: string;
  mastery_level: number;
  questions_answered: number;
  correct_answers: number;
  last_practiced: Date;
}

export class UserSkills {
  static async findByUserId(userId: string): Promise<UserSkill[]> {
    const result = await pool.query(
      'SELECT * FROM user_skills WHERE user_id = $1 ORDER BY mastery_level DESC',
      [userId]
    );
    return result.rows;
  }

  static async updateSkill(
    userId: string, 
    skillType: string, 
    skillName: string, 
    isCorrect: boolean
  ): Promise<void> {
    
    let skill = await this.findSkill(userId, skillType, skillName);
    
    if (!skill) {
      // Créer une nouvelle compétence
      await pool.query(
        `INSERT INTO user_skills (user_id, skill_type, skill_name, mastery_level, questions_answered, correct_answers)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [userId, skillType, skillName, isCorrect ? 0.1 : 0, 1, isCorrect ? 1 : 0]
      );
    } else {
      // Mettre à jour la compétence existante
      const newQuestions = skill.questions_answered + 1;
      const newCorrect = skill.correct_answers + (isCorrect ? 1 : 0);
      const newMastery = newCorrect / newQuestions;

      await pool.query(
        `UPDATE user_skills 
         SET questions_answered = $1, correct_answers = $2, mastery_level = $3, last_practiced = NOW()
         WHERE user_id = $4 AND skill_type = $5 AND skill_name = $6`,
        [newQuestions, newCorrect, newMastery, userId, skillType, skillName]
      );
    }
  }

  private static async findSkill(
    userId: string, 
    skillType: string, 
    skillName: string
  ): Promise<UserSkill | null> {
    const result = await pool.query(
      'SELECT * FROM user_skills WHERE user_id = $1 AND skill_type = $2 AND skill_name = $3',
      [userId, skillType, skillName]
    );
    return result.rows[0] || null;
  }
}
