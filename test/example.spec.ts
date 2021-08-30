import test from 'japa'
import { JSDOM } from 'jsdom'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Welcome', () => {
  test('ensure home page works', async (assert) => {
    /**
     * Make request
     */
    const  text  = await supertest(BASE_URL).get('/').expect(200)
    console.log(text)
    assert.equal(text.text, '{"hello":"world"}')
})
})
