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


closeBookFormBtn.addEventListener("click", () => {
  const isDataEntered = titleInput.value || authorInput.value ||
                      pagesInput.value;
  if (isDataEntered) {
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

const library = localStorage.getItem("data") || [];

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

addOrUpdateBookBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary();
  updateBooksContainer();
  clear();
});
// const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);

const updateBooksContainer = () => {
  booksContainer.innerHTML = "";
  
  library.forEach(({id, title, author, pages, read}) => {
    booksContainer.innerHTML += `
      <div class="book-card">
        <p>Title: ${title}</p>
        <p>Author: ${author}</p>
        <p>Pages: ${pages}</p>
        <p>${read ? "Already read" : "Not yet read"}</p>
      </div>
    `;
  });
};

const addBookToLibrary = () => {
  let read = false;
  if (readBooleanInput[0].checked) {
    read = true;
  }
  const b = new Book(titleInput.value, authorInput.value, pagesInput.value, read);
  library.unshift(b);
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