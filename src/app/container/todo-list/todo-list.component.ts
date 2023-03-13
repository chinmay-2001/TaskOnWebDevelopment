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
  // todos$ = this.store.select(selectTodos)
  constructor(private store: Store, private service: TodoServiceService) {
  }
  ngOnInit(): void {
    console.log("here")
    this.todos$ = this.service.fetchTodo()
  }


  AddTodo(addTodos: todo) {
    this.service.createTodo(addTodos).subscribe(addTodos => this.store.dispatch(addTodo({ addTodos })))
  }

  delTodo(todo: any) {
    this.service.delTodo(todo.id).subscribe(data => console.log(data))
  }

  // oldtodo: todo = { name: "chinmay", priority: "low" };

  setOld(old: todo) {
    // this.oldtodo = old
  }

  upTodo(upTodo: todo) {
    // this.store.dispatch(updateTodo({ upTodo: upTodo, oldtodo: this.oldtodo }))
  }
}
