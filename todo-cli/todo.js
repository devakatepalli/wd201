const fs = require('fs');

class Todo {
  constructor() {
    this.todos = [];
  }

  add(todo) {
    this.todos.push({ ...todo, completed: false });
  }

  markAsComplete(index) {
    if (this.todos[index]) {
      this.todos[index].completed = true;
    }
  }

  overdue() {
    const today = new Date().toISOString().split('T')[0];
    return this.todos.filter((todo) => todo.dueDate < today);
  }

  dueToday() {
    const today = new Date().toISOString().split('T')[0];
    return this.todos.filter((todo) => todo.dueDate === today);
  }

  dueLater() {
    const today = new Date().toISOString().split('T')[0];
    return this.todos.filter((todo) => todo.dueDate > today);
  }
}

module.exports = Todo;
