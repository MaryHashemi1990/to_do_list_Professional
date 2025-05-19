let inputAddTask = document.querySelector("#inputTask");
let addBtn = document.getElementById("addBtn");
let deleteBtn = document.querySelector('.fa-xmark');
let taskList = document.querySelector("#to-do-list");
let editBtn = document.querySelector(".fa-rotate-right");
let editingTask = null;
inputAddTask.addEventListener('keyup', (e) => {
    if ((e.which || e.keyCode) == 13) {
        addBtn.click();
    }
});


//change border of input 
inputAddTask.addEventListener('focus', () => {
    inputAddTask.style.borderColor = "#9918d4";
});

inputAddTask.addEventListener('blur', () => {
    inputAddTask.style.borderColor = "#2a0266";
});

//change border of button
addBtn.addEventListener('mouseenter', () => {
    addBtn.style.borderColor = "#9918d4"; 
});

addBtn.addEventListener('mouseleave', () => {
    addBtn.style.borderColor = "#2a0266";
});

//add new task to my list
addBtn.addEventListener('click', () => {
    let inputTask = inputAddTask.value.trim();

    if (inputTask !== "") {
        if (editingTask) {
            editingTask.textContent = inputTask;
            editingTask = null; 
        } else {
            let item = document.createElement('li');
            item.className = 'to-do-item flex justify-between shadow-[0_-4px_6px_-1px_rgba(168,85,247,0.3),0_4px_6px_-1px_rgba(0,0,0,0.3)]';

            let title = document.createElement('span');
            title.classList.add("text-[18px]" , "text-white");
            title.textContent = inputTask; 
            
            let icons = document.createElement('div');
            icons.classList.add("flex", "w-[90px]", "justify-between", "icons", "text-white" , "transition-transform", "duration-500", "ease-in-out", "hover:scale-105");
            icons.innerHTML = `
                <i class="fa-solid fa-check bg-black p-1.5 rounded-full cursor-pointer"></i>
                <i class="fa-solid fa-xmark bg-black p-1.5 rounded-full cursor-pointer"></i>
                <i class="fa-solid fa-rotate-right bg-black p-1.5 rounded-full cursor-pointer"></i>
            `;
            
            item.appendChild(title);
            item.appendChild(icons);   

            item.addEventListener('mouseenter', () => {
                item.style.transform = 'scale(1.05)';
                item.style.boxShadow = "inset 1px 0 8px #7c3aed, inset -1px 0 8px #7c3aed"; 
                item.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'scale(1)';
                item.style.boxShadow = "";
                item.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            });
            taskList.appendChild(item);
            saveTasksToLocalStorage();
        }

        inputAddTask.value = ""; // پاک کردن input
    } else {
        alert("لطفا کار مورد نظر خود را وارد نمایید!");
    }
});



taskList.addEventListener("click", (e) => {
    const target = e.target;

    // حذف تسک
    if (target.classList.contains("fa-xmark")) {
        const liItem = target.closest("li");
        liItem.remove();
        saveTasksToLocalStorage();
    }

    // علامت زدن به عنوان انجام‌شده
    if (target.classList.contains("fa-check")) {
        const liItem = target.closest("li");
        const liSpan = liItem.querySelector("span");

        liSpan.style.color = "#6b7280";
        liSpan.style.textDecoration = "line-through";
    }

    // بازنشانی تسک (آیکون rotate)
    if (target.classList.contains("fa-rotate-right")) {
        console.log("Rotate icon clicked"); 
        const liItem = target.closest("li");
        const liSpan = liItem.querySelector("span");

        inputAddTask.value = liSpan.textContent;
        editingTask = liSpan;
        saveTasksToLocalStorage();
    }

    else{
        const liItem = target.closest("li");
        const liSpan = liItem.querySelector("span");

        liSpan.style.color = "#6b7280";
        liSpan.style.textDecoration = "line-through";
        saveTasksToLocalStorage();
    }
});

const items = document.querySelectorAll('#to-do-list li');

    items.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.05)';
        item.style.boxShadow = "inset 1px 0 8px #7c3aed, inset -1px 0 8px #7c3aed"; 
    });

      item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
        item.style.boxShadow = "";
    });
});

function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#to-do-list li span').forEach(span => {
        tasks.push({
            text: span.textContent,
            completed: span.style.textDecoration === 'line-through'
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        let item = document.createElement('li');
        item.className = 'to-do-item flex justify-between shadow-[0_-4px_6px_-1px_rgba(168,85,247,0.3),0_4px_6px_-1px_rgba(0,0,0,0.3)]';

        let title = document.createElement('span');
        title.classList.add("text-[18px]", "text-white");
        title.textContent = task.text;
        if (task.completed) {
            title.style.color = "#6b7280";
            title.style.textDecoration = "line-through";
        }

        let icons = document.createElement('div');
        icons.classList.add("flex", "w-[90px]", "justify-between", "icons", "text-white", "transition-transform", "duration-500", "ease-in-out", "hover:scale-105");
        icons.innerHTML = `
            <i class="fa-solid fa-check bg-black p-1.5 rounded-full cursor-pointer"></i>
            <i class="fa-solid fa-xmark bg-black p-1.5 rounded-full cursor-pointer"></i>
            <i class="fa-solid fa-rotate-right bg-black p-1.5 rounded-full cursor-pointer"></i>
        `;

        item.appendChild(title);
        item.appendChild(icons);
        taskList.appendChild(item);
    });
}
loadTasksFromLocalStorage();

