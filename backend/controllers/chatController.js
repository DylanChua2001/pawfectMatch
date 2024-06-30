const db = require('../config/db');

const getChatByID = async (req, res, next) => {
  const id = req.body.id; // Get the id from the request parameters
  const queryText = 'SELECT * FROM langchain_chat_histories WHERE session_id=$1 ORDER BY id ASC ';

  try {
    const { rows } = await db.query(queryText, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Chat not found' });
    }
    const filteredData = rows.map(row => ({
      type: row.message.type,
      content: row.message.content,
    }));
    return res.status(200).json(filteredData);

  } catch (error) {
    console.error('Error in getChatByID:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getChatByID,
};
