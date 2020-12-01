/* eslint-disable no-console */
import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'

import cookieParser from 'cookie-parser'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import mongooseService from './services/mongoose'
import passportJWT from './services/passport'
import config from './config'
import Html from '../client/html'
import User from './model/User.model'
import Task from './model/Task.model'
import Group from './model/Group.model'
import taskRoutes from './routes/api/task.routes'
import groupRoutes from './routes/api/group.routes'
import userRoutes from './routes/api/user.routes'

mongooseService.connect()

const Root = () => ''

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  passport.initialize(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

passport.use('jwt', passportJWT.jwt)

middleware.forEach((it) => server.use(it))

server.use('/api/v2/task', taskRoutes)
server.use('/api/v2/group', groupRoutes)
server.use('/api/v2/user', userRoutes)

server.post('/api/v1/registration', async (req, res) => {
  const user = await User.findOne({ username: req.body.username })

  if (user === null) {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      fullname: req.body.username
    })
    newUser.save()
    delete newUser.password
    res.json({ status: 'user is added', newUser })
  } else {
    res.json({ status: 'user is exist, not added' })
  }
})

server.post('/api/v1/auth', async (req, res) => {
  try {
    const user = await User.findAndValidateUser(req.body)
    const payload = { uid: user.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    delete user.password
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', token, user })
  } catch (err) {
    res.json({ status: 'error', err })
  }
})

server.get('/api/v1/auth', async (req, res) => {
  try {
    const jwtUser = jwt.verify(req.cookies.token, config.secret)
    const user = await User.findById(jwtUser.uid)
    const payload = { uid: user.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    delete user.password
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', token, user })
  } catch (err) {
    res.json({ status: 'error', err })
  }
})

server.get('/api/v1/user/:id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
    res.json({ status: 'ok', user })
  } catch (err) {
    res.json({ status: 'updata error', err })
  }
})

server.patch('/api/v1/user/:id', async (req, res) => {
  try {
    const user = await User.updateOne(
      { _id: req.params.id },
      { $set: { [req.body.field]: req.body.data } }
    )
    res.json({ status: 'ok', user })
  } catch (err) {
    res.json({ status: 'updata error', err })
  }
})

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
