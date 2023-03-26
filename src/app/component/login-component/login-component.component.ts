import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthService } from 'src/app/auth.service';
import { HttpClient } from "@angular/common/http"
// import { StorageService } from 'src/app/service/storage.service';
import { TodoServiceService } from '../../service/todo-service.service'
@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {
  constructor(private router: Router, private http: HttpClient, private todoservice: TodoServiceService) { }
  username: string = ""
  password: string = ""

  isLoggedIn = false;
  isLoginFailed = false;
  login() {

    this.todoservice.login(this.username, this.password)
      .subscribe((response) => {
        console.log("Data:", response)
        // const token = response
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IlVzZXJuYW1lIjoiYW1hbiIsIlBhc3N3b3JkIjoiYW1hbjEyMyJ9LCJpYXQiOjE2NzkzMDcxNTMsImV4cCI6MTY3OTMwNzQ1M30.7FJaaARv7-SewivgK-g8BWz_A67aWG9TqnQLZKepzP4"
        localStorage.setItem('jwt', token)
        this.isLoggedIn = true
        this.router.navigate(['/Todo'])
      })
  }
}
