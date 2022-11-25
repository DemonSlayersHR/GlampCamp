pool = require('../../../db/db.js')

const CampReviews = {
  post: async (req, res) => {
    const review_args = [req.body.camp_id, req.body.client_id, req.body.star_rating, req.body.review_photo, req.body.review]
    await pool.query(`INSERT INTO reviews(camp_id, client_id, star_rating, review_photo, review) VALUES($1,$2,$3,$4,$5);`, review_args)
    result = await pool.query(`SELECT MAX(review_id) FROM reviews`)
    res.status(201)
    res.send({ review_id: result.rows[0].max })
  },
  put: async (req, res) => {
    const prev = await pool.query(`SELECT * FROM reviews WHERE review_id = $1`, [req.body.review_id])

    const review_args = [
      req.body.star_rating || prev.rows[0].star_rating,
      req.body.review || prev.rows[0].review,
      req.body.review_photo || prev.rows[0].review_photo,
      req.body.review_id
    ]

    pool.query(`UPDATE reviews SET
    star_rating = $1,
    review = $2,
    review_photo = $3
    WHERE review_id = $4;`, review_args)
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