import { Todo } from './todo.class';

export class TodoList {
  constructor() {
    // this.todos = [];
    this.cargarLocalStorage();
  }

  nuevoTodo(todo) {
    this.todos.push(todo);
    this.guardarLocalStorage();
  }

  eliminarTodo(id) {
    this.todos = this.todos.filter((to) => to.id != id);
    this.guardarLocalStorage();
  }

  marcarCompletado(id) {
    this.todos.forEach((todo) => {
      if (todo.id == id) {
        todo.complete = !todo.complete;
        this.guardarLocalStorage();
      }
    });
  }

  eliminarCompletado() {
    this.todos = this.todos.filter((to) => !to.complete);
    this.guardarLocalStorage();
  }

  guardarLocalStorage() {
    localStorage.setItem('todo', JSON.stringify(this.todos));
  }

  cargarLocalStorage() {
    this.todos = localStorage.getItem('todo')
      ? JSON.parse(localStorage.getItem('todo'))
      : [];

    // this.todos = this.todos.map(Todo.fromJson);
  }
}
