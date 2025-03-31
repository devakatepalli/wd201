const Todo = require('../todo');

describe('Todo List Test Suite', () => {
  let todoList;

  beforeEach(() => {
    todoList = new Todo();
  });

  test('should add a new todo', () => {
    todoList.add({ title: 'Test todo', dueDate: '2025-04-01' });
    expect(todoList.todos.length).toBe(1);
  });

  test('should mark a todo as completed', () => {
    todoList.add({ title: 'Test todo', dueDate: '2025-04-01' });
    todoList.markAsComplete(0);
    expect(todoList.todos[0].completed).toBe(true);
  });

  test('should retrieve overdue items', () => {
    todoList.add({ title: 'Overdue task', dueDate: '2024-03-30' });
    expect(todoList.overdue().length).toBe(1);
  });

  test('should retrieve due today items', () => {
    const today = new Date().toISOString().split('T')[0];
    todoList.add({ title: 'Due today task', dueDate: today });
    expect(todoList.dueToday().length).toBe(1);
  });

  test('should retrieve due later items', () => {
    todoList.add({ title: 'Future task', dueDate: '2025-12-01' });
    expect(todoList.dueLater().length).toBe(1);
  });
});
