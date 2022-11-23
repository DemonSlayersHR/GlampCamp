const db = require ('../../db/db.js')

var getUser = (user_id) => {
 return( `SELECT
    *
  FROM users
  WHERE user_id = ${user_id}
  `)
}

var getMaxUserId = () => {
  return ( 'SELECT MAX(user_id) FROM users'
  )
}
var postUser = (userObj) => {
  return (`
   INSERT INTO users (username, first_name, last_name, password,location,user_photo)VALUES
   ('${userObj.username}','${userObj.first_name}','${userObj.last_name}','${userObj.password}','${userObj.location}','${userObj.user_photo}')
  `)
}

var userAuth = (userObj) => {
  return (`SELECT
   *
  FROM users
  WHERE username = '${userObj.username}' and password = '${userObj.password}'
  `)
}

var deleteUser = (user_id) => {
  return( `DELETE
  FROM users
  WHERE user_id = ${user_id}
`)
}

module.exports.getMaxUserId = getMaxUserId;
module.exports.deleteUser = deleteUser;
module.exports.getUser = getUser;
module.exports.postUser = postUser;
module.exports.userAuth = userAuth;