
// console.log('ok')
shownotes()

// for disable to enbale addnotes button 
let addtxt = document.getElementById('addtxt')
let addtitle = document.getElementById('addtitle')
let addbtn = document.getElementById('addbtn')

addbtn.disabled = true
addtxt.addEventListener('input',btnenableadd)

addtitle.addEventListener('input',btnenabletitle)

function btnenabletitle(){
    // console.log(titletxt.value)
    if(addtitle.value.length>0 && addtxt.value.length>0){
        addbtn.disabled = false
    }
    else{
        addbtn.disabled = true
    }
}

function btnenableadd(){
    // console.log(titletxt.value)
    if(addtxt.value.length>0 && addtitle.value.length>0){
        addbtn.disabled = false
    }
    else{
        addbtn.disabled = true
    }
}

// for addnotes 

addbtn.addEventListener('click', addnotes)
function addnotes(e) {

    addbtn.disabled = true
    let addtxt = document.getElementById('addtxt')
    let addtitle = document.getElementById('addtitle')
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes)
    }
    let myobj = {
        title: addtitle.value,
        text: addtxt.value
    }
    notesObj.push(myobj)
    // console.log(notesObj)
    localStorage.setItem('notes', JSON.stringify(notesObj))
    addtxt.value = ""
    addtitle.value = ""
    
    
    // console.log(notesObj)
    shownotes()
}

// for show a notes

function shownotes() {
        
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes)
    }

    let html = ''
    notesObj.forEach(function (element, index) {
        // console.log(element,index)
        html += `<div class="notecard my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5><hr>
            <p class="card-text">${element.text}</p>
            <button id='${index}'onclick='deletenotes(this.id)' class="btn btn-primary">Delete Note</button>
            </div>
        </div>`

    });

    let noteshow = document.getElementById('notes')
    // console.log(notesObj.length)
    if (notesObj.length != 0) {
        noteshow.innerHTML = html
    }
    else {
        noteshow.innerHTML = `No Note here , Please add some Notes using above section...`
    }
}

// for remove or delete notes 

function deletenotes(index) {
    
    if(confirm(`Are you sure for delete this note!`)){
        let notes = localStorage.getItem('notes')

        if (notes == null) {
            notesObj = []
        }
        else {
            notesObj = JSON.parse(notes)
        }

        notesObj.splice(index, 1)
        localStorage.setItem("notes", JSON.stringify(notesObj))
    }
    else{}
    shownotes()
}

// for search

let search = document.getElementById('searchTxt')

search.addEventListener('input', function(){

    let inputVal = search.value.toLowerCase()
    
    // console.log(inputVal)
    let noteCards = document.getElementsByClassName('notecard')
    Array.from(noteCards).forEach(function(element){
        
        // console.log(noteCards)
        // console.log(element)
        let cardTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase()
        let titletxt = element.getElementsByTagName('h5')[0].innerText.toLowerCase()
        // console.log(titlet)
        
        
        // console.log(cardTxt)
        if(cardTxt.includes(inputVal) || titletxt.includes(inputVal)){
            element.style.display = "block"
        }
        else{
            element.style.display = "none"
        }
        
    })
})







