pool = require('../../../db/db.js')

const CampDates = {
  post: (req, res) => {
    for (let i of req.body.dates) {
      pool.query(`INSERT INTO camp_dates(camp_id, dates) VALUES ($1, $2)`, [req.body.camp_id, i])
    }
    res.status(201)
    res.send('Created!')
  },
  put: (req, res) => {
    for (let i of req.body.dates) {
      pool.query(`UPDATE camp_dates SET
      client_id = $1,
      reserved = $2
      WHERE camp_id = $3 AND dates = $4;`, [req.body.client_id, req.body.reserved, req.body.camp_id, i])
    }
    res.status(204)
    res.send('Updated!')
  },
  delete: (req, res) => {
    console.log(req.body)
    for (let i of req.body.dates) {
      pool.query(`DELETE FROM camp_dates WHERE dates = $1 AND camp_id = $2`, [i, req.body.camp_id])
    }
    res.status(204)
    res.send('Deleted!')
  }
}

module.exports = CampDates