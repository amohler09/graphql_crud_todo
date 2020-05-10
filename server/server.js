const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const cors = require('cors')

let todos = [
    {
        id: 0,
        task: 'Learn GraphQL',
        completed: false
    },
];

const typeDefs = gql`
    type Todo {
        id: ID!
        task: String!
        completed: Boolean
    }

    type Query {
        todos: [Todo]!
    }

    type Mutation {
        createTodo(task: String!): String
        removeTodo(id: ID!): String
        updateTodo(task: String!): String
    }
`

const resolvers = {
    Query: {
        todos: () => todos
    },

    Mutation: {
        createTodo: (_, args) => {
            return todos.push({
                task: args.task,
                completed: false
            })
        },
        removeTodo: (_, args) => {
            todos.filter((item, i) => item[i].id !== args.id)
        },
        updateTodo: (_, args) => {
            todos.map((item, i) => item[i].id === args.id ? args : item)
        }
    }
}



