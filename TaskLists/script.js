const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn =document.querySelector('.clear-tasks')
const filter=document.querySelector('#filter')
const taskInput=document.querySelector('#task')


//Load all event Listeners

loadEventListeners();

//Function Definition for loadEventListeners
function loadEventListeners(){
    //DOM Load Event
    document.addEventListener('DOMContentLoaded',getTasks)
    form.addEventListener('submit',addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click',clearTask);
    filter.addEventListener('keyup',filterTasks);

}

//Function definition for addTask()
function addTask(e){

    //Task Empty: Alert
    if(taskInput.value==='')
    {
        alert('Please add a task!')
        return;
    }

    //Add Task
    const li=document.createElement('li');
    li.className='collection-item';
    li.appendChild(document.createTextNode(taskInput.value))
    const link=document.createElement('a')
    link.className = 'delete-item secondary-content'
    link.innerHTML = '<i class="fa fa-remove"></i>'
    li.appendChild(link);
    //Appending li to ul
    taskList.appendChild(li);

    //Store in Local Storage
    storeTaskInLocalstorage(taskInput.value)

    //clear Input
    taskInput.value='';

    e.preventDefault();
}

//Function definition for removeTask()
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure you want to delete this task?')){
            e.target.parentElement.parentElement.remove();
            //Remove from Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
        
    }
}

//Function defeinition for clearTasks
function clearTask(){
    if(confirm('Are you sure you want to clear all the tasks created?'))
    {
        while(taskList.firstChild){
                
            taskList.removeChild(taskList.firstChild)
            filter.value=''

        }
        clearTasksFromLocalStorage();
    }
}

//Fucntion definition for filterTasks
function filterTasks(e)
{
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item= task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!=-1){
            task.style.display = 'block';

        }
        else{
            task.style.display='none';
        }
    });
    
    
}

//Function definition for storeTaskInLocalstorage
function storeTaskInLocalstorage(task){
    let  tasks;
    if(localStorage.getItem('tasks')== null)
    {
        tasks=[]
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));

}

//function definition for getTasks
function getTasks(){
    let  tasks;
    if(localStorage.getItem('tasks')== null)
    {
        tasks=[]
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task){
    const li=document.createElement('li');
    li.className='collection-item';
    li.appendChild(document.createTextNode(task))
    const link=document.createElement('a')
    link.className = 'delete-item secondary-content'
    link.innerHTML = '<i class="fa fa-remove"></i>'
    li.appendChild(link);
    //Appending li to ul
    taskList.appendChild(li);


    })

}

//function definition for removeTaskFromLocalStorage
function removeTaskFromLocalStorage(taskItem){
    let  tasks;
    if(localStorage.getItem('tasks')== null)
    {
        tasks=[]
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'))
    }


    tasks.forEach(function(task,index){
        if(taskItem.textContent===task){
            tasks.splice(index,1);

        }
    })

    localStorage.setItem('tasks',JSON.stringify(tasks));

}

//Function definition for clearTasksFromLocalStorage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}