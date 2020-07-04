// Schema of database

-- CREATE DATABASE authtodolist;

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

--todos

CREATE TABLE todos
(
    todo_id     SERIAL,
    user_id     UUID,
    description VARCHAR(255) NOT NULL,
    PRIMARY KEY (todo_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

--fake users data

insert into users (user_name, user_email, user_password) values ('Adam', 'adam@gmail.com', 'asd123456');

--fake todos data

insert into todos (user_id, description) values ('36a99a85-d10c-4344-ba97-5a997579453d', 'clean room');
