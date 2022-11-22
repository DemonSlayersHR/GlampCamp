DROP TABLE IF EXISTS users, camps, reservations, photos, camp_dates, reserves_dates,chat, reviews;

CREATE TABLE IF NOT EXISTS users(
  user_id SERIAL PRIMARY KEY NOT NULL,
  user_name VARCHAR(50),
  password VARCHAR(50),
  location VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS camps(
  camp_id SERIAL PRIMARY KEY NOT NULL,
  host_id INT REFERENCES users (user_id),
  camp_name VARCHAR(100),
  price DECIMAL,
  star_rating DECIMAL,
  location VARCHAR(50),
  description VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS reservations(
  reserve_id SERIAL PRIMARY KEY NOT NULL,
  camp_id INT REFERENCES camps (camp_id),
  client_id INT REFERENCES users (user_id),
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

CREATE TABLE IF NOT EXISTS reviews(
  review_id SERIAL PRIMARY KEY NOT NULL,
  camp_id INT REFERENCES camps (camp_id),
  client_id INT REFERENCES users (user_id),
  star_rating INT,
  review VARCHAR(500)
);

INSERT INTO users(user_name, password, location) VALUES
  ('test1', 'pw1', 'Mountain View'),
  ('test2', 'pw2', 'Sunnyvale'),
  ('test3', 'pw3', 'Mars')
  ON CONFLICT DO NOTHING;

INSERT INTO camps(host_id, camp_name, price, star_rating, location, description) VALUES
  (1, 'Camp Expensive', 200, 5, 'Mountain View', 'Cozy AF'),
  (1, 'Camp Cheap', 100, 2, 'Mountain View', 'Not Cozy AF'),
  (1, 'Camp Fake', 0, 0, 'Mountain View', 'Fake place, doesnt exist'),
  (2, 'My Personal Camp', 215, 5, 'Sunnyvale', 'My special camp'),
  (2, 'My Not Personal Camp', 150, 3, 'Palo Alto', 'Comes with free boba'),
  (3, 'Camp Mars', 1000, 5, 'Mars', 'Greetings human')
  ON CONFLICT DO NOTHING;

INSERT INTO reservations(camp_id, client_id, confirmed) VALUES
  (3, 2, FALSE),
  (1, 3, FALSE),
  (6, 1, TRUE)
  ON CONFLICT DO NOTHING;

INSERT INTO camp_dates(camp_id ,client_id ,dates ,reserved ) VALUES
  (1, null, '2022-12-23', FALSE),
  (1, null, '2022-12-24', FALSE),
  (1, null, '2022-12-25', FALSE),
  (2, null, '2023-01-01', FALSE),
  (2, null, '2023-01-02', FALSE),
  (3, null, '2023-02-14', FALSE),
  (4, null, '2023-02-14', FALSE),
  (5, null, '2022-12-25', FALSE),
  (6, 1, '2022-12-30', TRUE),
  (6, 1, '2022-12-31', TRUE),
  (6, 1, '2023-01-01', TRUE)
  ON CONFLICT DO NOTHING;

INSERT INTO reserves_dates(reserve_id,dates) VALUES
  (1, '2023-02-14'),
  (2, '2022-12-23'),
  (2, '2022-12-24'),
  (2, '2022-12-25')
  ON CONFLICT DO NOTHING;

INSERT INTO photos(camp_id, photo_url) VALUES
  (1, 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_630,q_60,w_1200/v1652453103/campground-photos/shgam6kwlyuu7cvblkth.jpg'),
  (2, 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_630,q_60,w_1200/v1652453103/campground-photos/shgam6kwlyuu7cvblkth.jpg'),
  (3, 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_630,q_60,w_1200/v1652453103/campground-photos/shgam6kwlyuu7cvblkth.jpg'),
  (4, 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_630,q_60,w_1200/v1652453103/campground-photos/shgam6kwlyuu7cvblkth.jpg'),
  (5, 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_630,q_60,w_1200/v1652453103/campground-photos/shgam6kwlyuu7cvblkth.jpg'),
  (6, 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_630,q_60,w_1200/v1652453103/campground-photos/shgam6kwlyuu7cvblkth.jpg'),
  (6, 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_630,q_60,w_1200/v1652453103/campground-photos/shgam6kwlyuu7cvblkth.jpg'),
  (1, 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_630,q_60,w_1200/v1652453103/campground-photos/shgam6kwlyuu7cvblkth.jpg'),
  (6, 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_630,q_60,w_1200/v1652453103/campground-photos/shgam6kwlyuu7cvblkth.jpg')
  ON CONFLICT DO NOTHING;

INSERT INTO reviews(camp_id , client_id, star_rating, review) VALUES
  (6, 1, 5, 'Awesome place! Out of this world!!')
  ON CONFLICT DO NOTHING;;

-- Create a database called glampcamp on postgres, then running the following code below
-- psql -d glampcamp -a -f db/schema.sql