import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { TodoListComponent } from './container/todo-list/todo-list.component';
import { fetchtodo } from './store/reducers/reducer';
import { TodoListComponentComponent } from './component/todo-list-component/todo-list-component.component';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { ApolloClientModule } from './graphql.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWTInterceptor } from './helper/http.interceptor';
import { JwtModuleOptions, JwtModule } from '@auth0/angular-jwt'
import { LoginComponentComponent } from './component/login-component/login-component.component';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}
const JWT_Module_Options: JwtModuleOptions = {
  config: {
    tokenGetter: tokenGetter,
    // whitelistedDomains: yourWhitelistedDomains
    allowedDomains: ['@gmail.com']
  }
};

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoListComponentComponent,
    LoginComponentComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ApolloClientModule,
    HttpClientModule,
    JwtModule.forRoot(JWT_Module_Options),
    StoreModule.forRoot({ todos: fetchtodo })
  ],
  providers: [Apollo,
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
