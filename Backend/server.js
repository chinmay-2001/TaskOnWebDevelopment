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
        _id:ID! 
        id:Int!
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
        delTodo(IdInput:Int):Todo!
        updateTodo(todoupdate:UpdateTodoInput!):Todo!
    }
    input UpdateTodoInput{
        id:Int!
        name:String!
        priority:String!
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
            count=await Todo.find().count()+1
            const todo= await Todo.create({...todoInput,id:count+1})
            console.log("Todo:",todo)
            return todo
        },
        delTodo:async(_,{IdInput})=>{
            console.log("inside detTodo with Id:",IdInput)
            console.log("type of Todo:",typeof IdInput)
            const todos=await Todo.findOneAndDelete({ id: IdInput });
            console.log(todos)
            return todos    
        },
        updateTodo:async(_,{todoupdate})=>{
            console.log("Upate Input:",todoupdate)
            const query={id:todoupdate.id}
            const update={name:todoupdate.name,priority:todoupdate.priority}
            const updatedTodos=await Todo.findOneAndUpdate(query,{$set:update})
            console.log(updatedTodos)
            return updatedTodos
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