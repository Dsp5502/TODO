import { TodoList } from './classes';
import { crearTodoHtml } from './js/componentes';
import './styles.css';

export const tareasListas = new TodoList();

tareasListas.todos.forEach(crearTodoHtml);

console.log('tareasListas', tareasListas.todos);
