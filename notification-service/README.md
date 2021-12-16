# Notification Service

Consume the messages coming from job and subscription services and notify the subscribed emails.

## :wrench: Configuration
To run this service out of Docker, you have to create a `.env.development` file in this service root folder, with the following variables:

```bash
MONGO_URL='the mongo uri to perform the conection' #required example: "mongodb://127.0.0.1:27017/db-name"
RABBIT_MQ_URL="" #required example: "amqp://localhost"
URL_ROOT="" #required The URL where the subscription and job service are listening to, example: "http://localhost:4000/api/v1" you may need a reverse proxy for this case
EMAIL_ADDRESS="" #required the Gmail account that will be used to send the email messages example: john.doe@gmail.com
```
create a new file named `job-rest-api-key.json` this file must contain the credentials to connect to the Gmail API server and should contain the following keys:

```bash
{
  "clientId": "9809437...............",
  "clientSecret": "GOCSPX-....................",
  "refreshToken": "1//04......................................................................",
  "accessToken": "ya29.........................................................................."
}

```
In order to get these values, you must config the OAuth2 CLient from your Gmail account, this tutorial can help [Node.js - SEND Emails Using Nodemailer](https://www.youtube.com/watch?v=18qA61bpfUs)

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
This will start consuming the messages on RAbbitMQ channels
![-----------------------------------------------------](https://res.cloudinary.com/olyn/image/upload/v1637594127/GitHub%20Images/rainbow_xj5iyq.png)

## :bar_chart: Tests
To execute the tests, run the following command:
```bash
> npm run test
```
