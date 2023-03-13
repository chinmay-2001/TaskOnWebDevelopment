import { createFeatureSelector, createSelector } from "@ngrx/store"
import { todo } from "../models/Todo"
// import { AppState } from "../state/state";

export const selectTodoState = createFeatureSelector<any[]>('todos');

export const selectTodos = createSelector(selectTodoState, (todo: any[]) => { return todo })
