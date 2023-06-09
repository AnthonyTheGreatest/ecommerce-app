import bcrypt from 'bcryptjs';
import moment from 'moment';
import db from '../1_db/index.js';
const userById = async (id) => {
    const { rows } = await db('SELECT * FROM users WHERE id = $1', [id]);
    return rows.length ? rows[0] : false;
};
const emailExists = async (email) => {
    const { rows } = await db('SELECT * FROM users WHERE email = $1', [email]);
    return rows.length ? rows[0] : false;
};
const createUser = async (email, password, user_name) => {
    // Hash password:
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    // Create 'created' timestamp:
    const created = moment.utc().format('YYYY-MM-DD');
    const { rows } = await db(
    // Use RETURNING clause so 'rows' returns the user. (equivalent to for example: 'SELECT * FROM users WHERE email = $1')
    'INSERT INTO users (email, password, user_name, created) VALUES ($1, $2, $3, $4) RETURNING *', [email, hash, user_name, created]);
    return rows.length ? rows[0] : false;
};
const matchPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
    // Returns true or false.
};
export { userById, emailExists, createUser, matchPassword };
