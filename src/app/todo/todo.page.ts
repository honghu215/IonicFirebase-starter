import { Todo, TodoService } from './../services/todo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {
  todos: Todo[];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe( res => {
      this.todos = res;
    });
  }

  remove(item) {
    this.todoService.removeTodo(item.id);
  }

}
