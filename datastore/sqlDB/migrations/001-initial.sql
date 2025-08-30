CREATE TABLE users (
  id   varchar primary key,
  firstName varchar not null,
  lastName varchar not null,
   email varchar not null unique,
  username varchar not null unique,
   password varchar not null
);
create TABLE posts(
    id varchar primary key,
    title varchar not null,
    url varchar not null unique,
    userId varchar not null,
    postedAt INT not null,
    foreign key (userId) references users (id)
);


