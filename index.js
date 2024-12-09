const express=require("express");
const app=express();
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const port=2109;
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
let posts=[
    {   id:uuidv4(),
        username:"shruthi",
        post:"I am grateful for everythin"
    },
    {   id:uuidv4(),
        username:"shubham",
        post:"hardwork is everthing"
    }
];

app.get("/posts",(req,res)=>{
    res.render("home.ejs",{posts});
}
);
app.get("/posts/new",(req,res)=>{
    res.render("posts.ejs");
});
app.post("/posts/new",(req,res)=>{
   let {username,post}=req.body;
   let id=uuidv4();
   posts.push({username,post,id});
    res.render("home.ejs",{posts});
});
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("postsearch.ejs",{post});
});
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
res.render("editpost.ejs",{post});
});
app.patch("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    let newContent=req.body.post;
    post.post=newContent;
    console.log(post);
    res.redirect("/posts");
});
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
});

app.listen(port,()=>{
    console.log(`listening to port: ${port}`);
});