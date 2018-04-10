
// Define our UI Vars (5)
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');


// Load all event listeners - call the function
loadAllEventListeners();

// declare Load all event listeners function
function loadAllEventListeners(){
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks)
    // Add task event 
    form.addEventListener('submit', addTask);
    // Delete task
    taskList.addEventListener('click', removeTask)
    // Clear all tasks
    clearBtn.addEventListener('click', clearTasks)
    // Filter through tasks
    filter.addEventListener('keyup', filterTasks)
}

   

   

// Add task
function addTask(e){
    // Add alert 
    if (taskInput.value === ''){
        alert('Please insert a task')
    } else {
    // Create li element
    const li = document.createElement('li');
    // Add class - "collection-item"
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class delete-item secondary-content
    link.className = 'delete-item secondary-content';
    // Add icon
    link.innerHTML = '<i class= "fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);
    // Append li to UL
    taskList.appendChild(li);
    // Store to LS
    storeTasksInLocalStorage(taskInput.value);
    // Clear input
    taskInput.value = '';
    //Prevent Default
    }
   
    e.preventDefault();
};

   


   
// Store task in LS
function storeTasksInLocalStorage(task){
    // Declare tasks array
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.push(task);
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Remove Task
function removeTask(e){
    // add confirm
        if(e.target.parentElement.classList.contains('delete-item')){    
        if(confirm('Are you sure?')){
        e.target.parentElement.parentElement.remove();
    // Call remove from LS and pass the  
       removeTaskFromLongTermStorage(e.target.parentElement.parentElement);       
  }       
 }
}
        
 
        

// Remove from LS
function removeTaskFromLongTermStorage(listItem){
    // declare array and check if theres anything in LS
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task, index){
        if(listItem.textContent === task){
            tasks.splice(index,1);
            console.log(index)
        }
    })
    
    // Reset local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

}
        

    


// Clear tasks
function clearTasks(){
    taskList.innerHTML = ''
    // Call clear from lS function
    clearLocalStorage();
}

    

// Clear from LS
function clearLocalStorage(){
    localStorage.clear();
}

// filter through tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
       const item = task.textContent.toLowerCase();
        if(item.indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
    
    
}






