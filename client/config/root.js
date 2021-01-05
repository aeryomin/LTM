/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { Provider, useSelector } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route, Redirect, StaticRouter } from 'react-router-dom'

import store, { history } from '../redux'

import Home from '../components/Home'
import LoginForm from '../pages/login/LoginForm'
import RegForm from '../pages/registration/RegForm'
// import MainPage from '../pages/main/MainPage'
// import Groups from '../pages/groups/Groups'
// import Profile from '../pages/profile/Profile'
import Offline from '../components/Offline'
import NotFound from '../components/404'

import Startup from './startup'
import FirebaseInit from './firebase-init'

const MainPage = React.lazy(() => import('../pages/main/MainPage'))
const MainPageSuspensed = () => (
  <Suspense fallback="Loading...">
    <MainPage />
  </Suspense>
)

const Groups = React.lazy(() => import('../pages/groups/Groups'))
const GroupsSuspensed = () => (
  <Suspense fallback="Loading...">
    <Groups />
  </Suspense>
)

const Profile = React.lazy(() => import('../pages/profile/Profile'))
const ProfileSuspensed = () => (
  <Suspense fallback="Loading...">
    <Profile />
  </Suspense>
)

const OnlyAnonymousRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((s) => s.auth)
  const func = (props) =>
    !!auth.user && !!auth.token ? (
      <Redirect to={{ pathname: '/main-page' }} />
    ) : (
      <Component {...props} />
    )
  return <Route {...rest} render={func} />
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((s) => s.auth)
  const func = (props) =>
    !!auth.user && !!auth.token ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/login'
        }}
      />
    )
  return <Route {...rest} render={func} />
}

const types = {
  component: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  user: PropTypes.shape({
    username: PropTypes.string
    // email: PropTypes.string
  }),
  token: PropTypes.string
}

const defaults = {
  location: {
    pathname: ''
  },
  user: null,
  token: ''
}

OnlyAnonymousRoute.propTypes = types
PrivateRoute.propTypes = types

PrivateRoute.defaultProps = defaults
OnlyAnonymousRoute.defaultProps = defaults

const RouterSelector = (props) =>
  typeof window !== 'undefined' ? <ConnectedRouter {...props} /> : <StaticRouter {...props} />

const RootComponent = (props) => {
  return (
    <Provider store={store}>
      <RouterSelector history={history} location={props.location} context={props.context}>
        <Startup>
          <FirebaseInit>
            <Switch>
              <Route exact path="/" component={() => <Home />} />
              <Route exact path="/login" component={() => <LoginForm />} />
              <Route exact path="/reg" component={() => <RegForm />} />
              <Route exact path="/groups" component={() => <GroupsSuspensed />} />
              <Route exact path="/profile" component={() => <ProfileSuspensed />} />
              <Route exact path="/offline" component={() => <Offline />} />
              <PrivateRoute exact path="/main-page" component={() => <MainPageSuspensed />} />
              <OnlyAnonymousRoute exact path="/login" component={() => <LoginForm />} />
              <Route component={() => <NotFound />} />
            </Switch>
          </FirebaseInit>
        </Startup>
      </RouterSelector>
    </Provider>
  )
}

export default RootComponent
