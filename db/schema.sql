-- create database
CREATE DATABASE tripplanner;

-- create tables
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    password_digest TEXT,
    total_trips INT
);

CREATE TABLE trips (
    id SERIAL PRIMARY KEY,
    title TEXT,
    status TEXT,
    num_stops INT,
    start_date DATE,
    end_date DATE,
    origin TEXT,
    destination TEXT,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    type TEXT
);

CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    name TEXT,
    date_time TIMESTAMP,
    location_id TEXT,
    cost TEXT,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories (id)
);

CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    country TEXT,
    city TEXT,
    address TEXT
);



-- insert into table
INSERT INTO trips (title, origin, destination, status) 
VALUES ('NZ', 'Sydney', 'Christchurch', 'Past');

-- add columns and alter tables
ALTER TABLE activities
ADD COLUMN trip_id INT,
ADD FOREIGN KEY (trip_id) REFERENCES trips (id) ON DELETE CASCADE;

-- fix mistrake adding trip_id to trips
ALTER TABLE trips
DROP COLUMN trip_id;

-- add image_url column to trips
ALTER TABLE trips
ADD COLUMN image_url TEXT;

-- create comment table
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content TEXT,
    user_id INTEGER NOT NULL,
    dish_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE, 
    FOREIGN KEY (dish_id) REFERENCES dishes (id) ON DELETE CASCADE
);

-- add trip id to activities table
ALTER TABLE activities
ADD COLUMN trip_id INT;
