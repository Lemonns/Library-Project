const addButton = document.querySelector('.add-btn')
const modalContainer = document.querySelector('.modal-container')
const closeButton = document.querySelector('.close-btn')
const submitButton = document.querySelector('.submit-btn')
let deleteButton = document.querySelectorAll('.read-')
let divContainer = document.querySelector('.book-container')

let myLibrary = []

class Book {
    constructor(title, author, pages, is_read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.is_read = is_read
    }

    isRead() {
        if (document.querySelector('.read-data').checked) {
            return true
        }
        
        else {
            return false
        }
    }
}


function addBookToLibrary(title, author, pages, is_read) {
    let newBook = new Book(title, author, pages, is_read)
    newBook.isRead()
    myLibrary.push(newBook)
}

function clearInputs() {
    document.querySelector('.title-data').value = ""
    document.querySelector('.author-data').value = ""
    document.querySelector('.pages-data').value = ""
    document.querySelector('.read-data').checked = false
}

function render(is_read) {
    divContainer.innerHTML = ""
    for (let i = 0; i < myLibrary.length; i++) {
        let newDiv = document.createElement('div')
        newDiv.classList.add('book')
        newDiv.setAttribute('id', i)
    
        const bookTitle = document.createElement('p')
        bookTitle.textContent = `${myLibrary[i].title}`
        bookTitle.setAttribute('id', 'title-head')
        newDiv.appendChild(bookTitle) 
    
        const bookAuthor = document.createElement('p')
        bookAuthor.textContent = `Author: ${myLibrary[i].author}`
        newDiv.appendChild(bookAuthor)
    
        const bookPages = document.createElement('p')
        bookPages.textContent = `Pages: ${myLibrary[i].pages}`
        newDiv.appendChild(bookPages)
    
        const divButtons = document.createElement('div')
        const readButton = document.createElement('button')
        const deleteButton = document.createElement('button')
        divButtons.classList.add('button-container')
        readButton.textContent = `${myLibrary[i].is_read}`
        readButton.setAttribute('id', i)
        readButton.classList.add('unread')
        divButtons.appendChild(readButton)
    
        deleteButton.textContent = 'Delete'
        deleteButton.setAttribute('id', i)
        deleteButton.classList.add('read-')
        divButtons.appendChild(deleteButton)
        newDiv.appendChild(divButtons)
        divContainer.appendChild(newDiv)
    }
}

submitButton.addEventListener('click', () => {
    let isReadInfo = ""
    let titlew = document.querySelector('.title-data').value
    let authorw = document.querySelector('.author-data').value
    let pagesw = document.querySelector('.pages-data').value
    let is_readw = document.querySelector('.read-data').checked
    if (titlew != "" && authorw != "" && pagesw != "") {
        if (is_readw) {
            isReadInfo = "Read"
            addBookToLibrary(titlew, authorw, pagesw, isReadInfo)
            render(myLibrary)
            clearInputs()
            modalContainer.style.display = 'none'
        }
        else {
            isReadInfo = "Unread"
            addBookToLibrary(titlew, authorw, pagesw, isReadInfo)
            render()
            clearInputs()
            modalContainer.style.display = 'none'
        }
    }
})

addButton.addEventListener('click', () => {
    modalContainer.style.display = 'flex'
})

closeButton.addEventListener('click', () => {
    modalContainer.style.display = 'none'
})

divContainer.addEventListener('click', (e) => {
    if (e.target.classList.value == 'read-') {
        let indexToDelete = e.target.getAttribute('id')
        myLibrary.splice(parseInt(indexToDelete), 1)
        render()
    }
})

divContainer.addEventListener('click', (e) => {
    if (e.target.classList.value == 'unread'){
        let indexToChange = e.target.getAttribute('id')
        if (e.target.textContent == 'Unread') {
            myLibrary[indexToChange].is_read = 'Read'
        }
        else {
            myLibrary[indexToChange].is_read = 'Unread'
        }
        render()
    }
})

