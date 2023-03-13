import { createReducer, on } from "@ngrx/store";
import { initialState } from '../state/state'
import { getTodo, addTodo, delTodo, updateTodo } from "../actions/action";

import { todo } from "../models/Todo";


export const fetchtodo = createReducer(initialState,
    on(getTodo, (state: todo[], { listTodo }) => { return ([...state, ...listTodo]) }),
    on(addTodo, (state: todo[], { addTodos }) => { console.log("from add todo:", addTodos); return (state = [...state, addTodos]) }),
    on(delTodo, (state: todo[], { todoName }) => { return state = state.filter((todos: todo) => { console.log("Todos.Name:", todos.name, " todoName:", todoName, " State:", state); todos.name != todoName }) }
    ),

    on(updateTodo, (state: todo[], { upTodo, oldtodo }) => {
        console.log("inside updatetodo")
        const index = state.findIndex(todo => todo.name === oldtodo.name)
        console.log("index:", index)
        const updateitems = [
            ...state.slice(0, index),
            upTodo,
            ...state.slice(index + 1)
        ]
        console.log("updateitems:", updateitems)
        return [...state, ...updateitems]

    })

)



