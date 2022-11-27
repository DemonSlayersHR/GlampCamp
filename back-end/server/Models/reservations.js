var getReservations = (client_id) => {
  return(`
    SELECT
      reservations.reserve_id,
      reservations.camp_id,
      reservations.confirmed,
      array_agg(to_char(reserves_dates.dates,'YYYY-MM-DD')) AS dates,
      camps.camp_id,
      camps.camp_name,
      camps.price,
      camps.star_rating,
      camps.location,
      camps.description
    FROM reservations LEFT JOIN camps ON reservations.camp_id = camps.camp_id
    LEFT JOIN reserves_dates ON reservations.reserve_id = reserves_dates.reserve_id
    GROUP BY reservations.reserve_id, camps.camp_id
    HAVING reservations.client_id = ${client_id}`)
}

var deleteReservations = (reserve_id) => {
  return (`
  UPDATE camp_dates
  SET reserved = false
  WHERE dates in (SELECT
   dates
  FROM reserves_dates WHERE reserve_id = ${reserve_id}) and camp_id in (SELECT
   camp_id
  FROM reservations WHERE reserve_id = ${reserve_id});
  DELETE FROM reserves_dates WHERE reserve_id = ${reserve_id};
  DELETE FROM reservations WHERE reserve_id = ${reserve_id};
  `)
}

var addReservations = (reserveObj) => {
  return(`
    INSERT INTO reservations (camp_id, client_id)VALUES
    ('${reserveObj.camp_id}','${reserveObj.client_id}');
  `)
}

var addReservationDate = (ReserveId,date) => {
  return(`
  INSERT INTO reserves_dates (reserve_id, dates)VALUES
  ( '${ReserveId}','${date}')
  `)
}

var getMaxReservationId = () => {
  return ( 'SELECT MAX(reserve_id) FROM reservations'
  )
}

var hostConfirmed = (reserveid) => {
  return (`update reservations
  SET confirmed = true
  WHERE reserve_id = ${reserveid.reserve_id}
  `)
}

var getReservationByResid = (reserveid) => {
  return (`
  SELECT
    reservations.*,
    array_agg(to_char(reserves_dates.dates,'YYYY-MM-DD')) AS dates
  FROM reservations
  LEFT JOIN reserves_dates ON reservations.reserve_id = reserves_dates.reserve_id
  GROUP BY reservations.reserve_id
  HAVING reservations.reserve_id = ${reserveid}
  `)
}

var updateCampDates = (campid, dates) => {
  return(`
  UPDATE camp_dates
  SET reserved = true
  WHERE dates in (${"'" + dates.join("','")+"'"}) and camp_id = ${campid}
  `)
}


module.exports.addReservations = addReservations;
module.exports.getReservations = getReservations;
module.exports.deleteReservations = deleteReservations;
module.exports.getMaxReservationId = getMaxReservationId;
module.exports.addReservationDate = addReservationDate;
module.exports.hostConfirmed = hostConfirmed;
module.exports.getReservationByResid = getReservationByResid;
module.exports.updateCampDates = updateCampDates;