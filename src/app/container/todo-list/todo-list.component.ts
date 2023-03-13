import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { TodoServiceService } from 'src/app/service/todo-service.service';
import { delTodo, updateTodo, addTodo, getTodo } from 'src/app/store/actions/action';
import { todo } from 'src/app/store/models/Todo';
import { selectTodos } from 'src/app/store/selectors/selector';


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
    this.service.fetchTodo().subscribe((listTodo: any) => {
      console.log("inside subscribe of fetch todo:", listTodo)
      this.store.dispatch(getTodo({ listTodo }));
      console.log("reached till here:", listTodo)
      this.store.select(selectTodos)
        .subscribe(todos => { console.log(todos); this.todos$ = todos; console.log("Todos:", this.todos$) })
    })
  }

  AddTodo(addTodos: todo) {
    this.service.createTodo(addTodos).subscribe(addTodos => {
      console.log("After Subscribing:", addTodos);
      this.store.dispatch(
        addTodo({ addTodos })
      )
    })
  }

  delTodo(todo: any) {
    this.service.delTodo(todo.id)
      .subscribe(data => this.store.dispatch(delTodo({ id: data.id })))
  }

  upTodo(updatedData: any) {
    this.service
      .updateTodo(updatedData)
      .subscribe(data => this.store.dispatch(updateTodo({ upTodo: data.updateTodo.updateTodo, id: updatedData.id })))
  }
}
