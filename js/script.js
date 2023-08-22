
const dateText = document.querySelector('.current_date');

const gsDayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const monthList = ['January','February','March','April','Мay','June','July', 'August', 'September', 'October', 'November', 'December']

let date = new Date();
dateText.textContent = `${date.getDate()}th ${monthList[date.getMonth()]}, ${gsDayNames[date.getDay()]}`;



const inputTxt = document.getElementById('input-new-task'),
		addBtn = document.getElementById('submit-new-task'),
		tasksList = document.getElementById('tasks'),
		countText = document.querySelector('.count-task .text'),
		clearAll = document.querySelector('button.clear-all');

let editId;
let isEditedTask = false;

// checks whether the user has entered a value
inputTxt.onkeyup = () => {
	let userInput = inputTxt.value;
	if (userInput.trim() != 0) {
		addBtn.classList.add('active');
	}else {
		addBtn.classList.remove('active');
	}
};

//function <update> - 'Update local storage'
function updateLocalStorage() {
	let getLocalStorage = localStorage.getItem('To Do List');
	if (getLocalStorage == null) {
		listArr = []; 
	}else {
		listArr = JSON.parse(getLocalStorage);
		countText.textContent = `You have ${JSON.parse(getLocalStorage).length} pending tasks`; // count tasks
	}
}

showTask();

// function <add> 
function addNewTask() {
	let userData = inputTxt.value;

	if (!isEditedTask) {
		updateLocalStorage()
		listArr.push(userData);
	}else {
		listArr[editId] = userData;
		isEditedTask = false;
		addBtn.value = '+ Add task';
	}
	localStorage.setItem('To Do List', JSON.stringify(listArr));
	showTask();
}

// button <click> - 'Add new task in list to do'
addBtn.addEventListener('click', addNewTask);
// keyup <Enter> - 'Enter add new task'
inputTxt.addEventListener('keyup',(e) => {
	let userTask = inputTxt.value.trim();
	if (e.key == 'Enter' && userTask) {
		addNewTask();
	}
});


// function <show> - 'Show task' 
function showTask() {
	updateLocalStorage();

	let newLi = '';
	listArr.forEach((elem, index) => {
		newLi += `
		<li>
			<div class="content">
				<div class="text">${elem}</div>
			</div>
			<div class="action">
				<button onclick="editTask('${elem}', ${index})" class="edit"><i class="fa-regular fa-pen-to-square fa-lg"></i></button>
				<button class="delete" onclick="deleteTask(${index})"><i class="fa-regular fa-trash-can fa-lg"></i></button>
			</div>
		</li>
		`;
	});
	
	tasksList.innerHTML = newLi;
	inputTxt.value = '';
	addBtn.classList.remove('active');
}

// function <delete> - 'Task'
function deleteTask(index) {
	let getLocalStorage = localStorage.getItem('To Do List');
	listArr = JSON.parse(getLocalStorage);
	listArr.splice(index, 1);
	localStorage.setItem('To Do List', JSON.stringify(listArr));
	showTask();
}

// function <edit> - 'Task name'
function editTask(elem, index) {
	editId = index;
	inputTxt.value = elem;
	inputTxt.focus();
	addBtn.value = 'Save';
	addBtn.classList.add('active');
	isEditedTask = true;
}

// button <clear> - 'Clear all tasks'
clearAll.addEventListener('click', () => {
	listArr.splice(0, listArr.length);
	localStorage.setItem('To Do List', JSON.stringify(listArr));
	showTask();
});