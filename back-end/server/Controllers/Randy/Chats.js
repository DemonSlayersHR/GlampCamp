pool = require('../../../db/db.js')

const Chats = {
  get: async (req, res) => {
    result = await pool.query(`SELECT sender, messages, reserve_id FROM chats WHERE reserve_id = $1`, [req.query.reserve_id])
    res.status(200)
    res.send(result.rows)
  },
  post: async (req, res) => {
    await pool.query(`INSERT INTO chats(reserve_id, sender, messages) VALUES ($1,$2,$3)`,
      [req.body.reserve_id, req.body.sender, req.body.messages])
    res.status(201)
    res.send()
  },
  meta: async (req, res) => {
    result = await pool.query(`SELECT client_id,
    (SELECT host_id FROM camps WHERE camp_id = reservations.camp_id) as host_id,
    camp_id,
    (SELECT json_agg(dates) FROM reserves_dates WHERE reserve_id = reservations.reserve_id) as dates
    FROM reservations WHERE reserve_id = $1`, [req.query.reserve_id])
    res.status(200)
    res.send(result.rows[0])
  }
}

module.exports = Chats