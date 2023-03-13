import { createAction, props } from "@ngrx/store";
// import { any } from "../models/any";

export const getTodo = createAction('myTodo', props<{ listTodo: any[] }>())
export const addTodo = createAction("AddTodo", props<{ addTodos: any }>())
export const delTodo = createAction("delTodo", props<{ id: number }>())
export const updateTodo = createAction("updateTodo", props<{ upTodo: any, id: number }>())
