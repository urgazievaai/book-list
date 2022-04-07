//book constructor: он будет престовлять книгу, поэтому каждый раз когда мы создаем книгу, она будет добавлять экземплярь объекта книги   
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI constructor: будет обрабатывать задачи пользовательского интерфейса

function UI(){}

//UI prototype method

UI.prototype.addBookToList = function (book) {
  const booklist = document.getElementById('book-list');
  const row = document.createElement('tr');

  row.innerHTML = `
  <td> ${book.title} </td>
   <td> ${book.author} </td>
   <td> ${book.isbn} </td>
   <td><a href="#" class="delete">X</a></td>
   `;

   booklist.appendChild(row);

};

//метод который будет покаывать alert
//function будет принимать на себя два параметра первое сообщение которое будет выводится и исходя от типа сообщения будем передовать второе значение через имени класса (тоесть error или success )

UI.prototype.showAlert = function(msg, className) {
  const div = document.createElement('div');
  div.className = `alert ${className}`;

//в div пепедаем apendchild-дом и в Аппедн чайл мы передаем текстовый узел к которому передаем аргумент msg

  div.appendChild(document.createTextNode(msg));

//дальше мы этот алерт должны вставить в html между контейнером и формой и для этого мы будем испоользовать insert before, должны были использовать insert before но так как у меня вертска с бутстрапом, потому что между родителем и нужного нам тега много элементов, и поэтому используем after

const h2 = document.querySelector('h2');
h2.after(div);

// У сет таймаута два параметра первый нужно передать коллбек функцию и второе время 

setTimeout(function(){
document.querySelector('.alert').remove()
},3000);

};

//clear field 
UI.prototype.clearFields = function(){
  document.getElementById('name').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

//Delete book list method

UI.prototype.deleteBookList = function(e) {
  if (e.className === 'delete'){
    e.parentElement.parentElement.remove()
  }
};

// Event Listeners
document.getElementById("book-form").addEventListener("submit", (e) => {
  const title = document.getElementById("name").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;
  
  const book = new Book(title, author, isbn);
 
   const ui = new UI();


//validate
  if(title === '' || author === '' || isbn === ''){
    ui.showAlert('please ', 'error');
   } else if(isNaN(isbn)) {
    ui.showAlert('incorrect ISBN number', 'error');
  } else {
    ui.addBookToList(book);
    ui.showAlert('ok', 'success');
    ui.clearFields();
  }

  e.preventDefault();

});

// event listener delete book list 
document.getElementById('book-list').addEventListener('click',(e) => {
  
  const ui = new UI();
  ui.deleteBookList(e.target);
  
  e.preventDefault
});
