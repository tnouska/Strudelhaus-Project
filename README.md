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


### Installing

Steps to get the development environment running.

```sql
CREATE TABLE "users" (
  "id" serial primary key,
  "username" varchar(80) not null UNIQUE,
  "password" varchar(240) not null
);
```

## Screen Shot

Include one or two screen shots of your project here (optional). Remove if unused.

## Documentation

Link to a read-only version of your scope document or other relevant documentation here (optional). Remove if unused.

### Completed Features

High level list of items completed.

- [x] Feature a
- [x] Feature b

### Next Steps

Features that you would like to add at some point in the future.

- [ ] Feature c

## Deployment

Add additional notes about how to deploy this on a live system

## Authors

* Name of author(s)


## Acknowledgments

* Hat tip to anyone who's code was used