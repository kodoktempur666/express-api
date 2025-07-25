import express, { json, urlencoded } from 'express'
import productsRouter from './routes/products/index.js'
import authRouter from './routes/auth/index.js'
import ordersRouter from './routes/orders/index.js'

const app = express()

const port = 3000

app.use(urlencoded({ extended: false }))
app.use(json())
app.get('/', (req, res) => {
    res.send('Hello, Worlddsdsdsd!')
})


app.use('/products', productsRouter)
app.use('/auth', authRouter)
app.use('/orders', ordersRouter)


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})