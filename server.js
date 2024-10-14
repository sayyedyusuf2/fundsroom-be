const dotenv = require('dotenv')
dotenv.config({path: `./.env.${process.env.NODE_ENV}`})
const logger = require('./utils/logger')
const app = require('./app')
const sequelize = require('./utils/dbConnection')

const handleDBConnection = async () => {
  try {
    await sequelize.sync()
    console.log('DB connected successfully')
  } catch (e) {
    console.log(e)
  }
}
handleDBConnection()

process.on('uncaughtException', (e) => {
  logger.error('Uncaught Exception! Shutting down %s:', JSON.stringify(e))
  process.exit(1)
})

/* Applicatin Port */
const port = process.env.PORT || 3000
const server = app.listen(port, () => console.log(`Server is running on ${port}`))

process.on('unhandledRejection', (e) => {
  logger.error('Unhandled Rejection! Shutting down %s:', JSON.stringify(e))
  server.close(() => {
    process.exit(1)
  })
})