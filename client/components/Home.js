import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LoginForm from '../pages/login/LoginForm'

const Home = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/login" component={() => <LoginForm />} />
      </Switch>
    </div>
  )
}

export default Home
