import express, {Application, Request, Response} from "express"
import bodyParser from "body-parser"
import path from "path"

import userRoutes from "./handlers/user"
import productRoutes from "./handlers/product"
import orderRoutes from "./handlers/orders"

const app: Application = express()

let port: number = 3000

if (process.env.ENV === "test") {
  port = 3001
}

const address: string = `127.0.0.1:${port}`

app.use(bodyParser.json())

userRoutes(app)
productRoutes(app)
orderRoutes(app)

app.listen(port, () => {
  console.info(`app started on: ${address}`)
})

export default app