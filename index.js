const express = require('express')
const app = express()
const bodyParser = require('body-parser')

var port = 3030

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var DB = {
  games: [
    {
      id: 1,
      title: 'Mario World!',
      year: 2020,
      price: 60
    },
    {
      id: 2,
      title: 'Spyro',
      year: 2008,
      price: 50
    },
    {
      id: 3,
      title: 'Tekken 3',
      year: 2018,
      price: 55
    }
  ]
}

// Criando Endpoints (rotas)

app.get('/games', (req, res) => {
  res.statusCode = 200
  res.json(DB.games)
})

app.get('/games/:id', (req, res) => {
  var id = req.params.id
  if (isNaN(id)) {
    res.sendStatus(400)
    res.send('Não é um número')
  } else {
    var game = DB.games.find(g => g.id == id)
    if (game != undefined) {
      res.statusCode = 200
      res.json(game)
    } else {
      res.sendStatus(404)
    }
  }
})

//Métodos feitos sem assistir a aula
app.post('/games', (req, res) => {
  var tamanho = DB.games.length
  if (req.body.title) {
    if (req.body.price) {
      if (req.body.year) {
        var { title, price, year } = req.body
        DB.games.push({
          id: tamanho + 1,
          title,
          price,
          year
        })
        res.statusCode = 200
        res.send(DB.games)
      } else {
        res.statuscode = 404
        res.send('Are there no year')
      }
    } else {
      res.statuscode = 404
      res.send('Are there no price')
    }
  } else {
    res.statuscode = 404
    res.send('Are there no title')
  }
})

app.delete('/games/:id', (req, res) => {
  var id = req.params.id
  //retorna o indice de um elemento
  var index = DB.games.findIndex(elemento => elemento.id == id)
  if (index == -1) {
    res.sendStatus(404)
  } else {
    DB.games.splice(index, 1)
    res.statusCode = 200
    res.send(DB.games)
  }
})

app.put('/games/:id', (req, res) => {
  var id = req.params.id
  var index = DB.games.findIndex(elemento => elemento.id == id)
  if (index == -1) {
    res.sendStatus(404)
  } else {
  }
  var { title, year, price } = req.body
  if (title) {
    DB.games[index].title = title
  }
  if (year) {
    DB.games[index].year = year
  }

  if (price) {
    DB.games[index].price = price
  }
  res.statusCode(200)
  res.send(DB.games)
})

app.listen(port, () => {
  console.log('api Rodando')
})
