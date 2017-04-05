// Setting up route
angular.module('customer').config(['$stateProvider', 'AuthenticationProvider',
  /* ngInject */
  function($stateProvider, AuthenticationProvider){
    // Customer state routing for admin
    $stateProvider.
    state('root.listCustomers', {
      url: 'admin/customers',
      resolve: {

        CurrentUser: AuthenticationProvider.requireAdminUser
      },
      views: {
        'content@': {
          component: 'customerList'
        }
      }
    }).
    state('root.viewCustomerAdmin', {
      url: 'admin/customers/:customerId',
      views: {
        'content@': {
          component: 'customerView'
        }
      },
      resolve: {
        CurrentUser: AuthenticationProvider.requireAdminUser
      }
    }).
    state('root.editCustomerAdmin', {
      url: 'admin/customers/:customerId/edit',
      views: {
        'content@': {
          component: 'customerEdit'
        }
      },
      resolve: {
        CurrentUser: AuthenticationProvider.requireAdminUser
      }
    })
  }
])
