
const fs = require('fs')
const express = require('express')
const app = express()

// app.get('/', function (req, res) {
//   res.send('Hello World!')
// });

app.use(express.json())
app.use("/", express.static("public"))

app.get("/catalog", (req, res) => {
  fs.readFile('server/db/catalogData.json', 'utf-8', (err, data) => {
    if(err) {
      res.sendStatus(404, JSON.stringify({result: 0}))
    } else {
      res.send(data)
    }
  })
})

app.get("/cart", (req, res) => {
  fs.readFile('server/db/getBasket.json', 'utf-8', (err, data) => {
    if(err) {
      res.sendStatus(404, JSON.stringify({result: 0}))
    } else {
      res.send(data)
    }
  })
})

app.get("/addToBasket", (req, res) => {
  fs.readFile('server/db/addToBasket.json', 'utf-8', (err, data) => {
    if(err) {
      res.sendStatus(404, JSON.stringify({result: 0}))
    } else {
      res.send(data)
    }
  })
})

app.get("/deleteFromBasket", (req, res) => {
  fs.readFile('server/db/deleteFromBasket.json', 'utf-8', (err, data) => {
    if(err) {
      res.sendStatus(404, JSON.stringify({result: 0}))
    } else {
      res.send(data)
    }
  })
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});


