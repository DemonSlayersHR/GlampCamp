pool = require('../../../db/db.js')

const campsite = {
  get: async (req, res) => {
    //if client idle, end process
    // pool.on('error', (err, client) => {
    //   console.error('Unexpected error on idle client', err)
    //   process.exit(-1)
    // })

    // creates the client
    const client = await pool.connect()

    // create parameters
    const queryArgs = [req.query.count || 10]

    // try query
    try {
      const result = await client.query(
        `SELECT camp_name, (SELECT user_name FROM users WHERE user_id = camps.host_id) as host, price, star_rating, location, description,
        (SELECT json_agg(json_build_object(
          'client', (SELECT user_name FROM users WHERE user_id = camp_dates.client_id),
          'date', dates,
          'reserved', reserved
        )) as dates FROM camp_dates WHERE camp_id = camps.camp_id),
        (SELECT json_agg(json_build_object(
          'id', photo_id,
          'photo_url', photo_url)) FROM photos WHERE camp_id = camps.camp_id
        ) as photos FROM camps
      LIMIT $1`, queryArgs)

      // reformat response and send
      res.status(200)
      res.send(result.rows)
    } catch (e) { console.log(e) } finally {
      client.release()
    }
  },
  post: (req, res) => {

  }
}

module.exports = campsite