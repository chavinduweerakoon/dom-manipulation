//book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//ui constructor
function UI() {}

UI.prototype.addBookToList = function (book) {
  console.log(book);
  const list = document.getElementById("book-list");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
  list.appendChild(row);
};

//clear feilds
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

//error messages
UI.prototype.showAlert = function (errorMsg, className) {
  //div
  const div = document.createElement("div");
  //add classes
  div.className = `alert ${className}`;
  //add text
  div.appendChild(document.createTextNode(errorMsg));
  //add to parent
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");
  container.insertBefore(div, form);

  //timeout
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

//event listeners
document.getElementById("book-form").addEventListener("submit", function (e) {
  //form values
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  //book instance
  const book = new Book(title, author, isbn);

  //ui instance
  const ui = new UI();

  //validate
  if (title === "" || author === "" || isbn === "") {
    //error
    ui.showAlert("Please provide values for all feilds", "error");
  } else {
    //add book to list
    ui.addBookToList(book);

    //show success
    ui.showAlert("form submitted successfully", "success");

    //clear fields
    ui.clearFields();
  }

  e.preventDefault();
});
