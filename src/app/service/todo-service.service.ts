import { Injectable } from '@angular/core';
import { Apollo, } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { todo } from '../store/models/Todo';
import { get_todo } from '../graphql/queres'
import { create_Todo, del_todo } from '../graphql/mutation';
import { Store } from '@ngrx/store';


@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
  constructor(private apollo: Apollo, private store: Store) { }

  fetchTodo(): Observable<todo[]> {
    return this.apollo.query({ query: get_todo }).pipe(map((todo: any) => { console.log("inside fetch query"); console.log(todo); return todo.data.todos }))
  }

  createTodo(reqbody: todo) {
    console.log("inside create Todo:", reqbody)
    return this.apollo.mutate({
      mutation: create_Todo,
      variables: { todoInput: reqbody }
    })
      .pipe(map((result: any) => result.data.createTodo))
  }

  delTodo(id: Number): Observable<todo> {
    console.log("inside deleteTodo:", id)
    return this.apollo.mutate({
      mutation: del_todo,
      variables: { IdInput: id }
    })
      .pipe(map((result: any) => { console.log("deleted:", result); return result.data.todos }))
  }

}
