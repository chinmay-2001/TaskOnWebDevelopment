import { createReducer, on } from "@ngrx/store";
import { initialState } from '../state/state'
import { getTodo, addTodo, delTodo, updateTodo } from "../actions/action";

// import { any } from "../models/any";


export const fetchtodo = createReducer(initialState,
    on(getTodo, (state: any[], { listTodo }) => { return ([...state, ...listTodo]) }),
    on(addTodo, (state: any[], { addTodos }) => { console.log("from add any:", addTodos); return (state = [...state, addTodos]) }),
    on(delTodo, (state: any[], { id }) => { return state = state.filter((todos: any) => todos.id != id) }
    ),

    on(updateTodo, (state: any[], { upTodo, id }) => {
        console.log("inside updatetodo", upTodo)
        return state.map((todo) => (todo.id == id ? upTodo : todo))
    })
)



