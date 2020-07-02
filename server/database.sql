// Schema of database

-- CREATE DATABASE perntodo;

-- CREATE table todo (
--     todo_id SERIAL PRIMARY KEY,
--     description VARCHAR(255)
-- );

CREATE DATABASE authtodolist;

-- users

CREATE TABLE users
(
    user_id       UUID DEFAULT uuid_generate_v4(),
    user_name     VARCHAR(255) NOT NULL,
    user_email    VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);


--fake users data

insert into users (user_name, user_email, user_password) values ('Adam', 'adam@gmail.com', 'asd123456');
