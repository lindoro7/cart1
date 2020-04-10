
const fs = require('fs')
const express = require('express')
const app = express()
const port = 3000
const cart = require('./cart')
const logger = require('./logger')


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
            let { newCart, name } = cart.add(req, JSON.parse(data))

            fs.writeFile('./server/db/userCart.json', JSON.stringify(newCart), { action: 'add', name: name }, (err, data) => {
                if (err) {
                    res.send('{"result": 0}')
                } else {
                    res.send('{"result": 1}')
                    logger(name, 'add')
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
            let { newCart, name } = cart.change(req, JSON.parse(data))

            fs.writeFile('./server/db/userCart.json', JSON.stringify(newCart), { action: 'change', name: name }, (err, data) => {
                if (err) {
                    res.send('{"result": 0}')
                } else {
                    res.send('{"result": 1}')
                    logger(name, 'change')
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
            let { newCart, name } = cart.delete(req, JSON.parse(data))

            fs.writeFile('./server/db/userCart.json', JSON.stringify(newCart), { action: 'delete', name: name }, (err, data) => {
                if (err) {
                    res.send('{"result": 0}')
                } else {
                    res.send('{"result": 1}')
                    logger(name, 'delete')
                }
            })
        }
    })
})



app.listen(port, function () {
    console.log(`Example app listening on port ${port}`)
});



