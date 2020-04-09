let cart = {
    change(req, cart) {
        let id = +req.params.id
        let find = this._findItem (cart, id)
        find.quantity += +req.body.q

        return cart
    },
    
    add(req, cart) { 
        let item = req.body
        cart.contents.push(Object.assign({}, item, { quantity: 1 }))

        return cart
    },
    delete(req, cart) {
        let id = +req.params.id
        let find = this._findItem (cart, id)
        cart.contents.splice (cart.contents.indexOf (find), 1)

        return cart
    },
    _findItem(cart, id) { 
        return cart.contents.find(elem => elem.id_product === id)
    }
}

module.exports = cart     