// stores/useTodoStore.js
import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
  }),
  actions: {
    addTodo(text) {
      this.todos.push({ text, completed: false });
      this.saveTodos();
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
      this.saveTodos();
    },
    editTodoText(index, newText) {
      this.todos[index].text = newText;
      this.saveTodos();
    },
    toggleTodoCompletion(index) {
      this.todos[index].completed = !this.todos[index].completed;
      this.saveTodos();
    },
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },
    loadTodos() {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        this.todos = JSON.parse(savedTodos);
      }
    },
  },
  getters: {
    incompleteTodosCount: (state) => state.todos.filter(todo => !todo.completed).length,
  },
});
