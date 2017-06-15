import {merge} from 'lodash'

const env = process.env.NODE_ENV || 'development'

export default merge(
  require('./env/all').default,
  require(`./env/${env}`).default,
  require('./env/secrets').default
)
