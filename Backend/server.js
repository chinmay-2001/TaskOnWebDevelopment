const { ApolloServer,gql } = require('apollo-server-express');
const express= require('express')
const mongoose=require('mongoose')
const {url}=require('../Backend/Config/config')
const app=express()

// let todos = [  
//     {  
//         name: 'wake up at 5',  
//         priority: 'low',  
//     },  
//     {  
//         name: 'morning walk at 6',  
//         priority: 'low',  
//     },  
//     {  
//         _id:"3",
//         name: 'Reliance Industries',  
//         priority: 'Dhirubhai Ambani',  
//     },  
//     {   
//         _id:"4",
//         name: 'Bajaj Auto',  
//         priority: 'Jamnalal Bajaj',  
//     },  
// ];  


const typeDefs = gql`  
    type Todo {  
        name: String!  
        priority: String!  
    }  
    type Query {  
        todos: [Todo!]! 
    }   
    type RootQuery{
        todos:Query!
    }
    input todoInputData{
        name:String!
        priority:String!
    }
    type Mutation{
        createTodo(todoInput:todoInputData!):Todo!
        delTodo(IdInput:String):[Todo!]!
    }
    type Schema{
        query:RootQuery
        mutation:Mutation
    }   
`;  

const Todo=require('./models/model')
const resolvers={
    Query:{
        todos:async()=>{
            const todoList=await Todo.find()
            console.log(todoList)
            return todoList
        }
    },
    Mutation:{
        createTodo: async(_, {todoInput})=>{
            console.log("inside create todo of server")
           const todo= await Todo.create(todoInput)
            
            return todo
        },
        delTodo:(_,{IdInput})=>{
            console.log("inside detTodo with Id:",IdInput)
            console.log("type of Todo:",typeof IdInput)
            todos=todos.filter((todo)=>`${todo._id}`!==IdInput)
            console.log(todos)
            return todos    
        }
    }
}



mongoose.Promise=global.Promise;
mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("connected successfully to the server")
})
.catch((err)=>{
    console.log("could not connect to database ...Existing Now...",err)
})
const server = new ApolloServer({ typeDefs, resolvers }); 

async function startServer(){
    await server.start()
    server.applyMiddleware({app})

    

app.listen(4000,()=>{   
        console.log(`server start at http://localhost:4000${server.graphqlPath}`)
    })
}
startServer()