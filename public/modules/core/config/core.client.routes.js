import angular from 'angular'

// Setting up routes
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  /* @ngInject */
  function($stateProvider, $urlRouterProvider) {
    // Root state routing
    $stateProvider.
    state('root', {
      url: '/',
      views: {
        'header': {
          component: 'header'
        },
        'sidebar': {
          component: 'sidebar'
        },
        'content': {
          component: 'home'
        },
        'footer': {
          component: 'footer'
        }
      }
    }).

    // 403 Unauthorized
    state('root.403', {
      url: '403',
      views: {
        'content@': {
          component: 'unauthorized'
        }
      }
    }).
    // 404 Page not found
    state('root.404', {
      url: '404',
      views: {
        'content@': {
          component: 'notFound'
        }
      }
    }).
    // 500 Server error
    state('root.500', {
      url: '500',
      views: {
        'content@': {
          component: 'serverError'
        }
      }
    })

    // Redirect route from / to /signin
    $urlRouterProvider.when('', 'signin')

    // Redirect to 404 page view when route not found
    $urlRouterProvider.otherwise('404')
  }
])
