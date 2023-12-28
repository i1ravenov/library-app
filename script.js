const openBookFormBtn = $("open-task-form-btn");
const addOrUpdateBookBtn = $("add-or-update-book-btn");
const closeBookFormBtn = $("close-task-form-btn");
const booksContainer = $("books-container"); 
const dialogCancelBtn = $("cancel-btn");
const dialogDiscardBtn = $("discard-btn");
const confirmCloseDialog = $("confirm-close-dialog");
const bookForm = $("task-form");
const titleInput = $("title-input");
const authorInput = $("author-input");
const pagesInput = $("pages-input");
const readBooleanInput = document.getElementsByName("read");

function $(selector) {
  return document.getElementById(selector);
}

openBookFormBtn.addEventListener("click", () => {
  bookForm.classList.toggle("hidden");
});

const library = JSON.parse(localStorage.getItem("books")) || [];
const updateBooksContainer = () => {
  booksContainer.innerHTML = "";
  
  library.forEach(({id, title, author, pages, read}) => {
    booksContainer.innerHTML += `
      <div class="book-card" id=${id}>
        <p>Title: ${title}</p>
        <p>Author: ${author}</p>
        <p>Pages: ${pages}</p>
        <p>${read ? "Already read" : "Not yet read"}</p>
        <button onclick="editBookCard(this)" class="btn">Edit</button><button onclick="deleteBookCard(this)" class="btn">Delete</button>
      </div>
    `;
  });
};
updateBooksContainer();
let currentBook = {};

function Book(title, author, pages, read) {
  this.id = `${title.split(' ').join('-')}`+'-'+Date.now();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function() {
    return`${title} by ${author}, ${pages} pages, ${read ? "already red" : "not read yet"}`;
  }
}

closeBookFormBtn.addEventListener("click", () => {
  const isDataEntered = titleInput.value || authorInput.value ||
                      pagesInput.value;
  const isDataModified = titleInput.value !== currentBook.title ||
                      authorInput.value !== currentBook.author ||
                      pagesInput.value !== currentBook.pages;
  if (isDataEntered && isDataModified) {
    confirmCloseDialog.showModal();
  } else {
    clear(); 
  }
});

dialogCancelBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
});

dialogDiscardBtn.addEventListener("click", () => {
  clear();
});

addOrUpdateBookBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addOrUpdateBookBtn.innerText = "Add Book";
  const bookIndex = library.findIndex((i) => i.id === currentBook.id);
  let read = false;
  if (readBooleanInput[0].checked) {
      read = true;
  }
  const b = new Book(titleInput.value, authorInput.value, pagesInput.value, read);
    
  if (bookIndex === -1) {
    library.unshift(b);
  } else {
    library[bookIndex] = b;
  }
  localStorage.setItem("books", JSON.stringify(library));
  updateBooksContainer();
  clear();
});

const deleteBookCard = (buttonEl) => {
  const bookIndex = library.findIndex((i) => i.id === buttonEl.parentElement.id);
  library.splice(bookIndex, 1);
  updateBooksContainer();
  localStorage.setItem("books", JSON.stringify(library));
}

const editBookCard = (buttonEl) => {
  const bookIndex = library.findIndex((i) => i.id === buttonEl.parentElement.id);
  currentBook = library[bookIndex];
  titleInput.value = currentBook.title;
  authorInput.value = currentBook.author;
  pagesInput.value = currentBook.pages;
  if (currentBook.read) {
    readBooleanInput[0].checked = true;    
  } else {
    readBooleanInput[1].checked = true;    
  }
  addOrUpdateBookBtn.innerText = "Update Book";
  bookForm.classList.toggle("hidden");
  localStorage.setItem("books", JSON.stringify(library));
}

const clear = () => {
  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = '';
  for (let i = 0; i < readBooleanInput.length; i++) {
    readBooleanInput[i].checked = false;
  }
  bookForm.classList.toggle("hidden");
}