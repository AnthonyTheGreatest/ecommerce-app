import moment from 'moment';
import db from '../1_db/index.js';
const updateUser = async (user_name, id) => {
    // Create 'modified' timestamp:
    const modified = moment.utc().format('YYYY-MM-DD');
    const { rows } = await db('UPDATE users SET user_name = $1, modified = $2 WHERE id = $3 RETURNING *', [user_name, modified, id]);
    return rows.length ? rows[0] : false;
};
const deleteUser = async (id) => {
    const { rows } = await db('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    return rows.length ? rows[0] : false;
};
export { updateUser, deleteUser };
