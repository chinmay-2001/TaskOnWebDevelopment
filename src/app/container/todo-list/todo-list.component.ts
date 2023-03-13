import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoServiceService } from 'src/app/service/todo-service.service';
import { delTodo, updateTodo, addTodo } from 'src/app/store/actions/action';
import { todo } from 'src/app/store/models/Todo';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos$: any;
  constructor(private store: Store, private service: TodoServiceService) {
  }
  ngOnInit(): void {
    console.log("here")
    this.todos$ = this.service.fetchTodo()
  }


  AddTodo(addTodos: todo) {
    this.service.createTodo(addTodos).subscribe(addTodos => { console.log("After Subscribing:", addTodos); this.store.dispatch(addTodo({ addTodos })) })
  }

  delTodo(todo: any) {
    this.service.delTodo(todo.id).subscribe(data => console.log(data))
  }


  upTodo(updatedData: any) {
    this.service.updateTodo(updatedData).subscribe(data => console.log(data))
  }
}
