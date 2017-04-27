import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'

import CustomerList from './components/CustomerList'
import CustomerView from './components/CustomerView'
import CustomerEdit from './components/CustomerEdit'
import CustomerCreate from './components/CustomerCreate'
import ClientCreateSuccess from '../../components/ClientCreateSuccess'

import './customer.css'

const mapStateToProps = state => ({
  user: state.auth.user
})

const Customers = ({match, user}) => {
  if (user && user.roles.find(role => role === 'admin')) {
    return <Switch>
        <Route path={`${match.url}`} exact component={CustomerList} />
        <Route path={`${match.url}/create/success`} component={ClientCreateSuccess} />
        <Route path={`${match.url}/create`} component={CustomerCreate} />
        <Route path={`${match.url}/:customerId/edit`} component={CustomerEdit} />
        <Route path={`${match.url}/:customerId`} component={CustomerView} />
      </Switch>
  } else if (user && user.roles.find(role => role === 'customer')) {
    return <Switch>
        <Route path={`${match.url}/create/success`} component={ClientCreateSuccess} />
        <Route path={`${match.url}/create`} component={CustomerCreate} />
        <Route path={`${match.url}/:customerId/edit`} component={CustomerEdit} />
        <Route path={`${match.url}/:customerId`} component={CustomerView} />
      </Switch>
  } else {
    return null
  }
}

export default connect(mapStateToProps)(Customers)
