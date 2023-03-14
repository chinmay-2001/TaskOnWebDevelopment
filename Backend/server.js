const { ApolloServer,gql } = require('apollo-server-express');
const express= require('express')
const mongoose=require('mongoose')
const {url}=require('../Backend/Config/config')
const app=express()

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
            return todoList
        }
    },
    Mutation:{
        createTodo: async(_, {todoInput})=>{
            count=await Todo.find().count()+1
            const todo= await Todo.create({...todoInput,id:count+1})
            return todo
        },
        delTodo:async(_,{IdInput})=>{
            const todos=await Todo.findOneAndDelete({ id: IdInput });
            return todos    
        },
        updateTodo:async(_,{todoupdate})=>{
            const query={id:todoupdate.id}
            const update={name:todoupdate.name,priority:todoupdate.priority}
            console.log("To update with :",update)
            const updatedTodos=await Todo.findOneAndUpdate(query,{$set:update})
            console.log(updatedTodos)
            update.id=updatedTodos.id
            return update
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