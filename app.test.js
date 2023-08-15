import app from "./app.js"
import request from 'supertest'

const validNames = ['Food', 'Gaming', 'Coding', 'Other']

describe("App Test", () => {
  test('GET /', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
    expect(res.header['content-type']).toMatch('json')
    expect(res.body.info).toBeDefined()
    expect(res.body.info).toBe('Journal API')
  })

  describe('POST /entries', () => {
    let res
  
    beforeAll(async () => {
      res = await request(app).post('/entries').send({ category: 'Food', content: 'Ice cream rules!' })
    })
    test('Returns a JSON body with _id', () => {
      expect(res.status).toBe(201)
      expect(res.header['content-type']).toMatch('json')
      expect(res.body.category).toHaveProperty('_id')
    })
    test('catgeory has "_id" and "name"', async () => {
      expect(res.body).toHaveProperty('category')
      expect(res.body.category).toHaveProperty('_id')
      expect(res.body.category).toHaveProperty('name', 'Food')
    })
    test('content has ', async () => {
      expect(res.body).toHaveProperty('content')
      expect(res.body).toHaveProperty('content', 'Ice cream rules!')
    })
  })

  

  describe('GET /categroies', () => {
    let res

    beforeAll(async () => {
      res = await request(app).get('/categories')
    })

    test('returns JSON', async () => {
        expect(res.status).toBe(200)
        expect(res.header['content-type']).toMatch('json')
    })

    test('returns an array of 4 elements', async () => {
    expect(res.body).toBeInstanceOf(Array)
    expect(res.body).toHaveLength(4)
    })

    test('First category has a key "name" with value "Food"', async () => {
      expect(res.body[0]).toBeDefined()
      expect(res.body[0]).toHaveProperty('name', 'Food')
    })

    test('Each category has a "name" and "_id"', async () => {
      res.body.forEach(el => {
        expect(el.name).toBeDefined()
        expect(el._id).toBeDefined()
        expect(validNames).toContain(el.name)
      })
    })
  })
})