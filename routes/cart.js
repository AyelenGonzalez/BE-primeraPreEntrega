import {Router} from 'express'
import Cart from '../models/cart.js'
import DataManager from '../data/dataManager.js'
import admin from '../utils/admin.js'

const cartRouter = Router()
const controller = new DataManager('cart')
const productsController = new DataManager('products')

cartRouter.post('/', (req, res) => {
    let cart = new Cart()
    res.json(controller.add(cart))
})

cartRouter.delete('/:id', (req, res) => {
    let {id} = req.params
    res.json(controller.deleteById(id))
})

cartRouter.get('/:id/products', (req, res) => {
    const admin = true
    let {id} = req.params
    let cart = controller.getById(id)[0]
    if(admin){
        (cart.products.length < 1) ? res.json({response:'No products'}) : res.json({id: cart.id, products: cart.products})
    } else{
        res.json({response: 'Authorization denied'})
    }
})

cartRouter.post('/:id/products', (req, res) => {
    let {id} = req.params
    let cart = controller.getById(id)[0]
    let id_prod = req.body.id_prod
    let product = productsController.getById(id_prod)[0]
    cart.products.push(product)
    let response = controller.update(cart)
    res.json({response: 'Products added to cart', cart: response})
})

cartRouter.delete('/:id/products/:id_prod', (req, res) => {
    let {id, id_prod} = req.params
    let cart = controller.getById(id)[0]
    cart.products = cart.products.filter(prod => prod.id != id_prod)
    let response = controller.update(cart)
    res.json({response: 'Product deleted', cart: response})
})

export default cartRouter