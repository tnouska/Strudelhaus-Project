
CREATE TABLE "person"
(
    "id" serial NOT NULL PRIMARY KEY,
    "username" varchar(80) NOT NULL UNIQUE,
    "password" varchar(1000) NOT NULL,
    "role" varchar(500) 
);

CREATE TABLE "product_type"
(
    "id" serial NOT NULL PRIMARY KEY,
    "type" varchar(500)
);

CREATE TABLE "product"
(
    "id" serial NOT NULL PRIMARY KEY,
    "name" varchar(255) NOT NULL,
    "description" varchar(1000),
    "price" varchar(200),
    "sku" varchar(200),
    "img_url_1" varchar(1000),
    "img_url_2" varchar(1000),
    "product_type" INT REFERENCES "product_type"
);

CREATE TABLE "organization"
(
    "id" serial NOT NULL PRIMARY KEY,
    "person_id" INT REFERENCES "person",
    "name" varchar(500) NOT NULL,
    "street_address" varchar(500) NOT NULL,
    "city" varchar(500) NOT NULL,
    "state" varchar(500) NOT NULL,
    "zip_code" varchar(500) NOT NULL,
    "square_application_id" varchar(500),
    "square_access_token" varchar(500),
    "contact_name" varchar(500) NOT NULL,
    "contact_phone" varchar(500),
    "contact_email" varchar(500)
);
CREATE TABLE "campaign"
(
    "id" serial NOT NULL PRIMARY KEY,
    "organization_id" INT REFERENCES "organization",
    "url" varchar(500) UNIQUE,
    "name" varchar(500) NOT NULL,
    "date_start" varchar(500) NOT NULL,
    "date_end" varchar(500) NOT NULL,
    "notes" varchar(1000),
    "info_url" varchar(1000),
    "goal" varchar(500)
);

CREATE TABLE "customer"
(
    "id" serial NOT NULL PRIMARY KEY,
    "campaign_id" int REFERENCES "campaign",
    "notes" varchar(1000),
    "street_address" varchar(500),
    "city" varchar(500),
    "state" varchar(500),
    "zip_code" varchar(500),
    "name" varchar(500) NOT NULL,
    "email_address" varchar(500) NOT NULL,
    "name_of_reference" varchar(1000),
    "date_of_order" date NOT NULL default CURRENT_DATE
);

CREATE TABLE "available_item"
(
    "id" serial NOT NULL PRIMARY KEY,
    "campaign_id" INT REFERENCES "campaign",
    "product_id" int REFERENCES "product"
);

CREATE TABLE "order"
(
    "id" serial NOT NULL PRIMARY KEY,
    "customer_id" INT REFERENCES "customer",
    "available_item_id" INT REFERENCES "available_item",
    "quantity" int NOT NULL DEFAULT '0'
);
