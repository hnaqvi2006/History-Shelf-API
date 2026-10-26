const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let books = [
  { id: 1, title: "Lanterns of Baghdad", author: "Layla Haddad", era: "Abbasid" },
  { id: 2, title: "Gardens of Isfahan", author: "Dariush Kamali", era: "Safavid" },
  { id: 3, title: "Letters from Cordoba", author: "Yusuf Benali", era: "Al-Andalus" },
  { id: 4, title: "The Paper Makers", author: "Sara Mansour", era: "Abbasid" },
  { id: 5, title: "Domes Over the Bosphorus", author: "Emre Yildiz", era: "Ottoman" }
];

app.get("/api/books", (req, res) => {
  res.json(books);
});

app.get("/api/eras", (req, res) => {
  const eras = [...new Set(books.map(book => book.era))];
  res.json(eras);
});

app.post("/api/books", (req, res) => {
  const { title, author, era } = req.body || {};

  if (!title || !author || !era) {
    return res.status(400).json({ error: "Title, author, and era are all required." });
  }

  const newBook = { id: books.length + 1, title, author, era };
  books.push(newBook);

  res.status(201).json(newBook);
});

app.listen(3000, () => {
  console.log("History Shelf is running on port 3000");
});
