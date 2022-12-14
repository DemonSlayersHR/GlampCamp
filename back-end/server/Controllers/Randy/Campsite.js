pool = require('../../../db/db.js')

const campsite = {
  get: async (req, res) => {

    // creates the client
    const client = await pool.connect()

    // create parameters
    // let queryArgs = [req.query.sort || 'camp_id', req.query.count || 10]

    // check which query to use
    // if (req.query.camp_id) queryArgs = [req.query.camp_id]

    let query = `SELECT camp_id, camp_name, (SELECT username FROM users WHERE user_id = camps.host_id) as host, price,
    (SELECT AVG(star_rating) FROM reviews WHERE camp_id = camps.camp_id) as star_rating, location, description,
    (SELECT json_agg(json_build_object(
      'date_id', 'date_id',
      'client', (SELECT username FROM users WHERE user_id = camp_dates.client_id),
      'date', dates,
      'reserved', reserved
    )) as dates FROM camp_dates WHERE camp_id = camps.camp_id),
    (SELECT json_agg(json_build_object(
      'photo_id', photo_id,
      'photo_url', photo_url)) FROM photos WHERE camp_id = camps.camp_id
    ) as photos,
    (SELECT json_agg(json_build_object(
      'review_id', review_id,
      'reviewer', (SELECT username FROM users WHERE user_id = reviews.client_id),
      'star_rating', star_rating,
      'review_photo', review_photo,
      'review', review
    )) FROM reviews WHERE camp_id = camps.camp_id) as reviews,
    (SELECT json_agg(json_build_object(
      'reserve_id', reserve_id,
      'client_id', client_id,
      'confirmed', confirmed
    )) FROM reservations WHERE camp_id = camps.camp_id) as reservations
    FROM camps `

    if (req.query.camp_id) query += `WHERE camp_id = ${req.query.camp_id}`
    else {
      if (req.query.host_id) query += `WHERE host_id = ${req.query.host_id} `
      if (req.query.sort) query += `ORDER BY ${req.query.sort} `
      if (req.query.desc) query += `DESC `
      query += `LIMIT ${req.query.count || 10}`
    }

    // try query
    try {
      const result = await client.query(query)

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
  },
  put: async (req, res) => {
    const prev = await pool.query(`SELECT * FROM camps WHERE camp_id = $1`, [req.body.camp_id])

    const camp_args = [
      req.body.camp_name || prev.rows[0].camp_name,
      req.body.price || prev.rows[0].price,
      req.body.location || prev.rows[0].location,
      req.body.description || prev.rows[0].description,
      req.body.camp_id
    ]

    pool.query(`UPDATE camps SET
    camp_name = $1,
    price = $2,
    location = $3,
    description = $4
    WHERE camp_id = $5`, camp_args)

    res.status(204)
    res.send('Updated!')
  },
  delete: async (req, res) => {
    // might need to potentiall delete from chat and delete from reservations
    await pool.query(`DELETE FROM photos WHERE camp_id = $1`, [req.query.camp_id])
    await pool.query(`DELETE FROM camp_dates WHERE camp_id = $1`, [req.query.camp_id])
    await pool.query(`DELETE FROM reviews WHERE camp_id = $1`, [req.query.camp_id])
    pool.query(`DELETE FROM camps WHERE camp_id = $1`, [req.query.camp_id])
    res.status(204)
    res.send('Deleted!')
  }
}

module.exports = campsite