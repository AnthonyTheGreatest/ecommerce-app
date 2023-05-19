const { query } = require('../1_db/index');

const updateUser = async (user_name, id) => {
    // Create 'modified' timestamp:
    const modified = moment.utc().format('YYYY-MM-DD');
    const { rows } = await query(
      'UPDATE users SET user_name = $1, modified = $2 WHERE id = $3 RETURNING *',
      [user_name, modified, id]
    );
    return rows.length ? rows[0] : false;
};

const deleteUser = async (id) => {
    const { rows } = await query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    );
    return rows.length ? rows[0] : false;
  };

module.exports = {
    updateUser,
    deleteUser
};
