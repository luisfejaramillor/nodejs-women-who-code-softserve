// Import required modules
const express = require("express");
const bodyParser = require("body-parser");

// Set the port to 3000
const PORT = 3000;

// Create an Express app instance
const app = express();

// Import data and define API endpoint
const { obj } = require("../02-http/data");
const endPoint = "/api/v2/users";

// Use middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Define middleware functions to handle errors
const errorLogger = (err, req, res, next) => {
  next(err);
};

const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(400);
  res.json(err);
};

// Define a function to verify if an ID exists in the data
const verifyId = (id) => {
  return obj.find((e) => e.id === parseInt(id));
};

// Define the routes for the API
// GET requests for the root and user data
app.get("/", (req, res) => {
  res.send(obj);
});

app.get(endPoint, (req, res) => {
  res.json(obj);
});

// GET request for a specific user
app.get(`${endPoint}/:id`, (req, res) => {
  const { id } = req.params;
  const result = verifyId(id);

  if (!result) {
    throw new Error("User not found");
  }
  res.json(result);
});

// POST request to add a new user
app.post(endPoint, (req, res) => {
  let data = req.body;
  obj.push(data);
  res.json(obj);
});

// PUT request to update a specific user
app.put(`${endPoint}/:id`, (req, res) => {
  const { id } = req.params;
  const result = verifyId(id);
  const keys = Object.keys(req.body);
  if (!result) {
    throw new Error("User not found");
  }
  const newObj = obj.map((prop) => {
    if (result.id === prop.id) {
      keys.forEach((key) => {
        if (result[key]) {
          prop[key] = req.body[key];
        }
      });
      return prop;
    }
    return {
      ...prop,
    };
  });
  console.log(newObj);
  res.json(newObj);
});

// DELETE request to remove a specific user
app.delete(`${endPoint}/:id`, (req, res) => {
  const { id } = req.params;
  const result = verifyId(id);
  if (!result) {
    throw new Error("User not found");
  }
  const index = obj.findIndex((e) => e.id === result.id);
  obj.splice(index, 1);
  res.send(obj);
});

// Use error-handling middleware functions
app.use(errorHandler);
app.use(errorLogger);

// Start the server
app.listen(PORT, () => {
  console.log("Listening at http://localhost");
});