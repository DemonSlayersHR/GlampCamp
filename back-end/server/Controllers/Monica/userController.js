const model = require('../../Models/user.js');
const pool = require ('../../../db/db.js')

var getUser = (req,res) => {
  // console.log(req.query)
  // console.log(pool)
  pool.connect()
  .then((client) => {
    // console.log(client)
    // console.log('here',req.query.user_id)
    client
    .query(model.getUser(req.query.user_id))
    .then((response) => {
      client.release();
      res.status(200);
      res.send(response['rows'][0])
    })
    .catch(err => {
      client.release()
      res.send(err)
    })
  })
  .catch((err) => {
    res.send(err)
  })
}

var postUser = (req,res) => {
  var userInfo = req.body
  if(userInfo.username === null) {
    res.status(400)
    res.send('your username can not be null')
  }
  if(userInfo.password === null) {
    res.status(400)
    res.send('your password can not be null')
  }
  if(userInfo.first_name === null) {
    res.status(400)
    res.send('your first name can not be null')
  }
  if(userInfo.last_name === null) {
    res.status(400)
    res.send('your last name can not be null')
  }
  pool.connect()
  .then((client) => {
    // console.log(client)
    client
    .query(model.postUser(userInfo))
    .then((response) => {
      client.release();
      res.status(201);
      res.send('your postUser has been succeeded')
    })
    .catch(err => {
      client.release()
      res.send(err)
    })
  })
  .catch((err) => {
    res.send(err)
  })
}


var userAuth = (req,res) => {
  var userInfo = req.query
  // console.log('req query',req.query)
  if(userInfo.username === null) {
    res.status(400)
    res.send('your username can not be null')
  }
  if(userInfo.password === null) {
    res.status(400)
    res.send('your password can not be null')
  }
  pool.connect()
  .then((client) => {
    // console.log(client)
    client
    .query(model.userAuth(userInfo))
    .then((response) => {
      client.release();
      // console.log('response is', response)
      res.status(200)
      if(response["rows"].length !== 0) {
        res.send(
          {isAuthenticated: true,
          userInfo:response["rows"][0]}
          )
      } else {
        res.send({
          isAuthenticated: false,
          userInfo: null
        })
      }
    })
    .catch(err => {
      client.release()
      res.send(err)
    })
  })
  .catch((err) => {
    res.send(err)
  })
}

var deleteUser = (req,res) => {
  var userInfo = req.query
  // console.log('req query for delete',req.query)
  if(userInfo.user_id === null) {
    res.status(400)
    res.send('your user_id can not be null')
  }
  pool.connect()
  .then((client) => {
    // console.log(client)
    client
    //
    .query(model.deleteUser(userInfo['user_id']))
    .then((response) => {
      client.release();
      res.status(200);
      res.send('your delete user request has been succeeded')
    })
    .catch(err => {
      client.release()
      // console.log(err)
      res.status(204)
      res.send(err)
    })
  })
  .catch((err) => {
    res.status(204)
    res.send(err)
  })
}

module.exports.getUser = getUser;
module.exports.postUser = postUser;
module.exports.userAuth = userAuth;
module.exports.deleteUser = deleteUser;