import pool from '../config/db';

interface Task {
  id: number;
  title: string;
  description: string;
  input_example?: string;
  output_example?: string;
  difficulty?: string;
  tags?: string[];
  additional_materials?: string[];
  created_by: number;
}

class TaskModel {
  //Создание задачи
  static async create(task: Partial<Task>): Promise<Task> {
    const result = await pool.query(
      `INSERT INTO tasks (title, description, input_example, output_example, difficulty, tags, additional_materials, created_by) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        task.title,
        task.description,
        task.input_example,
        task.output_example,
        task.difficulty,
        task.tags,
        task.additional_materials,
        task.created_by,
      ]
    );
    return result.rows[0];
  }

  //Получение всех задач
  static async findAll(): Promise<Task[]> {
    const result = await pool.query('SELECT * FROM tasks');
    return result.rows;
  }

  //Получение задачи по Id
  static async findById(id: number): Promise<Task | null> {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  //Обновление задачи по Id
  static async update(id: number, updates: Partial<Task>): Promise<Task | null> {
    const setClause = Object.keys(updates).map((key, index) => `${key} = $${index + 2}`).join(', ');
    const values = Object.values(updates);
    values.unshift(id);

    const result = await pool.query(
      `UPDATE tasks SET ${setClause} WHERE id = $1 RETURNING *`,
      values
    );
    return result.rows[0] || null;
  }

  //Удаление задачи по Id
  static async delete(id: number): Promise<void> {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  }
}

export default TaskModel;
export { Task };
