const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
const path = require("path");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// A simple route to check if the app is working
app.get("/", async (request, response) => {
  try {
    const todos = await Todo.findAll();  // Fetch todos from DB
    response.render("index", { todos });  // Render index.ejs with todos data
  } catch (error) {
    console.error(error);
    response.status(500).send("Error loading the page");
  }
});


// Fetch all todos
app.get("/todos", async function (_request, response) {
  try {
    console.log("Processing list of all Todos ...");
    // Query the database for all todos
    const todos = await Todo.findAll();
    return response.json(todos);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Failed to fetch todos" });
  }
});

// Fetch a single todo by its ID
app.get("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    if (todo) {
      return response.json(todo);
    } else {
      return response.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Failed to fetch todo" });
  }
});

// Create a new todo
app.post("/todos", async function (request, response) {
  try {
    const { title, dueDate, completed } = request.body;
    const todo = await Todo.create({
      title,
      dueDate,
      completed,
    });
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json({ error: "Failed to create todo" });
  }
});

// Mark a todo as completed
app.put("/todos/:id/markAsCompleted", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    if (!todo) {
      return response.status(404).json({ error: "Todo not found" });
    }
    todo.completed = true;
    await todo.save(); // Save the updated todo
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json({ error: "Failed to mark todo as completed" });
  }
});

// Delete a todo by its ID
// app.js

app.delete("/todos/:id", async (request, response) => {
  try {
    const todo = await Todo.findByPk(request.params.id);
    if (!todo) {
      return response.json(false);  // Return false if todo not found
    }
    await todo.destroy();
    return response.json(true);  // Return true if deletion was successful
  } catch (error) {
    console.error(error);
    return response.status(500).json(false);  // Return false for internal errors
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

module.exports = app;
