pool = require('../../../db/db.js')

const CampReviews = {
  post: async (req, res) => {
    const review_args = [req.body.camp_id, req.body.client_id, req.body.star_rating, req.body.review]
    await pool.query(`INSERT INTO reviews(camp_id, client_id, star_rating, review) VALUES($1,$2,$3,$4);`, review_args)
    result = await pool.query(`SELECT MAX(review_id) FROM reviews`)
    res.status(201)
    res.send({ review_id: result.rows[0].max })
  },
  put: (req, res) => {
    pool.query(`UPDATE reviews SET
    star_rating = $1,
    review = $2
    WHERE review_id = $3;`, [req.body.star_rating, req.body.review, req.body.review_id])
    res.status(204)
    res.send('Updated!')
  },
  delete: (req, res) => {
    pool.query(`DELETE FROM reviews WHERE review_id = $1`, [req.query.review_id])
    res.status(204)
    res.send('Deleted!')
  }
}

module.exports = CampReviews