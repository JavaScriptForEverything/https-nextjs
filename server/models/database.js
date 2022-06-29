import { connect, connection } from 'mongoose';

const { DB_LOCAL_URL, DB_REMOTE_URL, NODE_ENV } = process.env || {}

const DATABASE = DB_REMOTE_URL && NODE_ENV === 'production' ? DB_REMOTE_URL : DB_LOCAL_URL

export default (() => {
  if( connection.readyState >= 1 ) return

  connect(DATABASE)
  .then( conn => console.log(`Database connected to: [${conn.connection.host}]`))
  .catch(err => console.log(`Database connection Error: ${err.message}`))
})()