CREATE TABLE products (
  id BIGINT UNSIGNED PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  price INT NOT NULL,
  cat_prefix VARCHAR(255) NOT NULL,
  img VARCHAR(255) NOT NULL ,
  max INT NOT NULL 
);
create TABLE categories(
    id BIGINT UNSIGNED PRIMARY KEY,
    title varchar not null,
    prefix varchar not null unique,
    img VARCHAR(255) NOT NULL UNIQUE
);
create TABLE wishlist(
  userId BIGINT UNSIGNED NOT NULL,
  productId BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (userId, productId),
  foreign key (userId) references users (id),
  foreign key (productId) references products(id)

)


