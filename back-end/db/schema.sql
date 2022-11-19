CREATE TABLE IF NOT EXISTS users(
  user_id SERIAL PRIMARY KEY NOT NULL,
  user_name VARCHAR(50),
  password VARCHAR(50),
  location VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS camps(
  camp_id SERIAL PRIMARY KEY NOT NULL,
  host_id INT REFERENCES users (user_id),
  price DECIMAL,
  star_rating DECIMAL,
  location VARCHAR(50),
  description VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS reservations(
  reserve_id SERIAL PRIMARY KEY NOT NULL,
  camp_id INT REFERENCES camps (camp_id),
  client_id INT REFERENCES reservations (client_id),
  confirmed BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS photos(
  photo_id SERIAL PRIMARY KEY NOT NULL,
  camp_id INT REFERENCES camps (camp_id),
  photo_url VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS camp_dates(
  camp_date_id SERIAL PRIMARY KEY NOT NULL,
  camp_id INT REFERENCES camps (camp_id),
  client_id INT REFERENCES users (user_id),
  dates DATE,
  reserved BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS reserves_dates(
  reserve_date_id SERIAL PRIMARY KEY NOT NULL,
  reserve_id INT REFERENCES reservations (reserve_id),
  dates DATE
);

CREATE TABLE IF NOT EXISTS chat(
  chat_id SERIAL PRIMARY KEY NOT NULL,
  camp_id INT REFERENCES camps (camp_id),
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  messages VARCHAR(100)
);

INSERT INTO users(user_id, user_name, password, location) VALUES
  (1,'test1', 'pw1', 'Mountain View'),
  (2,'test2', 'pw2', 'Sunnyvale'),
  (3,'test3', 'pw3', 'Mars')
  ON CONFLICT DO NOTHING;

INSERT INTO camps(camp_id, host_id, price, star_rating, location, description) VALUES
  (1, 1, 200, 5, 'Mountain View', 'Cozy AF'),
  (2, 1, 100, 2, 'Mountain View', 'Not Cozy AF'),
  (3, 1, 0, 0, 'Mountain View', 'Fake place, doesnt exist'),
  (4, 2, 215, 5, 'Sunnyvale', 'My special camp'),
  (5, 2, 150, 3, 'Palo Alto', 'Comes with free boba'),
  (6, 3, 1000, 5, 'Mars', 'Welcome to Mars earthling')
  ON CONFLICT DO NOTHING;

INSERT INTO reservations(reserve_id, camp_id, client_id, confirmed) VALUES
  (1, 3, 2, FALSE),
  (2, 1, 3, FALSE),
  (3, 6, 1, TRUE)
  ON CONFLICT DO NOTHING;

INSERT INTO camp_dates(camp_date_id ,camp_id ,client_id ,dates ,reserved ) VALUES
  (1, 1, null, '2022-12-23', FALSE),
  (2, 1, null, '2022-12-24', FALSE),
  (3, 1, null, '2022-12-25', FALSE),
  (4, 2, null, '2023-01-01', FALSE),
  (5, 2, null, '2023-01-02', FALSE),
  (6, 3, null, '2023-02-14', FALSE),
  (7, 4, null, '2023-02-14', FALSE),
  (8, 5, null, '2022-12-25', FALSE),
  (9, 6, 1, '2022-12-30', TRUE),
  (10, 6, 1, '2022-12-31', TRUE),
  (11, 6, 1, '2023-01-01', TRUE)
  ON CONFLICT DO NOTHING;

INSERT INTO reserves_dates(reserve_date_id ,reserve_id,dates) VALUES
  (1, 1, '2023-02-14'),
  (2, 2, '2022-12-23'),
  (3, 2, '2022-12-24'),
  (4, 2, '2022-12-25')
  ON CONFLICT DO NOTHING;

INSERT INTO photos(photo_id, camp_id, photo_url) VALUES
  (1, 1, 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_630,q_60,w_1200/v1652453103/campground-photos/shgam6kwlyuu7cvblkth.jpg'),
  (2, 2, 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_630,q_60,w_1200/v1652453103/campground-photos/shgam6kwlyuu7cvblkth.jpg'),
  (3, 3, 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_630,q_60,w_1200/v1652453103/campground-photos/shgam6kwlyuu7cvblkth.jpg'),
  (4, 4, 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_630,q_60,w_1200/v1652453103/campground-photos/shgam6kwlyuu7cvblkth.jpg'),
  (5, 5, 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_630,q_60,w_1200/v1652453103/campground-photos/shgam6kwlyuu7cvblkth.jpg'),
  (6, 6, 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_630,q_60,w_1200/v1652453103/campground-photos/shgam6kwlyuu7cvblkth.jpg'),
  (7, 6, 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_630,q_60,w_1200/v1652453103/campground-photos/shgam6kwlyuu7cvblkth.jpg'),
  (8, 1, 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_630,q_60,w_1200/v1652453103/campground-photos/shgam6kwlyuu7cvblkth.jpg'),
  (9, 6, 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_630,q_60,w_1200/v1652453103/campground-photos/shgam6kwlyuu7cvblkth.jpg')
  ON CONFLICT DO NOTHING;
-- Create a database called glampcamp on postgres, then running the following code below
-- psql -d glampcamp -a -f back-end/db/schema.sql