<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Backend for a rate-limit Challenge developed on Nest.js</p>

## Description

This application is a simple backend that serves as a solution for a rate-limiting challenge. <br>
The challenge is to restrict the number of requests that a user can make in a given time frame.<br>
It also supports concurrent requests by instantiating multiple instances of the app using the Nest.js cluster module.
<br>
For performance, it features a cache system using Redis.
<br>
For storage, it uses MongoDB and Redis for caching.

## Running the app
The app can be run using `docker-compose`. Simply navigate to the root folder, where the `docker-compose.yml` file is located, and run the following command:

```bash
docker-compose up
```
This will start the necessary containers, including the `app`, `redis` and `mongo`. 

Please make sure you have installed Docker and Docker Compose before running the command above.

## Environment Variables

The app uses the following environment variables, that can be set in the `Dockerfile` file:
```bash
MONGO_URI
PORT
REDIS_HOST
REDIS_PORT
IP_RATE_LIMIT
TOKEN_RATE_LIMIT
```

# Endpoints & Description
These are simple endpoints to test the rate-limiting.<br>
Weight is the increment of the rate-limit counter for each request made to the endpoint. So, if the rate-limit is set to 100, and the weight of the endpoint is 5, the user will be able to make 20 requests using his/her ip or token before the rate-limit is reached. This is was done due to the requirements of the code-challenge I've received.

## Public Endpoints

| Endpoint | Description | Weight |
| --- | --- | --- |
| GET /products | Returns a list of products | 5 |
| GET /products/:id | Returns a product by id | 2 |
| GET /products/:id/reviews | Returns just a string | 1 |
| GET /flushall | Flushes the redis cache | N/A |


## Private Endpoints
Private endpoints require a token to be passed in the header of the request, on the `x-access-token` field. Any valid `UUID` will work as a token.

| Endpoint | Description | Weight |
| --- | --- | --- |
| GET /couriers | Returns a list of couriers | 5 |
| GET /couriers/:id | Returns a courier by id | 2 |
| GET /user/:id | Returns just a string | 1 |


## Rate-limiting

The rate-limiting can be configured by changing the values of the environment variables:
```bash
IP_RATE_LIMIT //DEFAULT: 100
TOKEN_RATE_LIMIT //DEFAULT: 200
```
The rate-limit module was custom-made as requested by the code-challenge.
The token rate-limit is applied to the private endpoints, while the IP rate-limit is applied to the public endpoints.
Once the rate-limit is reached, the app will return a `429` status code and will have a default expiration time of 60 minutes.
To clear it, simply make a `GET` request to the `/flushall` endpoint.

## Stay in touch

- Author - [Renan Soares](https://www.linkedin.com/in/renanss/)

## License

[MIT licensed](LICENSE).
