const model = require('../../Models/user.js');
const pool = require ('../../../db/db.js')

var getUser = (req,res) => {
  console.log(req.query)
  console.log(pool)
  pool.connect()
  .then((client) => {
    console.log(client)
    client
    .query(model.getUser(req.query.user_id))
    .then((response) => {
      client.release();
      res.status(200);
      res.send(response['rows'][0])
    })
    .catch(err => {
      client.release()
      console.log(err.stack)
    })
  })
  .catch((err) => {
    res.send(err)
  })
}

module.exports.getUser = getUser;
