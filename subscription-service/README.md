# Subscription Service

## :wrench: Configuration
To run this service out of Docker, you have to create a `.env.development` file in this service root folder, with the following variables:

```bash
MONGO_URL='the mongo uri to perform the conection' #required example: "mongodb://127.0.0.1:27017/db-name"
RABBIT_MQ_URL="" #required example: "amqp://localhost"
PORT=4000 #optional The port number the server will be listening on if no-specified the default value is 4000
```
![-----------------------------------------------------](https://res.cloudinary.com/olyn/image/upload/v1637594127/GitHub%20Images/rainbow_xj5iyq.png)

## :gem: Installation

We recommend using the [Node.js](https://nodejs.org/) LTS version, and the `npm` (all instructions are given based on npm).
Run the following command to install all the dependencies
```bash
> npm install
```
![-----------------------------------------------------](https://res.cloudinary.com/olyn/image/upload/v1637594127/GitHub%20Images/rainbow_xj5iyq.png)

## :computer: Usage

#### Run the dev script:

```bash
> npm run dev
```
From your browser open the API Documentation through the route
`/api/v1/subscriptions/api-docs`

![PNG](https://res.cloudinary.com/olyn/image/upload/v1639655904/GitHub%20Images/subscription_service_document_dsixyk.png)

![-----------------------------------------------------](https://res.cloudinary.com/olyn/image/upload/v1637594127/GitHub%20Images/rainbow_xj5iyq.png)

## :bar_chart: Tests
To execute the tests, run the following command:
```bash
> npm run test
```
