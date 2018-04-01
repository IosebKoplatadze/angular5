import { Component, OnInit } from '@angular/core';
import { Todo } from '../_models/Todo';
import { TodosService } from '../_services/todos.service';
import { Pagination, PaginatedResult } from '../_models/pagination';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  newTodo: Todo = {
    userId: 0,
    id: 0,
    title: '',
    completed: false
  }
  pagination: Pagination = new Pagination();

  constructor(private todosService: TodosService) { }

  ngOnInit() {
    this.loadTodos();
  }
  
  loadTodos(){
    this.todosService.getTodos(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<Todo[]>) => {
        this.todos = res.result;
        this.pagination.totalItems = res.totalItems;
      });
  }

  addTodo() {
    this.todosService.addTodo(this.newTodo)
      .subscribe(x => {
        console.log("added", x);
        this.todos.unshift(x as Todo);
        this.newTodo.title='';
      },
        err => console.log(err));
  }

  changeCompleted(todo: Todo) {
    todo.completed = !todo.completed;
    this.todosService.updateTodo(todo)
      .subscribe(x => {
        console.log("updated", x);
        let i = this.todos.findIndex(t => t.id == x.id);
        this.todos[i] = x;
      },
        err => console.log(err));
  }

  deleteTodo(todoId: number) {
    this.todosService.deleteTodo(todoId)
      .subscribe(x => {
        console.log("deleted", x);
        this.todos.splice(this.todos.findIndex(t => t.id == todoId), 1);
      },
        err => console.log(err));
  }

  
  pageChanged(event: Pagination): void {
    this.pagination = event;
    this.loadTodos();
  }
}
