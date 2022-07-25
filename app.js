const express = require('express');
const bodyParse = require('body-parser');
const app = express();
const fetch = require('node-fetch');

app.use(bodyParse.urlencoded({extended:false}));
app.use(bodyParse.json());


app.get('/api/ping',(req,res)=>{
    res.json({"success":true})
})

app.get('/api/posts',async(req,res)=>{
    let {tags,sortBy,direction} = req.query;



    if(!tags){
        return res.status(400).json({"error":"Tags parameter is required"});
    }

    if(sortBy && (sortBy!=='id' && sortBy!=='reads' && sortBy!=='likes' && sortBy!=='popularity')){
       return res.status(400).json({"error":"sortBy parameter is invalid"});
    }


    if(direction&& (direction!=='desc' && direction!=='asc')){
       return res.status(400).json({"error":"direction parameter is invalid"});
    }


    const tagArr =  tags.split(',');
    let posts = [];






    for(let tag of tagArr){

        try{
            const response =await fetch(`https://api.hatchways.io/assessment/blog/posts?tag=${tag}`);
            const re =await response.json();



            

            posts.push(...re.posts)
        }catch(e){
        }


    }

    let newPosts = []
    let hashMap = {};


    for(let i of posts){


        if(hashMap[i.id]){
            hashMap[i.id]++;
        }else{
            hashMap[i.id] = 1;

            newPosts.push(i);
        }

    }

    if(sortBy && direction){
        if(direction==='asc'){
            newPosts.sort((a,b)=>a[sortBy]-b[sortBy]);
        }else{
            newPosts.sort((a,b)=>b[sortBy]-a[sortBy]);

        }
    }else if(sortBy){
        newPosts.sort((a,b)=>a[sortBy]-b[sortBy]);
    }else if(direction){

        if(direction==='asc'){
            newPosts.sort((a,b)=>a['id']-b['id']);
        }else{
            newPosts.sort((a,b)=>b['id']-a['id']);
        }

    }else{
        newPosts.sort((a,b)=>a['id']-b['id']);

    }



    return res.json({"posts":newPosts})


});

module.exports = app
