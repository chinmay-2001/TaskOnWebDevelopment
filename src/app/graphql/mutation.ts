
import gql from 'graphql-tag';

export const create_Todo = gql`
    mutation createTodo($todoInput: todoInputData!){
        createTodo(todoInput: $todoInput) {
            id
            name
            priority
        }
    }
`
export const del_todo = gql`
    mutation delTodo($IdInput:Int){
        delTodo(IdInput:$IdInput){
            id
            name
            priority
        }
    }
`

export const update_todo = gql`
    mutation updateTodo($todoupdate:UpdateTodoInput!){
        updateTodo(todoupdate:$todoupdate){
            id
            name
            priority
        }
    }
`