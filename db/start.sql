DROP TABLE IF EXISTS account;
DROP TABLE IF EXISTS product_image;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS product_inventory;

CREATE TABLE account (
    id SERIAL PRIMARY KEY,
    username VARCHAR (200) NOT NULL UNIQUE,
    fname VARCHAR (200) NOT NULL,
    lname VARCHAR (200) NOT NULL,
    email VARCHAR (200) NOT NULL UNIQUE,
    is_admin Boolean NOT NULL DEFAULT false,
    password TEXT NOT NULL,
    created_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE product_inventory (
    id SERIAL PRIMARY KEY,
    quantity INT NOT NULL DEFAULT 0,
    created_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    title VARCHAR (200) NOT NULL,
    price NUMERIC (9,6) NOT NULL,
    description TEXT,
    inventory_id INT REFERENCES product_inventory (id),
    created_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CHECK (price > 0)
);

CREATE TABLE product_image (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    product_id INT NOT NULL REFERENCES product (id) ON DELETE CASCADE
);