const { Sequelize } = require('sequelize')
const connection = require('./connection')

const model = connection.define('games', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.STRING,
    allowNull: false
  },
  year: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

model.sync({ force: true })

module.exports = model
