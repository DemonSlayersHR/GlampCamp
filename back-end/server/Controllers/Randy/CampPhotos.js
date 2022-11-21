pool = require('../../../db/db.js')

const CampPhotos = {
  post: (req, res) => {
    for (let i of req.body.photos) {
      pool.query(`INSERT INTO photos(camp_id, photo_url) VALUES ($1, $2)`, [req.body.camp_id, i])
    }
    res.status(201)
    res.send('Created!')
  },
  put: (req, res) => {
    pool.query(`UPDATE photos SET
    photo_url = $1
    WHERE photo_id = $2;`, [req.body.photo_url, req.body.photo_id])
    res.status(204)
    res.send('Updated!')
  },
  delete: (req, res) => {
    pool.query(`DELETE FROM photos WHERE photo_id = $1`, [req.query.photo_id])
    res.status(204)
    res.send('Deleted!')
  }
}

module.exports = CampPhotos