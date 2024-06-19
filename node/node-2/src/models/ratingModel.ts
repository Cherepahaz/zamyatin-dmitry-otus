import pool from '../config/db';

interface IRating {
  id: number;
  task_id: number;
  user_id: number;
  rating: number;
}

class RatingModel {
  //Создание оценки с Id задачи и юзера
  static async create(task_id: number, user_id: number, rating: number): Promise<IRating> {
    const result = await pool.query(
      `INSERT INTO task_ratings (task_id, user_id, rating) 
      VALUES ($1, $2, $3) RETURNING *`,
      [task_id, user_id, rating]
    );
    return result.rows[0];
  }

  //Получение задачи по Id
  static async findAllByTaskId(task_id: number): Promise<IRating[]> {
    const result = await pool.query('SELECT * FROM task_ratings WHERE task_id = $1', [task_id]);
    return result.rows;
  }

  //Обновление задачи по Id
  static async update(id: number, rating: number): Promise<IRating | null> {
    const result = await pool.query(
      `UPDATE task_ratings SET rating = $1 WHERE id = $2 RETURNING *`,
      [rating, id]
    );
    return result.rows[0] || null;
  }

  //Удалениее задачи по Id
  static async delete(id: number): Promise<void> {
    await pool.query('DELETE FROM task_ratings WHERE id = $1', [id]);
  }
}

export default RatingModel;
export { IRating };
