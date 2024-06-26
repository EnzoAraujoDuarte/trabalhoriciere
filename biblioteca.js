let allBooks = [];
const emptyBookList = document.querySelector("#emptyBookList");
const fields = document.querySelectorAll("input");
const modal = document.querySelector("#myModal");
const modalTitle = document.querySelector("#modalTitle");
const synopsis = document.querySelector("#synopsis");
const txtSynopsis = document.querySelector("#txtSynopsis");
const btnRegister = document.querySelector("#btnRegister");
const btnSearch = document.querySelector("#btnSearch");

function findBook() {
  return allBooks.findIndex((elem) => elem.bookName === (event.target.parentNode.className));
}

function showSynopsis(event) {
  if (event.target.id === "btnSinopsys") {
    modalTitle.innerHTML = `Sinopse do livro "${allBooks[findBook()].bookName}"`;
    txtSynopsis.innerHTML = allBooks[findBook()].synopsis;
    modal.style.display = "block";
  }
}

function showError(bookName) {
  const contentModel = document.querySelector("#contentModel");
  modalTitle.innerHTML = `Livro "${bookName}" não encontrado!`;
  txtSynopsis.innerHTML = "";
  contentModel.style.width = "50%";
  modal.style.display = "block";
}

function closeModal(event) {
  modal.style.display = "none";
}

function closeModalWindow(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

function clearFields() {
  fields.forEach(function (elem) {
    elem.value = "";
  });
  synopsis.value = "";
}

function createCard(bookCard, book) {
  bookCard.className = book.bookName;
  bookCard.innerHTML = `
    <p id="bookTitle">${book.bookName}</p>
    <img src="${book.bookCover}"/>
    Autor: ${book.bookAuthor}
    <br>Editora: ${book.bookPublisher}
    <br>Págs: ${book.numberOfPages}
  
    <p>Cadastrado por: ${book.createdBy}</p>
    
    <button id="btnSinopsys">Sinopse</button>
    <button id="btnRemove">Remover</button>
    `;
}

function appendElements(divSelect, bookCard) {
  const btnCloseModal = document.querySelector("#btnCloseModal");
  divSelect.append(bookCard);
  divSelect.addEventListener("click", showSynopsis);
  btnCloseModal.addEventListener("click", closeModal);
  window.addEventListener("click", closeModalWindow);
}

function removeCard(parentDiv) {
  return function remove(event) {
    if (event.target.id === "btnRemove") {
      parentDiv.removeChild(event.target.parentNode);
      if (allBooks.splice(findBook(), 1)) {
        alert(`Livro "${event.target.parentNode.className}" removido com sucesso!`);
      }
    }
  };
}

function registerBook() {
  const listOfAllBooks = document.querySelector("#listOfAllBooks");
  const bookName = document.querySelector("#bookName").value;
  const bookAuthor = document.querySelector("#bookAuthor").value;
  const bookPublisher = document.querySelector("#bookPublisher").value;
  const numberOfPages = Number(document.querySelector("#numberOfPages").value);
  const bookCover = document.querySelector("#bookCover").value;

  event.preventDefault();

  // Obter o usuário atual do armazenamento local
  var currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Adicionar o nome do usuário ao objeto do livro
  const book = {
    bookName,
    bookAuthor,
    bookPublisher,
    numberOfPages,
    bookCover,
    synopsis: synopsis.value,
    createdBy: currentUser.user // Adicionando o nome do usuário que cadastrou o livro
  };

  // Adicionar o livro à lista de todos os livros
  allBooks.push(book);

  emptyBookList.remove();
  const bookCard = document.createElement("div");

  createCard(bookCard, book);
  appendElements(listOfAllBooks, bookCard);

  const remove = removeCard(listOfAllBooks);
  listOfAllBooks.addEventListener("click", remove);

  clearFields();
}

function searchBook() {
  const bookNameSearch = document.querySelector("#bookNameSearch").value;
  const listOfBooksSearch = document.querySelector("#listOfBooksSearch");
  const foundBooks = document.querySelector("#foundBooks");
  const bookCard = document.createElement("div");

  foundBooks.innerHTML = "";
  listOfBooksSearch.append(foundBooks);

  const findBook = allBooks.filter(elem => elem.bookName === bookNameSearch);

  if (findBook.length !== 0) {
    findBook.forEach(elem => {
      createCard(bookCard, elem);
      appendElements(foundBooks, bookCard);
    });
  } else {
    showError(bookNameSearch);
  }

  const remove = removeCard(foundBooks);
  listOfBooksSearch.addEventListener("click", remove);

  clearFields();
}

btnRegister.addEventListener("click", registerBook);
btnSearch.addEventListener("click", searchBook);
