DROP TABLE IF EXISTS camp_dates, reserves_dates, reservations, photos, camps, chats, reviews, users CASCADE;

CREATE TABLE IF NOT EXISTS users(
  user_id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(50),
  first_name VARCHAR(50),
  last_name  VARCHAR(50),
  password TEXT,
  location VARCHAR(50),
  user_photo VARCHAR(200)
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

CREATE TABLE IF NOT EXISTS chats(
  chat_id SERIAL PRIMARY KEY NOT NULL,
  reserve_id INT REFERENCES reservations (reserve_id),
  sender INT,
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  messages VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS reviews(
  review_id SERIAL PRIMARY KEY NOT NULL,
  camp_id INT REFERENCES camps (camp_id),
  client_id INT REFERENCES users (user_id),
  star_rating INT,
  review_photo VARCHAR(200),
  review VARCHAR(500)
);
--password's orginal plain text value = '123'
INSERT INTO users(username, first_name, last_name, password, location,user_photo) VALUES
  ('seanmccodes','Sean', 'Prez','40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'Petaluma', 'https://i0.wp.com/animegalaxyofficial.com/wp-content/uploads/2022/09/20220915_234250-min.jpg?resize=750%2C422&ssl=1'),
  ('CrazySophiaVolunteered','Sophia', 'Speaker','40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'Sunnyvale', 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/e/e5/Shinobu_anime.png/revision/latest/scale-to-width-down/1200?cb=20211119011810'),
  ('PitchForks','Pitch','Forks','40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'Mars', 'https://www.greenmangaming.com/blog/wp-content/uploads/2021/10/Demon-Slayer-Kimetsu-no-Yaiba-The-Hinokami-Chronicles.jpg')
  ON CONFLICT DO NOTHING;

INSERT INTO camps(host_id, camp_name, price, star_rating, location, description) VALUES
  (1, 'Camp Pristine', 600, 5, 'Mountain View', 'Great views in Mountain View'),
  (1, 'Camp Privileged', 400, 4, 'Palo Alto', 'For the 1%'),
  (1, 'GlampCamp with Character', 150, 2, 'Tenderloin, San Francisco', 'Not for the faint of heart'),
  (2, 'Camp Flavor', 215, 5, 'East Oakland', 'Good Times had by all, come hear me out'),
  (2, 'Hipster Paradise', 150, 3, 'Santa Clara', 'Comes with free boba'),
  (3, 'Camp Mars', 1000, 5, 'Outer Space', 'Greetings human'),
  (3, 'Camp Go Anywhere', 50, 5, 'Anywhere', 'Hello World')

  ON CONFLICT DO NOTHING;

INSERT INTO reservations(camp_id, client_id, confirmed) VALUES
  (3, 2, FALSE),
  (1, 3, FALSE),
  (6, 1, TRUE),
  (4, 2, FALSE)
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
  (6, 1, '2023-01-01', TRUE),
  (6, 1, '2020-10-10', TRUE),
  (6, 1, '2020-10-11', TRUE),
  (1, null, '2022-11-10', FALSE)
  ON CONFLICT DO NOTHING;

INSERT INTO reserves_dates(reserve_id,dates) VALUES
  (1, '2023-02-14'),
  (2, '2022-12-23'),
  (2, '2022-12-24'),
  (2, '2022-12-25'),
  (3, '2020-10-10'),
  (3, '2020-10-11'),
  (3, '2023-01-01')
  ON CONFLICT DO NOTHING;

INSERT INTO photos(camp_id, photo_url) VALUES
  (1, 'https://travelsofsarahfay.com/wp-content/uploads/2020/10/GetawayHouseinFall-1080x675.jpg'),
  (2, 'https://www.myglobalviewpoint.com/wp-content/uploads/2021/04/1a-Beautiful-Secluded-Log-Home-5-Minutes-from-Town.jpg'),
  (3, 'https://images.unsplash.com/photo-1589129140837-67287c22521b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80'),
  (4, 'http://texastravel365.com/wp-content/uploads/2022/03/luxury-cabins-in-texas-a-frame-1.jpg'),
  (5, 'https://www.livelikeitstheweekend.com/wp-content/uploads/2020/02/Best-Glamping-in-California_.jpg'),
  (6, 'https://www.sunset.com/wp-content/uploads/medium_2x/1-getaway-los-angeles-outpost-pr-1118.jpg'),
  (6, 'https://cdn.cnn.com/cnnnext/dam/assets/210428132426-getaway-house-window-full-169.jpg'),
  (1, 'https://images.ctfassets.net/su91f9ruo9t2/2JVT9m4h5y4xAe4qYUs1Eh/22c582968999391b3292f82626979273/Website_CityPage__LA_01_Spring.jpg'),
  (6, 'https://manofmany.com/wp-content/uploads/2021/11/GFC-Campers-V2-Back-lifestyle-sunset-1200x900.jpg')
  ON CONFLICT DO NOTHING;

INSERT INTO reviews(camp_id , client_id, star_rating, review_photo, review) VALUES
  (3, 1, 5, 'https://cdn.thewirecutter.com/wp-content/media/2022/06/summer-camp-2048px-1199232997-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=1024', 'Awesome place! Out of this world!!'),
  (2, 2, 5, 'https://images.squarespace-cdn.com/content/v1/59bb61daf6576ef9831f52be/1508890975637-2YBAC6JFZ4LZ533869N6/clayoquot.jpg', 'Best vacation ever!!'),
  (1, 3, 5, 'https://res.cloudinary.com/deb1jjsn0/image/upload/v1669503129/yei6bf744vkpsihobqob.jpg', 'Amazing Glamping Experience! The Whole family enjoyed it!!'),
  (3, 1, 4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvvt3lJNuD85yjk_qgFRrpurjBYlr3y4g3yg&usqp=CAU', 'Had a great time...definitely recommend to friends and family'),
  (1, 3, 4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiJl247TjUt5f2s2Ldg-kcn9FhCcDF3YFlSg&usqp=CAU', 'Refreshing and revitalizing vacay...time and money well spent!'),
  (2, 2, 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmlsRKYuRpZkAHfa22hF2REY_9mGr1Ejv02Q&usqp=CAU', 'I would have had more fun pitching a tent in my backyard...total ripoff')
  ON CONFLICT DO NOTHING;

-- Create a database called glampcamp on postgres, then running the following code below
-- psql -d glampcamp -a -f db/schema.sql