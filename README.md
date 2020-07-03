# Trustly's Technical Challenge for Back-End / Full-Stack

Develop an API that returns the total number of lines and the total number of bytes of all the files of a given public Github repository, grouped by file extension.

## Requirements:

· You API must be written using Java 8 or newer, ECMAscript 2015 or newer, or C# 8.0;

· Data must be retrieved from Github website by using web scraping techniques. Do not use Github’s API;

· Do not use web scraping libraries. We would like to know your ideas on how it can be done;

· Your API must support thousands of concurrent requests;

· We think it’s ok if the first request to a particular repository takes some time to respond (since you depend on Github website response times), but we don’t expect the subsequent requests to be long;

· We don’t expect to get timeout errors;

· We must understand your code and use your API without having to ask you any questions. Our primary language is English so please use it on comments and documentation;

· We’d like to see SOLID principles in your solution;

· You are free to choose your API contracts (parameters and response formats) but we’d like to be able to integrate it with any other existing solutions;

· You don’t need to persist any data (but feel free to do it if you want);

· We’d like to see at least one automated test;

· It’s a plus if you deploy your solution to a cloud provider like Amazon AWS or Heroku and send us the link to access it. Otherwise publish a Docker image with your application (including its dependencies) in a registry like Docker Hub and let us know how to get it;

## Getting Started

To consume this API, just make a request to the server on port 3000, calling the "get" function with the url parameter of github.

To install this API, follow the instructions below.

### Prerequisites

What things you need to install the software and how to install them.

```
NODE JS - STABLE VERSION
```

### Installing

After installing a stable version on your server, clone this repository using the command below.

```
mkdir gitdetails
cd gitdetails
git clone https://github.com/tuliogaio/gitdetails
```

Run it.

```
npm i
```

## Running the tests

```
npm run test
```

## Authors

* **Túlio César Gaio** - *Linkedin* - [Linkedin](https://www.linkedin.com/in/tuliogaio/)
