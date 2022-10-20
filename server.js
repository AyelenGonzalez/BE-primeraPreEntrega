import Express from 'express'
import cartRouter from './routes/cart.js'
import productsRouter from './routes/products.js'

const app = Express()
const PORT = process.env.PORT || 8080

app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))

app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)

app.listen(PORT, (err) => err ? console.log(`Error on server connection. ${err}`) : console.log(`Server listen on Port ${PORT}`))