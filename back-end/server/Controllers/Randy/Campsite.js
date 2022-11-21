pool = require('../../../db/db.js')

const campsite = {
  get: async (req, res) => {

    // creates the client
    const client = await pool.connect()

    // create parameters
    let queryArgs = [req.query.count || 10]

    if (req.query.camp_id) {
      queryArgs = [req.query.camp_id]
    }

    let query = `SELECT camp_name, (SELECT user_name FROM users WHERE user_id = camps.host_id) as host, price,
    (SELECT AVG(star_rating) FROM reviews WHERE camp_id = camps.camp_id) as star_rating, location, description,
    (SELECT json_agg(json_build_object(
      'client', (SELECT user_name FROM users WHERE user_id = camp_dates.client_id),
      'date', dates,
      'reserved', reserved
    )) as dates FROM camp_dates WHERE camp_id = camps.camp_id),
    (SELECT json_agg(json_build_object(
      'id', photo_id,
      'photo_url', photo_url)) FROM photos WHERE camp_id = camps.camp_id
    ) as photos,
    (SELECT json_agg(json_build_object(
      'reviewer', (SELECT user_name FROM users WHERE user_id = reviews.client_id),
      'star_rating', star_rating,
      'review', review
    )) FROM reviews WHERE camp_id = camps.camp_id) as reviews
    FROM camps `

    if (req.body.camp_id) query += `WHERE camp_id = $1`
    else query += `LIMIT $1`

    // try query
    try {
      const result = await client.query(query, queryArgs)

      // reformat response and send
      res.status(200)
      res.send(result.rows)
    } catch (e) { console.log(e) } finally {
      client.release()
    }
  },
  post: async (req, res) => {
    const camp_args = [req.body.camp_name, req.body.host_id, req.body.price, req.body.location, req.body.description]
    await pool.query(`INSERT INTO camps(camp_name, host_id, price, location, description) VALUES ($1,$2,$3,$4,$5)`, camp_args)
    result = await pool.query(`SELECT MAX(camp_id) FROM camps`)
    res.status(201)
    res.send({ camp_id: result.rows[0].max })
  }
}

module.exports = campsite