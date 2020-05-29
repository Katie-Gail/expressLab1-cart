const express = require("express");
const cart = express.Router();
const endpointURI = "/cart";

let cartItems = [
  {
    id: 1,
    product: "soy milk",
    price: "$3.00",
    quantity: 1,
  },
  {
    id: 2,
    product: "cheese",
    price: "$5.00",
    quantity: 2,
  },
  {
    id: 3,
    product: "bread",
    price: "$3.50",
    quantity: 1,
  },
  {
    id: 4,
    product: "sparkling water",
    price: "$5.50",
    quantity: 2,
  },
];

let nextID = cartItems.length + 1;
//1. GET
cart.get(endpointURI, (req, res) => {
  res.json(cartItems);
  res.status(200);
});
//2. GET id
cart.get(`${endpointURI}/:id`, (req, res) => {
  id = parseInt(req.params.id);
  let item = cartItems.find((item) => item.id === id);
  if (item) {
    res.json(item);
    res.status(200);
  } else {
    res.status(404);
    res.send("ID Not Found");
  }
});
//3. POST
cart.post(endpointURI, (req, res) => {
  let newItem = req.body;
  newItem.id = nextID;
  cartItems.push(newItem);
  nextID++;
  res.json(newItem);
  res.status(201);
});
//4. PUT id
//have to update the object w all parameters except id
cart.put(`${endpointURI}/:id`, (req, res) => {
  let id = parseInt(req.params.id);
  let updatedItem = req.body;
  updatedItem.id = id;
  let foundIndex = cartItems.findIndex((item) => item.id === id);
  cartItems.splice(foundIndex, 1, updatedItem);
  res.json(updatedItem);
  res.status(200);
});
//5.DELETE id
cart.delete(`${endpointURI}/:id`, (req, res) => {
  let id = parseInt(req.params.id);
  let foundIndex = cartItems.findIndex((item) => item.id === id);
  if (foundIndex > -1) {
    cartItems.splice(foundIndex, 1);
    res.status(200);
    //must return some kind of response or else Postman never stops sending
    res.json(cartItems);
  } else {
    res.status(204);
  }
});

module.exports = { cart };
