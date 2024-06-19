import pool from '../config/db';

interface IUser {
  id: number;
  username: string;
  password: string;
  role: string;
}

class UserModel {
  //Создание юзера
  static async create(username: string, password: string, role: string): Promise<IUser> {
    const result = await pool.query(
      'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *',
      [username, password, role]
    );
    return result.rows[0];
  }

  //Получение всех юзеров
  static async findAll(): Promise<IUser[]> {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  }

  //Поулчение юзера по нейму
  static async findByUsername(username: string): Promise<IUser | null> {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0] || null;
  }

  //Получение юзера по Id
  static async findById(id: number): Promise<IUser | null> {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  //Обновление юзера по Id
  static async update(id: number, updates: Partial<IUser>): Promise<IUser | null> {
    const setClause = Object.keys(updates).map((key, index) => `${key} = $${index + 2}`).join(', ');
    
    const values = Object.values(updates);
    values.unshift(id);
    const result = await pool.query(
      `UPDATE users SET ${setClause} WHERE id = $1 RETURNING *`,
      values
    );
    return result.rows[0] || null;
  }

  //Удаление юзера по Id
  static async delete(id: number): Promise<void> {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
  }
}

export default UserModel;
export { IUser };
