const db = require ('../../db/db.js')

var getUser = (user_id) => {
 return( `SELECT
    *
  FROM users
  WHERE user_id = ${user_id}
  `)
}


var postUser = (userObj) => {
  return db.query(`
   INSERT INTO users (user_name, password,location)VALUES
   (${userObj.user_name},${userObj.password},${userObj.location})
  `)
}

module.exports.getUser = getUser;
module.exports.postUser = postUser;