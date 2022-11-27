const model = require('../../Models/reservations.js');
const pool = require ('../../../db/db.js')

var getReservations = (req, res) => {
  pool.connect()
  .then((client) => {
    client
    .query(model.getReservations(req.query.client_id))
    .then((response) => {
      client.release();
      res.status(200);
      // console.log('response', response)
      res.send(response['rows'])
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

var deleteReservations = (req, res) => {
  var reserve_id = req.query.reserve_id;
  pool.connect()
  .then((client) => {
    client
    .query(model.deleteReservations(req.query.reserve_id))
    .then((response) => {
      // console.log(response);
      // if (response[0]['rowCount'] !== 0) {
      var totalRowCount = 0;
      for(var i = 0; i < response.length; i++) {
        totalRowCount = totalRowCount+response[i]['rowCount']
      }
      if(totalRowCount === 0) {
        client.release();
        res.status(204);
        res.send()
      } else {
        client.release();
        res.status(200);
        res.send(`Reservation with id=${reserve_id} has been deleted`)
      }
    })
    .catch(err => {
      client.release()
      res.status(204)
      res.send(err)
    })
  })
  .catch((err) => {
    res.status(204)
    console.log(err)
    res.send(err)
  })
}

var addReservations = (req, res) => {
  var reserInfo = req.body;
  pool.connect()
  .then((client) => {
    // console.log(client)
    client
    .query(model.addReservations(reserInfo))
    .then((response) => {
      client
      .query(model.getMaxReservationId())
      .then((response) => {
        // console.log('max response', response)
        var reserveid =response['rows'][0].max;
        reserInfo.dates.forEach((each) => {
          client
          .query(model.addReservationDate(reserveid, each))
          .then((response) => {
            // console.log('max response again', reserveid)
          })
          .catch((err) => {
            console.log(err);
            res.send(err);
          })
        })
        res.status(201);
        client.release();
        res.send({reserve_id: reserveid})
      })
      .catch((err) => {
        res.send(err);
      })
    })
    .catch(err => {
      res.send(err)
    })
  })
  .catch((err) => {
    client.release()
    res.send(err)
  })
}

var hostConfirmed = (req, res) => {
  var reserveInfo = req.body;
  pool.connect()
  .then((client) => {
    // console.log(client)
    client
    .query(model.hostConfirmed(reserveInfo))
    .then((response) => {
      client
      .query(model.getReservationByResid(reserveInfo.reserve_id))
      .then((response) => {
        var campId = response['rows'][0]['camp_id']
        var dateArr = response['rows'][0]['dates']
        client
        .query(model.updateCampDates(campId, dateArr))
        .then((response) => {
          client.release();
          res.status(200);
          res.send(`host has confirmed, campid is ${campId} for ${dateArr}`)
        })
      })
    })
  })
  .catch((err) => {
    res.send(err)
  })
}


module.exports.getReservations = getReservations;
module.exports.deleteReservations = deleteReservations;
module.exports.addReservations = addReservations;
module.exports.hostConfirmed = hostConfirmed;