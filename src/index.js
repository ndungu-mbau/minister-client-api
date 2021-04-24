require('babel-polyfill')
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from "cors"
import natsServer from 'nats'
import Hemera from 'nats-hemera'

import graphqlHTTP from "express-graphql"
import { makeExecutableSchema } from "graphql-tools"

import { register, login, authMiddleware } from "./auth"
import { typeDefs, root as resolvers } from './graph'

const app = express()

const { PORT = 8080, NATS_URL } = process.env

const nats = natsServer.connect({
  url: NATS_URL,
})

const hemera = new Hemera(nats, {
  logLevel: 'silent',
})

const schema = makeExecutableSchema({ typeDefs, resolvers })

hemera.ready(() => {
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json('application/json'))
  app.use(cookieParser())

  app.post('/api/client/register', async (req, res) => await register(req, res, hemera))
  app.post('/api/client/login', async (req, res) => await login(req, res, hemera))

  const context = async ({ req, res }) => {
    return {
      hemera,
      user: req.user,
      church: req.user.church,
      res
    }
  }

  app.use("/api/client", async (req, res, next) => await authMiddleware(req, res, next, hemera), async (req, res, next) => {
      return graphqlHTTP({
        schema,
        graphiql: true,
        context: await context({ req, res })
      })(req, res, next)
    }
  )

  app.listen(PORT, () => console.log(`[MINISTER]: 🚀 Client API Server ready at :${PORT}`))
})
