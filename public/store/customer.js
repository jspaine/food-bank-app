import {denormalize} from 'normalizr'

import {customer as customerSchema, arrayOfCustomers} from './schemas'
import {CALL_API} from '../middleware/api'
import {crudActions, crudReducer} from './utils'

export const actions = crudActions('customer')

export const loadCustomers = () => ({
  [CALL_API]: {
    endpoint: 'admin/customers',
    schema: arrayOfCustomers,
    types: [actions.LOAD_ALL_REQUEST, actions.LOAD_ALL_SUCCESS, actions.LOAD_ALL_FAILURE]
  }
})

export const loadCustomer = (id, admin) => ({
  [CALL_API]: {
    endpoint: admin ? `admin/customers/${id}` : `customer/${id}`,
    schema: customerSchema,
    types: [actions.LOAD_ONE_REQUEST, actions.LOAD_ONE_SUCCESS, actions.LOAD_ONE_FAILURE]
  }
})

export const saveCustomer = (customer, admin) => {
  let endpoint
  if (admin) endpoint = customer.id ? `admin/customers/${customer.id}` : `admin/customers`
  else endpoint = customer.id ? `customer/${customer.id}` : `customer`
  return {
    [CALL_API]: {
      endpoint,
      method: customer.id ? 'PUT' : 'POST',
      body: customer,
      schema: customerSchema,
      types: [actions.SAVE_REQUEST, actions.SAVE_SUCCESS, actions.SAVE_FAILURE]
    }
  }
}

export const deleteCustomer = id => ({
  [CALL_API]: {
    endpoint: `admin/customers/${id}`,
    method: 'DELETE',
    schema: customerSchema,
    types: [actions.DELETE_REQUEST, actions.DELETE_SUCCESS, actions.DELETE_FAILURE]
  }
})

export default crudReducer('customer')

export const selectors = {
  getAll(customers, entities) {
    return denormalize({customers}, {customers: arrayOfCustomers}, entities).customers
  },
  getOne(id, entities) {
    return denormalize({customers: id}, {customers: customerSchema}, entities).customers
  },
  loading(customers) {
    return customers.fetching
  },
  loadError(customers) {
    return customers.fetchError
  },
  saving(customers) {
    return customers.saving
  },
  saveError(customers) {
    return customers.saveError
  }
}
