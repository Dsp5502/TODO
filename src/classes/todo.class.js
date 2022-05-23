export class Todo {
  static fromJson({ id, tarea, completado, creado }) {
    const tempTodo = new Todo(tarea);
    tempTodo.id = id;
    tempTodo.complete = completado;
    tempTodo.creado = creado;
    return tempTodo;
  }

  constructor(tarea) {
    this.tarea = tarea;
    this.id = new Date().getTime(); //12345646789
    this.complete = false;
    this.creado = new Date();
  }
}
