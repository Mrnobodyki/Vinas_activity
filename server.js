const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

let mockData  = [
    { id: 1, name: "Product A", price: 10 },
    { id: 2, name: "Product B", price: 20 },
    { id: 3, name: "Product C", price: 30 },
    { id: 4, name: "Product D", price: 40 },
  ];
  
  app.get("/items", (req, res) => {
    res.json(mockData); // to send the books array as a response
  });

  app.get("/items/:id", (req, res) => {
    const Data = mockData.find((b) => b.id === parseInt(req.params.id)); // to find the item by id
    if (!Data) return res.status(404).json({ message: "Items not found" }); // to send a 404 status code and a message if the item is not found
    res.json(Data); // to send the item as a response
  });

  app.post("/items", (req, res) => {
    const { name, price } = req.body; // to get the title and author from the request body
    const newData = { id: mockData.length + 1, name, price }; // to create a new item object
    mockData.push(newData); // to add the new item to the item array
    res.status(201).json(newData); // to send the new item as a response
  });

  app.put("/items/:id", (req, res) => {
    const Data = mockData.find((b) => b.id === parseInt(req.params.id)); // to find the book by id
    if (!Data) return res.status(404).json({ message: "items not found" }); // to send a 404 status code and a message if the book is not found
  
    const { name, price } = req.body; // to get the title and author from the request body
    Data.name = name; // to update the title of the book
    Data.price = price; // to update the author of the book
    res.json(Data); // to send the updated book as a response
  });

  app.delete("/items/:id", (req, res) => {
    const index = mockData.findIndex((b) => b.id === parseInt(req.params.id)); // to find the index of the book by id
    if (index === -1) return res.status(404).json({ message: "item not found" }); // to send a 404 status code and a message if the book is not found
  
    mockData.splice(index, 1); // to delete the book from the books array
    res.status(204).send(); // to send a 204 status code
  });