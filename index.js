import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";  
import { title } from "process";
const __dirname = dirname(fileURLToPath(import.meta.url));  

const app = express();
const port = 3000;                                        

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));           
                                   

app.get("/", (req, res) => {
  res.render("main.ejs")           
});

app.get("/blog", (req, res) => {
  res.render("blog.ejs")
});

app.get("/edit", (req, res) => {
  res.render("edit.ejs")
});

app.post("/submitarticle", (req, res) => {
  let title = req.body.title
  console.log(title)
  res.render("article.ejs", { title: title })
});

// app.post("/submit", (req, res) => {                        
//   res.send(`<h1>Your name pet is</h1><h2>${brandName}</h2>`)
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
