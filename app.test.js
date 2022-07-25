const supertest = require('supertest')
const app = require('./app')
const fetch = require('node-fetch');
const withQuery = require('with-query');

describe('GET /api/ping',()=>{

   test("should respond with a 200 status code",async()=>{
    const response =await fetch('http://localhost:8080/api/ping')


    expect(response.status).toBe(200)

   })
})

describe('GET /api/posts',()=>{

    test("should respond with {error:tags parameter is required} if tags is not present",async()=>{
     const response =await fetch('http://localhost:8080/api/posts')


     expect(response.status).toBe(400)

    })

    test("should respond with status 200, if tag is present",async()=>{
        var url = new URL('http://localhost:8080/api/posts'),
            params = {tags:'something'}
            Object.keys(params).forEach(key=> url.searchParams.append(key,params[key]))
        const response =await fetch(url)




        expect(response.status).toBe(200)

       })


       test("should respond with {error:sortBy parameter is invalid} if sortBy is not valid",async()=>{
        const response =await fetch('http://localhost:8080/api/posts?tags=some&sortBy=s')


        expect(response.status).toBe(400)

       })


       test("should respond with 200 if sortBy is valid",async()=>{
        const response =await fetch('http://localhost:8080/api/posts?tags=some&sortBy=id')


        expect(response.status).toBe(200)

       })

       test("should respond with 400 if direction is not valid",async()=>{
        const response =await fetch('http://localhost:8080/api/posts?tags=some&sortBy=id&direction=s')



        expect(response.status).toBe(400)

       })

       test("should respond with 200 if direction is valid",async()=>{
        const response =await fetch('http://localhost:8080/api/posts?tags=some&sortBy=id&direction=asc')

git

        expect(response.status).toBe(200)

       })
 })
