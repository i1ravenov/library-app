function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function() {
    return`${title} by ${author}, ${pages} pages, ${read ? "already red" : "not read yet"}`;
  }
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);

console.log(theHobbit.info());

const res = Object.getPrototypeOf(theHobbit) == Book.prototype;

console.log(Object.getPrototypeOf(Object.prototype));
