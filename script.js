let toDoList = []
let myStorage = window.localStorage;
if (myStorage.getItem('toDoList') != null) {
    toDoList = JSON.parse(myStorage.getItem('toDoList'))
    render(toDoList)
}


document.getElementById('inputText').addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("btnAdd").click();
    }
});

function addToDo() {
    let inputText = document.getElementById('inputText').value
    let item = { content: inputText, complete: false }
    toDoList.push(item)
    document.getElementById('inputText').value = ''
    myStorage.setItem('toDoList', JSON.stringify(toDoList))
    render(toDoList)
}

function toggleRemove(index) {
    toDoList.splice(index, 1)
    myStorage.setItem('toDoList', JSON.stringify(toDoList))
    render(toDoList)
}

function checkComplete() {
    let checkBoxes = document.getElementById('listArea').getElementsByTagName('input')
    let checkLabel = document.getElementById('listArea').getElementsByTagName('label')

    let index = 0;

    for (let i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            index = toDoList.map(item => item.content).indexOf(checkLabel[i].innerHTML)
            toDoList[index].complete = true
        } else {
            index = toDoList.map(item => item.content).indexOf(checkLabel[i].innerHTML)
            toDoList[index].complete = false
        }
    }

    let search = document.getElementById('search').getElementsByTagName('input')
    if (search[0].checked) {
        checkSearchAll()
    }
    if (search[1].checked) {
        checkSearchNotDone()
    }
    if (search[2].checked) {
        checkSearchDone()
    }
}

function checkSearchAll() {
    render(toDoList);
}

function checkSearchNotDone() {
    let notDone = []
    for (let i = 0; i < toDoList.length; i++) {
        if (toDoList[i].complete == false) {
            notDone.push(toDoList[i])
        }
    }
    render(notDone)
}

function checkSearchDone() {
    let done = []
    for (let i = 0; i < toDoList.length; i++) {
        if (toDoList[i].complete == true) {
            done.push(toDoList[i])
        }
    }
    render(done)
}

function render(arrayList) {
    let html = ''
    for (let i = 0; i < arrayList.length; i++) {
        if (arrayList[i].complete) {
            html += `<div id="lineList" class="form-check"><input class="form-check-input" id="checkBox" type="checkbox" checked onclick="checkComplete()"><label class="form-check-label done-text">${arrayList[i].content}</label><a onclick="toggleRemove(${i})" href="#"> x</a></div>`
        } else {
            html += `<div id="lineList" class="form-check"><input class="form-check-input" id="checkBox" type="checkbox" onclick="checkComplete()"><label class="form-check-label">${arrayList[i].content}</label><a onclick="toggleRemove(${i})" href="#"> x</a></div>`
        }
    }
    document.getElementById('listToDo').innerHTML = html
}

