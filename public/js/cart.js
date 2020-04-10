Vue.component('cart', {
    template: `
    <div>
        <button class="btn-cart" type="button" @click="cartShown = !cartShown">Корзина</button>
        <div class="cart-block" v-show="cartShown">
            <p>Всего товаров: {{ getSum.qua }} </p>
            <itemcart v-for="prod of items" :key="prod.id_product" :item="prod"></itemcart>
            <p>Общая ст-ть: $ {{ getSum.sum }} </p>
        </div>
    </div>
    `,
    data() {
        return {
            items: [],
            cartShown: false,
            url: '/cart',
        }
    },
    methods: {
        addProduct(pr) {
            let find = this.items.find(item => item.id_product === pr.id_product)
            if (find) {
                this.$parent.putJson('/cart/' + pr.id_product, { q: 1 })
                    .then(() => {
                        find.quantity++
                    })
            } else {
                let p = Object.assign({}, pr, { quantity: 1 })
                this.$parent.postJson('/cart', p)
                    .then(() => {
                        this.items.push(p)
                    })
            }
        },
        delProduct(pr) {
            let find = this.items.find(item => item.id_product === pr.id_product) 
            if (find.quantity > 1) {
                this.$parent.putJson('/cart/' + pr.id_product, { q: -1 }) 
                    .then(() => {
                        find.quantity--
                    })
            } else {
                this.$parent.deleteJson('/cart/' + pr.id_product)
                    .then(() => {
                        this.items.splice(this.items.indexOf(pr), 1)
                    })
            }
        }
    },
    mounted() {
        this.$parent.getJson(this.url)
            .then(data => {
                this.items = data.contents
            })
    },
    computed: {
        getSum() {
            let sum = 0
            let qua = 0
            this.items.forEach(el => {
                sum += el.price * el.quantity
                qua += el.quantity
            })
            return { sum, qua }
        }
    }
})