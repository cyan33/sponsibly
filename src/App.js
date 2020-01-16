// @flow
// @Expected-Error useState and useEffect haven't been typed yet
import React, { useState, useEffect, lazy, Suspense } from 'react'
import { css } from 'glamor'
import {
  HashRouter as Router,
  Redirect,
  Route
} from 'react-router-dom'

import { ROUTES } from './constants'
import { Log } from './types'
import DataStore from './DataStore'
import LoadingSpinner from './components/LoadingSpinner'
import Header from './components/Header'
import Footer from './components/Footer'
// import {
//   LoginRoute, RecipesRoute, LoggingEditRoute, DashboardRoute
// } from './routes'
const LoginRoute = lazy(() => import('./routes/LoginRoute'))
const SettingsRoute = lazy(() => import('./routes/SettingsRoute'))
const LoggingEditRoute = lazy(() => import('./routes/LoggingEditRoute'))
const DashboardRoute = lazy(() => import('./routes/DashboardRoute'))

// import LoggingList from './components/LoggingList'
const LoggingList = lazy(() => import('./components/LoggingList'))

type AuthStatus = boolean | null
type Logs = Array<Log> | null

const dataStore = new DataStore();

export default function App() {
  const [logs, setLogs] = useState(null)
  const [authStatus, setAuthStatus] = useState(null)

  useEffect(() => {
    dataStore.checkAuth().then((dataStore) => {
      dataStore.loggingStore.registerObserver((logs: Array<Log>) =>
        setLogs({ logs })
      )
      setAuthStatus(true)
    }).catch((e) => {
      setAuthStatus(false)
    })
    // pass an empty array here as a second parameter
    // to indicate that this effect should be run only once
    // which is simiiar to componentDidMount
  }, [dataStore])

  const _signOut = (): void => {
    dataStore.signOut().then(() => {
      setAuthStatus(false)
    })
  }

  if (authStatus === null) {
    return <LoadingSpinner />
  } else if (authStatus === false) {
    return <LoginRoute login={dataStore.login} />
  }

  return (
    <Router>
      <div>
        <Header {...dataStore.user} signOut={_signOut} />
        <Suspense fallback={<LoadingSpinner />}>
          <div {...css({
            position: 'fixed',
            bottom: '3.5rem',
            top: '3.5rem',
            width: '100%',
            overflow: 'scroll'
          })}>
            <Route
              exact
              path={'/'}
              render={() => {
                // default go to logging list
                return <Redirect to={ROUTES.logging.list} />
              }}
            />
            {/* dashboard */}
            <Route 
              path={ROUTES.dashboard} 
              exact
              render={() => {
                return <DashboardRoute />
              }}
            />
            {/* logging */}
            <Route 
              path={ROUTES.logging.new} 
              exact
              render={({ history }) => {
                return (
                  <LoggingEditRoute
                    history={history}
                    saveFn={dataStore.loggingStore.saveRecord}
                  />
                )
              }}
            />
            <Route
              path={ROUTES.logging.list}
              exact
              render={() => {
                return <LoggingList logs={logs ? logs.logs : null} deleteFn={dataStore.loggingStore.deleteRecord} />
              }}
            />
            <Route
              path={ROUTES.logging.edit}
              exact
              render={({ history, match }) => {
                return  <LoggingEditRoute
                          history={history}
                          saveFn={dataStore.loggingStore.saveRecord}
                          deleteFn={dataStore.loggingStore.deleteRecord}
                          getRecord={dataStore.loggingStore.getRecord}
                          id={match.params.id}
                        />
              }}
            />
            {/* recipes */}
            <Route
              exact
              path={ROUTES.recipes.list}
              render={() => {
                return <SettingsRoute />
              }}
            />
          </div>
        </Suspense>
        <Footer />
      </div>
    </Router>
  )
}
