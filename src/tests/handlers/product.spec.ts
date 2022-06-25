import supertest from "supertest"
import jwt, {Secret} from "jsonwebtoken"

import app from "../../server"
import {BaseProduct} from "../../models/product"
import {BaseAuthUser} from "../../models/user"

const request = supertest(app)
const SECRET = process.env.TOKEN_SECRET as Secret

describe("Product Handler", () => {
  const product: BaseProduct = {
    name: "Python",
    price: 99
  }

  let token: string, userId: number, productId: number

  beforeAll(async () => {
    const userData: BaseAuthUser = {
        username: "heshamsayed",
        firstname: "hesham",
        lastname: "sayed",
        password: "password123"
    }

    const {body} = await request.post("/users/create").send(userData)

    token = body

    // @ts-ignore
    const {user} = jwt.verify(token, SECRET)
    userId = user.id
  })

  afterAll(async () => {
    await request.delete(`/users/${userId}`).set("Authorization", "bearer " + token)
  })

  it("create endpoint", (done) => {
    request
    .post("/products/create")
    .send(product)
    .set("Authorization", "bearer " + token)
    .then((res) => {
      const {body, status} = res

      expect(status).toBe(200)

      productId = body.id

      done()
    })
  })

  it("index endpoint", (done) => {
    request
    .get("/products")
    .then((res) => {
      expect(res.status).toBe(200)
      done()
    })
  })

  it("read endpoint", (done) => {
    request
    .get(`/products/${productId}`)
    .then((res) => {
      expect(res.status).toBe(200)
      done()
    })
  })

  it("update endpoint", (done) => {
    const newProductData: BaseProduct = {
      ...product,
      name: "CodeMerge 156 A",
      price: 1299
    }

    request
    .put(`/products/${productId}`)
    .send(newProductData)
    .set("Authorization", "bearer " + token)
    .then((res) => {
      expect(res.status).toBe(200)
      done()
    })
  })

  it("delete endpoint", (done) => {
    request.delete(`/products/${productId}`).set("Authorization", "bearer " + token)
    .then((res) => {
      expect(res.status).toBe(200)
      done()
    })
  })
})