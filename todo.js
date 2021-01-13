
let card = [];
let currentChange;
function addTask() {
   document.querySelector(".popup_list").style.display="flex";
   document.querySelector(".empty").style.display="none";
}
function listClose() {
  document.querySelector(".popup_list").style.display="none";
}
function addTodo() {
  let heading = document.getElementById("head-text").value;
    
    if (heading !== "") {
      const todo = {
        heading,
        subTaskList: [],
        id: Date.now(),
       
      };
      card.push(todo);
    }
    render();
   
}
function render() {
  const list = document.querySelector(".main-card");
  var child = list.lastElementChild;
  while (child) {
    list.removeChild(child);
    child = list.lastElementChild;
  }
  for(i = 0; i < card.length; i++) {  
    var paraElement = document.createElement('div');
    paraElement.setAttribute("data-key", card[i].id);
    let currentTodo = card[i];
    paraElement.classList.add("card");
    paraElement.innerHTML = ` <p class="card-heading">${card[i].heading}</p>
    <ul class="sub-style" style="list-style-type:none;">
    </ul>
    <div class="footer">
        <button class="btn-remove" onclick="remove(this)"><i class="fa fa-trash" aria-hidden="true"></i></button>
        <button class="btn-add" onclick="addSubTask(this)"><i class="fas fa-plus-circle" aria-hidden="true"></i></button> 
        
    </div>`;
    document.querySelector(".main-card").appendChild(paraElement);
    document.querySelector(".popup_list").style.display="none";
    for (let j = 0; j < currentTodo.subTaskList.length; j++) {
      const liNode = document.createElement('li');
      document.querySelector("ul").appendChild(liNode);
      liNode.innerHTML = ` ${currentTodo.subTaskList[j].name}<button class = 'mark' onclick="checkMark(this)">Mark Done</button>`;
      paraElement.childNodes[3].appendChild(liNode);
      // if (currentTodo.subTaskList[j].marked === true ) {
      //   document.querySelector('li').classList.add("marked");
      // }
      // else {

      // }
  
    }
  }    

}


function addSubTask(item) {

  currentChange = item;
  document.querySelector(".popup_item").style.display="flex";

}
function addSubTodo() {
  let taskHeading = document.getElementById("task-text").value;

  document.querySelector(".popup_item").style.display="none";
  let id = currentChange.parentNode.parentNode.getAttribute("data-key");
 

  for (let i = 0; i < card.length; i++) {
    if (card[i].id == id) {
      card[i].subTaskList.push({
      name: taskHeading,
      marked: false,
      });
    }
  } 
  render(); 
  
}  

function itemClose() {
  document.querySelector(".popup_item").style.display="none";
}
function remove(element) {
  let temp = element.parentNode.parentNode;
  console.log(temp);

  for (let i = 0; i < card.length; i++) {
    if (card[i].id == temp.getAttribute("data-key")) {
      card.splice(i, 1);
     }
    render();
  }
}  


function checkMark(element) {
  let id = element.parentNode.parentNode.parentNode.getAttribute("data-key");
  for (let i = 0; i < card.length; i++) {
    if (card[i].id == id) {
      for (let j = 0; j < card[i].subTaskList.length; j++) {
        card[i].subTaskList[j].marked = true;
        if( card[i].subTaskList[j].marked === true) {
          element.parentNode.classList.add("marked");
        }
      }
    }
  }
  element.parentNode.removeChild(element);
}
