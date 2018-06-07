# Strudel Haus

Full-stack application that facilitates online fundraising sales, tracks detailed fundraising sales data, and streamlines the entire fundraising process.  There will be three types of users who interact with this application: Administrator, Organization Leader, and Customer. The Administrator (Thomas Ruhland) will be able to create and manage organizations, fundraising campaigns and strudel products, and will be able to view their current production pipeline based on campaign dates. An Organization leader will be able to manage all orders for each campaign tied to their organization, as well as access current sales data for each campaign. Finally, a Customer will be able to purchase strudels via our fundraising sales portal (driven by Square).

## Built With

Node.js, Express, Postgresql, React.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/en/guide/routing.html)
- [Postgresql](https://www.postgresql.org/docs/)
- [React](https://reactjs.org/docs/hello-world.html)


### Main Libraries

- momentJS
- nodeMailer
- Chance
- PrintJS
- SweetAlert2-React
- React-Bootstrap


### Installing

- copy or Clone GitHub Repository to your local system
- navigate to the root folder of the project
- create sql database with the provided structure below with name of strudelhaus
- npm install in terminal
- npm run client in terminal
- npm run server in terminal

### .env Requirements

- you will need to create a file called ".env" and add to the root of the project
- In the .env file you will need to create the following variables
    - SERVER_SESSION_SECRET
    - REFRESH_TOKEN
    - ACCESS_TOKEN
    - CLIENT_SECRET
    - CLIENT_ID
    - EMAIL
- if you have access to the hand off document then you can you will have the values for these variables
- if you do not have access to the hand off document then you will need to make Gmail OAuth profile to gain access to the EMAIL, REFRESH_TOKEN, CLIENT_SECRET, CLIENT_ID, AND ACCESS_TOKEN.
[Gmail OAuth](https://developers.google.com/gmail/api/auth/about-auth)



```sql
CREATE TABLE "person"
(
    "id" serial NOT NULL PRIMARY KEY,
    "username" varchar(80) NOT NULL UNIQUE,
    "password" varchar(1000) NOT NULL,
    "token" varchar(100),
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
    "product_type" INT REFERENCES "product_type" ON DELETE CASCADE
);

CREATE TABLE "organization"
(
    "id" serial NOT NULL PRIMARY KEY,
    "person_id" INT REFERENCES "person" ON DELETE CASCADE,
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
    "organization_id" INT REFERENCES "organization" ON DELETE CASCADE,
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
    "campaign_id" int REFERENCES "campaign" ON DELETE CASCADE,
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
    "campaign_id" INT REFERENCES "campaign" ON DELETE CASCADE,
    "product_id" int REFERENCES "product" ON DELETE CASCADE
);

CREATE TABLE "order"
(
    "id" serial NOT NULL PRIMARY KEY,
    "customer_id" INT REFERENCES "customer" ON DELETE CASCADE,
    "product_name" varchar(1000),
    "product_price" varchar(200),
    "product_sku" varchar(200),
    "campaign_id" integer,
    "quantity" int NOT NULL DEFAULT '0'
);


## Screen Shot


![admin](adminScreenShot.png)
![org leader](orgLeaderScreenShot.png)
![org leader](orgLeaderOrdersScreenShot.png)
![customer](customerPortalScreenShot.png)
![customer](customerPortal2ScreenShot.png)

## Documentation


[Scope Document](https://docs.google.com/document/d/1Pl_8QdPQX4c-ydZVE4bhBhnwC8q2ySch3dRloLTakEo/edit?usp=sharing)

### Completed Features

- [x] Add/update organizations
- [x] Add campaigns
- [x] Print campaign totals for strudels
- [x] Add Products
- [x] CSV upload for Org leader
- [x] Org Leader view with campaign progess bar
- [x] Unique campaign customer shopping portal
- [x] Square online payment

### Next Steps

- [ ] FileStack upload for new product images and organization images


## Deployment


## Authors

Joshua Leary
Steve Hogan
Teagan Nouska
Jonathan Kruse

-- ## Acknowledgments

-- * Hat tip to anyone who's code was used