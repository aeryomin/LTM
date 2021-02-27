/* eslint-disable no-console */
import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'
import compression from 'compression'

import cookieParser from 'cookie-parser'
import passport from 'passport'
import mongooseService from './services/mongoose'
import passportJWT from './services/passport'
import config from './config'
import Html from '../client/html'
import Task from './model/Task.model'
import Group from './model/Group.model'
import authRoutes from './routes/api/auth.routes'
import taskRoutes from './routes/api/task.routes'
import groupRoutes from './routes/api/group.routes'
import userRoutes from './routes/api/user.routes'

mongooseService.connect()

const Root = () => ''

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  compression(),
  cors(),
  passport.initialize(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

passport.use('jwt', passportJWT.jwt)

middleware.forEach((it) => server.use(it))

server.use('/api/v1/auth', authRoutes)
server.use('/api/v2/task', taskRoutes)
server.use('/api/v2/group', groupRoutes)
server.use('/api/v2/user', userRoutes)

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'LTM'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  console.log('ws pre')
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    console.log('connection ws')

    conn.on('data', async (data) => {
      switch (data) {
        case 'DB is updated': {
          const tasklist = await Task.find({ isDeleted: false })
          connections.forEach((c) => {
            c.write(JSON.stringify({ type: 'GET_TASKLIST', tasklist }))
          })
          break
        }
        case 'group is changed': {
          const groupList = await Group.find({ isDeleted: false })
          connections.forEach((c) => {
            c.write(JSON.stringify({ type: 'GET_GROUP_LIST', groupList }))
          })
          break
        }
        default:
          break
      }
    })

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
