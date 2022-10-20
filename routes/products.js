import {Router} from 'express'
import Product from '../models/products.js'
import DataManager from '../data/dataManager.js'

const productsRouter = Router()
const controller = new DataManager('products')

productsRouter.get('/', (req, res) => {
    res.json(controller.getAll())
})

productsRouter.get('/:id', (req, res) => {
    console.log(req.params.id)
    res.json(controller.getById(req.params.id))
})

productsRouter.post('/', (req, res) => {
    let {name, description, code, image, price, stock} = req.body
    let product = new Product(name, description, code, image, price, stock)
    res.json(controller.add(product))
})

productsRouter.put('/:id', (req, res) => {
    let {id} = req.params
    let product = {...req.body, id: parseInt(id)}
    res.json(controller.update(product))
})

productsRouter.delete('/:id', (req, res) => {
    let {id} = req.params
    res.json(controller.deleteById(id))
})

export default productsRouter