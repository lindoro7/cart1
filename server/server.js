
const fs = require('fs')
const express = require('express')
const app = express()
const port = 3000
const cart = require('./cart')


app.use(express.json())
app.use('/', express.static("public"))

app.get('/catalog', (req, res) => {
    fs.readFile('./server/db/catalogData.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0 }))
        } else {
            res.send(data)
        }
    })
})

app.get('/cart', (req, res) => {
    fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0 }))
        } else {
            res.send(data)
        }
    })
})

app.post('/cart', (req, res) => {
    fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.send('{ "result": 0 }')
        } else {
            let newCart = cart.add(req, JSON.parse(data))

            fs.writeFile('./server/db/userCart.json', JSON.stringify(newCart), (err, data) => {
                if (err) {
                    res.send('{"result": 0}')
                } else {
                    res.send('{"result": 1}')
                }
            })
        }
    })
}) 

app.put('/cart/:id', (req, res) => {
    fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.send('{ "result": 0 }')
        } else {
            let newCart = cart.change(req, JSON.parse(data))

            fs.writeFile('./server/db/userCart.json', JSON.stringify(newCart), (err, data) => {
                if (err) {
                    res.send('{"result": 0}')
                } else {
                    res.send('{"result": 1}')
                }
            })
        } 
    })  
}) 

app.delete('/cart/:id', (req, res) => {
    fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.send('{ "result": 0 }')
        } else {
            let newCart = cart.delete(req, JSON.parse(data))

            fs.writeFile('./server/db/userCart.json', JSON.stringify(newCart), (err, data) => {
                if (err) {
                    res.send('{"result": 0}')
                } else {
                    res.send('{"result": 1}')
                }
            })
        }
    })
}) 



app.listen(port, function () {
    console.log(`Example app listening on port ${port}`)
});



