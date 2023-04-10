let booksContainer = document.querySelector('.books');
let loader = document.querySelector('.loader');


function api (){ 
  loader.style.display = 'block';
  fetch('https://openlibrary.org/subjects/fiction.json?limit=15')
  .then(response => response.json())
  .then(data => {
    const books = data.works;
    books.forEach(book => {
      let bookContainer = document.createElement('div');
      bookContainer.classList.add('book');
      console.log(data)

      let bookImg = document.createElement('img');
      bookImg.src = `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`;
      bookImg.style.borderRadius = "5px"

      let bookTitle = document.createElement('h2');
      bookTitle.textContent = book.title;

      let bookAuthor = document.createElement('p');
      bookAuthor.textContent = `By: ${book.authors[0].name}`;

      bookContainer.appendChild(bookImg);
      bookContainer.appendChild(bookTitle);
      bookContainer.appendChild(bookAuthor);
      booksContainer.appendChild(bookContainer);
    });
    loader.style.display = 'none';
  })
};


let form = document.querySelector('form');
let searchInput = document.querySelector('#search-input');


form.addEventListener('input', (event) => {
  event.preventDefault();
  let searchValue = searchInput.value;
  if (searchValue.length > 0) {
    const searchUrl = `https://openlibrary.org/search.json?q=${searchValue}&limit=15`;
    loader.style.display = 'block';
    fetch(searchUrl)
      .then(response => response.json())
      .then(data => {
        const books = data.docs;
        booksContainer.innerHTML = '';
        books.forEach(book => {
          let bookContainer = document.createElement('div');
          bookContainer.classList.add('book');

          let bookImg = document.createElement('img');
          bookImg.src = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

          let bookTitle = document.createElement('h2');
          bookTitle.textContent = book.title;

          let bookAuthor = document.createElement('p');
          bookAuthor.textContent = `By: ${book.author_name ? book.author_name.join(', ') : 'Unknown'}`;

          bookContainer.appendChild(bookImg);
          bookContainer.appendChild(bookTitle);
          bookContainer.appendChild(bookAuthor);
          booksContainer.appendChild(bookContainer);
        });
        loader.style.display = 'none';
      })
      .catch(error => console.log(error));
  } else if(searchValue.length="0") {
      console.log("refresh")
    api();
  }
});


api()

let menu = document.querySelector('.menu');

menu.addEventListener("click", ()=>{
    form.classList.toggle("active")
})
