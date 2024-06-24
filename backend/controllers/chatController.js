const db = require('../config/db');

const getMessages = async (session_id) => {
  try {
    const result = await db.query(`
      SELECT sender, message->>'content' AS content
      FROM messages
      WHERE session_id = $1
      ORDER BY timestamp;
    `, [session_id]);
    return result.rows;
  } catch (error) {
    throw new Error('Error retrieving messages from database');
  }
};

const addMessage = async (session_id, sender, content) => {
  try {
    const result = await db.query(`
      INSERT INTO messages (session_id, sender, message)
      VALUES ($1, $2, '{"content": $3}')
      RETURNING *;
    `, [session_id, sender, content]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Error adding message to database');
  }
};

module.exports = {
  getMessages,
  addMessage,
};
