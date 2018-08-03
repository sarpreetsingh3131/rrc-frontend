import React from 'react'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Login } from './components/admin/login'
import { Dashboard } from './components/admin/dashboard'
import { Header } from './components/user/header'
import { List } from './components/user/list'
import { Product } from './components/user/product'
import { ADMIN_URL, CATEGORIES_URL, HOME_URL, PRODUCTS_URL } from './api'

export default class App extends React.Component {
  render () {
    return (
      <div>
        {window.location.pathname.includes('admin') ? null : <Header />}
        <Router>
          <Switch>
            <Route exact path={HOME_URL} component={List} />
            <Route exact path={CATEGORIES_URL + '/:category'} component={List} />
            <Route exact path={PRODUCTS_URL + '/:id'} component={Product} />
            <Route exact path={ADMIN_URL} component={Login} />
            <Route exact path={ADMIN_URL + '/:model'} render={(props) => (
              window.sessionStorage.getItem('rrcToken')
              ? (<Dashboard model={props.match.params.model.toLowerCase()} />)
              : (<Redirect to={ADMIN_URL} />)
            )} />
          </Switch>
        </Router>
      </div>
    )
  }
}
