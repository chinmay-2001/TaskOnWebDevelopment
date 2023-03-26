import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponentComponent } from './component/login-component/login-component.component';
import { TodoListComponent } from './container/todo-list/todo-list.component';


const routes: Routes = [
  { path: 'login', component: LoginComponentComponent },
  { path: 'Todo', component: TodoListComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
