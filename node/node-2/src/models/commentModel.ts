import pool from '../config/db';

interface IComment {
  id: number;
  content: string;
  task_id: number;
  user_id: number;
  created_at: Date;
}

class CommentModel {
  //Создание комментария с Id задачи и юзера
  static async create(content: string, task_id: number, user_id: number): Promise<IComment> {
    const result = await pool.query(
      `INSERT INTO comments (content, task_id, user_id) 
      VALUES ($1, $2, $3) RETURNING *`,
      [content, task_id, user_id]
    );
    return result.rows[0];
  }


  //Получение задачи по Id
  static async findAllByTaskId(task_id: number): Promise<IComment[]> {
    const result = await pool.query('SELECT * FROM comments WHERE task_id = $1', [task_id]);
    return result.rows;
  }

  //Удаление задачи по Id
  static async delete(id: number): Promise<void> {
    await pool.query('DELETE FROM comments WHERE id = $1', [id]);
  }
}

export default CommentModel;
export { IComment };
