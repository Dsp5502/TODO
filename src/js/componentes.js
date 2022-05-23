import { tareasListas } from '../index';
import { Todo } from '../classes';

//* Referencias en el HTML
const divTodolist = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {
  const { tarea, complete, id } = todo;
  const htmlTodo = `
  <li class=${complete && 'completed'} data-id=${id}>
						<div class="view">
							<input class="toggle" type="checkbox" ${complete && 'checked'}>
							<label>${tarea}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li>
  `;

  const div = document.createElement('div');
  div.innerHTML = htmlTodo;
  divTodolist.append(div.firstElementChild);
  return div.firstElementChild;
};

//* Eventos

txtInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13 && txtInput.value.length > 0) {
    const nuevoTodo = new Todo(txtInput.value);
    tareasListas.nuevoTodo(nuevoTodo);
    crearTodoHtml(nuevoTodo);
    txtInput.value = '';
  }
});

divTodolist.addEventListener('click', (e) => {
  const nombreElemento = e.target.localName; // input , label o boton}
  const todoElemento = e.target.parentElement.parentElement; // li
  const todoId = todoElemento.getAttribute('data-id');
  console.log(todoElemento);
  if (nombreElemento.includes('input')) {
    tareasListas.marcarCompletado(todoId);
    todoElemento.classList.toggle('completed');
  }

  if (nombreElemento.includes('button')) {
    tareasListas.eliminarTodo(todoId);
    divTodolist.removeChild(todoElemento);
  }
});

btnBorrar.addEventListener('click', () => {
  tareasListas.eliminarCompletado();
  for (let i = divTodolist.children.length - 1; i >= 0; i--) {
    const elemento = divTodolist.children[i];
    console.log(elemento);
    if (elemento.classList.contains('completed')) {
      divTodolist.removeChild(elemento);
    }
  }
});

ulFiltros.addEventListener('click', (e) => {
  const filtro = e.target.text;
  if (!filtro) return;
  anchorFiltros.forEach((f) => f.classList.remove('selected'));
  e.target.classList.add('selected');
  for (const elemento of divTodolist.children) {
    elemento.classList.remove('hidden');
    const completado = elemento.classList.contains('completed');
    switch (filtro) {
      case 'Pendientes':
        if (completado) {
          elemento.classList.add('hidden');
        }
        break;
      case 'Completados':
        if (!completado) {
          elemento.classList.add('hidden');
        }
        break;
    }
  }
});
