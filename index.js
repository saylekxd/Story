import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { title } from "process";
const __dirname = dirname(fileURLToPath(import.meta.url));  

const app = express();
const port = 3000;                                        

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));           
                                   
let articles = [];

app.get("/", (req, res) => {
  res.render("main.ejs")           
});

app.get("/blog", (req, res) => {
  res.render("blog.ejs", {articles: articles})
});

app.get("/edit", (req, res) => {
  res.render("edit.ejs", {articles: articles})
});

app.post("/submitarticle", (req, res) => {
  const data = {
    id: Date.now(),
    title: req.body.title,
    author: req.body.author,
    mainText: req.body.mainText,
    nick: req.body.nickname,
  };
  articles.push(data);
  console.log(data.title);
  console.log(data.id);
  res.redirect("/edit")
});

app.get("/edit/:id", (req, res) => {
  const articleId = parseInt(req.params.id);
  const article = articles.find(a => a.id === articleId);

  if (!article) {
    return res.status(404).send("Article not found");
  }

  // Przekazujemy artykuł bezpośrednio
  res.render("update-module.ejs", {
    article: article, 
    debug: false
  });
});

app.post("/updatearticle/:id", (req, res) => {
  const articleId = parseInt(req.params.id);
  const index = articles.findIndex(a => a.id === articleId);

  if (index === -1) {
    return res.status(404).send("Article not found");
  }

  // Aktualizujemy artykuł zachowując oryginalne nazwy pól
  articles[index] = {
    ...articles[index],
    title: req.body.title,
    mainText: req.body.mainText,
    author: req.body.author,
    nick: req.body.nickname,
    updatedAt: new Date()
  };

  // Logujemy zaktualizowany artykuł
  console.log('Zaktualizowano artykuł:', articles[index]);

  // Przekierowujemy do listy artykułów
  res.redirect("/edit");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});