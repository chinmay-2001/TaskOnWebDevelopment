import { Injectable } from '@angular/core';
import { Apollo, } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { todo } from '../store/models/Todo';
import { get_todo } from '../graphql/queres'
import { create_Todo, del_todo, update_todo } from '../graphql/mutation';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Token } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  private loggedin = false
  constructor(private apollo: Apollo, private store: Store, private http: HttpClient, private jwtHelper: JwtHelperService) { }


  //Fetching Todo from backend
  fetchTodo(): Observable<todo[]> {
    return this.apollo
      .query({ query: get_todo })
      .pipe(map((todo: any) => {
        console.log("inside fetch query"); console.log(todo); return todo.data.todos
      }))

  }
  //creating Todo 
  createTodo(reqbody: todo) {
    console.log("inside create Todo:", reqbody)
    return this.apollo
      .mutate({
        mutation: create_Todo,
        variables: { todoInput: reqbody }
      })
      .pipe(map((result: any) => result.data.createTodo))
  }

  //Deleting Todo's
  delTodo(id: Number): Observable<any> {
    console.log("inside deleteTodo:", id)
    return this.apollo
      .mutate({
        mutation: del_todo,
        variables: { IdInput: id }
      })
      .pipe(map((result: any) => {
        console.log("deleted:", result); return result.data.delTodo
      }))
  }
  //updating Todo's
  updateTodo(updatedata: any): Observable<any> {
    console.log("updated Data:", updatedata)
    return this.apollo
      .mutate({
        mutation: update_todo,
        variables: { todoupdate: updatedata }
      })
      .pipe(map(
        (result: any) => {
          console.log("updated:", result); return result
        }))
  }


  login(Username: string, Password: string) {
    // try {
    return this.http
      .post<any>(
        'http://localhost:4000/api/login',
        {
          Username,
          Password
        })
    // }
    // catch {

    //   alert("incorrect email or password")
    //   return 
    // }

    // .subscribe(response => {
    //   console.log(response)
    //   // const token = response.token
    //   localStorage.setItem('jwt', token)
    //   this.loggedin = true
    // })
  }

  logout() {
    localStorage.removeItem('jwt')
    this.loggedin = false
  }

  isAuthenticated() {
    const token = localStorage.getItem('jwt');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getLoggedInUser() {
    const token = localStorage.getItem('jwt')
    const decoded = this.jwtHelper.decodeToken(token!)
    return decoded ? decoded.sub : null;
  }
}
