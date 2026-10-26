# History Shelf API

## Purpose

History Shelf is a small book collection focused on Middle Eastern history. I built my own REST API with Node.js and Express, and the webpage uses `fetch()` to show the books, list the eras, and add new books through a form. All books are fictional and stored in a JavaScript array, so anything I add resets when the server restarts.

## Project Structure

```
history-shelf-api/
├── server.js          Express server and API routes
├── package.json
├── package-lock.json
├── README.md
└── public/
    ├── index.html     The webpage
    ├── style.css      Styling
    └── script.js      fetch() calls and form handling
```

## Install Dependencies

Open the terminal and run:

```
npm install
```

## Start the Server

```
npm start
```

or

```
node server.js
```

The terminal will say `History Shelf is running on port 3000`.

## API Endpoints

| Method | Route         | What it does                                  |
| ------ | ------------- | --------------------------------------------- |
| GET    | `/api/books`  | Returns all books as JSON                     |
| GET    | `/api/eras`   | Returns the list of eras on the shelf         |
| POST   | `/api/books`  | Adds a new book (needs `title`, `author`, `era`) |

Example POST body:

```json
{ "title": "Caravans of Damascus", "author": "Omar Saleh", "era": "Umayyad" }
```

If any field is missing, the server sends back a `400` status with:

```json
{ "error": "Title, author, and era are all required." }
```

## Testing in StackBlitz

1. Run `npm install`, then `npm start` in the StackBlitz terminal.
2. Open the Preview panel to see the webpage with the 5 sample books.
3. Add `/api/books` to the end of the **preview** URL to see the books as JSON.
4. Add `/api/eras` to the end of the preview URL to see the eras as JSON.
5. Fill out the form and click **Add Book**. The new book shows up in the list.
6. Click **Add Book** with an empty field to see the error message from the server.
