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
    pool.query(`UPDATE camp_dates SET
    client_id = $1,
    reserved = $2
    WHERE camp_date_id = $3;`, [req.body.client_id, req.body.reserved, req.body.camp_date_id])
    res.status(204)
    res.send('Updated!')
  },
  delete: (req, res) => {
    pool.query(`DELETE FROM camp_dates WHERE camp_date_id = $1`, [req.query.camp_date_id])
    res.status(204)
    res.send('Deleted!')
  }
}

module.exports = CampDates