const sequelize = require('sequelize')
const mysql = require('mysql2')
const connection = new sequelize('API', 'root', '123456', {
  local: 'localhost',
  dialect: 'mysql'
})

module.exports = connection
