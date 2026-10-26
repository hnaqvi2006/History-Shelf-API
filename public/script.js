const bookList = document.getElementById("bookList");
const eraList = document.getElementById("eraList");
const form = document.getElementById("bookForm");
const message = document.getElementById("message");

async function loadBooks() {
  try {
    const response = await fetch("/api/books");
    const books = await response.json();

    bookList.innerHTML = "";

    books.forEach(book => {
      const card = document.createElement("div");
      card.className = "book";

      const title = document.createElement("h3");
      title.textContent = book.title;

      const details = document.createElement("p");
      details.textContent = `${book.author} • ${book.era}`;

      card.append(title, details);
      bookList.appendChild(card);
    });
  } catch (error) {
    bookList.textContent = "Could not load books right now.";
  }
}

async function loadEras() {
  try {
    const response = await fetch("/api/eras");
    const eras = await response.json();

    eraList.innerHTML = "";

    eras.forEach(era => {
      const tag = document.createElement("span");
      tag.className = "era";
      tag.textContent = era;
      eraList.appendChild(tag);
    });
  } catch (error) {
    eraList.textContent = "Could not load eras right now.";
  }
}

form.addEventListener("submit", async event => {
  event.preventDefault();

  const newBook = {
    title: document.getElementById("title").value.trim(),
    author: document.getElementById("author").value.trim(),
    era: document.getElementById("era").value.trim()
  };

  try {
    const response = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook)
    });

    const data = await response.json();

    if (!response.ok) {
      message.textContent = data.error;
      message.className = "error";
      return;
    }

    message.textContent = `"${data.title}" was added to the shelf!`;
    message.className = "success";
    form.reset();
    loadBooks();
    loadEras();
  } catch (error) {
    message.textContent = "Something went wrong. Is the server running?";
    message.className = "error";
  }
});

loadBooks();
loadEras();
