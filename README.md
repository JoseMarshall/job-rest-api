# Job Search REST API

A Job Search API that everyone can use, and look for their next job. From anywhere, even from space, companies can place job ads

<details><summary>:page_with_curl: Overview</summary>

In this first version, it provides endpoints to:
#### Jobs
* Create a Job Ad: `POST /api/v1/jobs`
* Update a Job Ad: `PATCH /api/v1/jobs/{id}`
* Delete a Job Ad: `DELETE /api/v1/jobs/{id}`
* Get a Job Ad: `GET /api/v1/jobs/{id}`
* List Jobs: `GET /api/v1/jobs?page=PAGE_NUMBER`
* API Docs: `GET /api/v1/jobs/api-docs`

#### Subscriptions
* Subscribe to Job Ads: `POST /api/v1/subscriptions`
* Unsubscribe: `GET /api/v1/subscriptions/{id}/cancel`
* Verify Email Address: `GET /api/v1/subscriptions/{id}/verify`
* API Docs: `GET /api/v1/subscriptions/api-docs`
</details>
<details><summary> :fire: Techs/Libs/Frameworks</summary>

- [`Typescript`](https://www.typescriptlang.org/)
- [`ExpressJS`](https://expressjs.com/)
- [`Joi`](https://joi.dev/api/?v=17.4.2)
- [`Mongoose`](https://mongoosejs.com/) 
- [`Swagger`](https://swagger.io/)
- [`ESLint`](https://eslint.org/)
- [`Prettier`](https://prettier.io/)
- [`Jest`](https://jestjs.io/)
- [`Supertest`](https://www.npmjs.com/package/supertest)
- [`Docker`](https://www.docker.com/)
- [`Ngnix`](https://www.nginx.com/)
- [`RabbitMQ`](https://www.rabbitmq.com/)
</details>

## :wrench: Configuration


After you clone this repo :octocat: to your local machine, go to notification-service folder and create a new file named `job-rest-api-key.json` this file will contain the credentials to connect to the Gmail API server and should contain the following keys:

```bash
{
  "clientId": "9809437...............",
  "clientSecret": "GOCSPX-....................",
  "refreshToken": "1//04......................................................................",
  "accessToken": "ya29.........................................................................."
}

```
In order to get these values, you must config the OAuth2 CLient from your google account, this tutorial can help [Node.js - SEND Emails Using Nodemailer](https://www.youtube.com/watch?v=18qA61bpfUs)
![-----------------------------------------------------](https://res.cloudinary.com/olyn/image/upload/v1637594127/GitHub%20Images/rainbow_xj5iyq.png)
## :computer: Usage
You should have Docker installed on your computer in order to run the application 

From the project root folder run the following docker-compose command:

```bash
> docker-compose up --build
```
If everything is configured as expected, you will have the project running:

>You can find in the root folder a file named `Job Search API.postman_collection.json` containing a collection with a few requests which you can use to test the endpoints using [Postman](https://www.postman.com/downloads/). To know more about it, visit the following link [Import data files](https://learning.postman.com/docs/running-collections/working-with-data-files/).

Open the API Docs to learn more about the available endpoints, how to use them, and all of its allowed parameters. Go to the API docs through your browser, hit `'/api/v1/jobs/api-docs'` for jobs endpoints documentation example `http://localhost:8080/api/v1/jobs/api-docs`

![Gif](https://res.cloudinary.com/olyn/image/upload/v1639617714/GitHub%20Images/job-rest-api-docs_dhtqga.gif)

![-----------------------------------------------------](https://res.cloudinary.com/olyn/image/upload/v1637594127/GitHub%20Images/rainbow_xj5iyq.png)

## :bar_chart: Tests
To execute the tests, run the test script for each service:

You should have a similar output:

![Gif](https://res.cloudinary.com/olyn/image/upload/v1639616649/GitHub%20Images/test-job-rest-api_tyzto7.gif)

![-----------------------------------------------------](https://res.cloudinary.com/olyn/image/upload/v1637594127/GitHub%20Images/rainbow_xj5iyq.png)

## :whale2: Running in Docker

You can run the application on Docker, using the docker-compose commands to do so:
```bash
> docker-compose up --build
```

By default, it listens to **port 8080**, but you can change it in `docker-compose.yml` file on the root folder, for example if you want to listen on port 5000:

![Gif](https://res.cloudinary.com/olyn/image/upload/v1639615716/GitHub%20Images/docker-compose_kfehwn.gif)
