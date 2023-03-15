import ToDoListStyles from '@/styles/ToDoList.module.css'
import React, { useState } from 'react';

function Template({ task, completeTask, deleteTask, uncheckTask }) {
  //打勾
  function handleCompleteClick() {
    completeTask(task.id);
  }
  //刪除
  function handleDeleteClick() {
    deleteTask(task.id);
  }
  //取消打勾
  function handleUncheckClick() {
    uncheckTask(task.id);
  }

  return (
    <li className={`${ToDoListStyles.task} test`}>
      <input
        type="checkbox"
        className="check item"
        onChange={task.completed ? handleUncheckClick : handleCompleteClick}
        checked={task.completed}
      />
      <p className="content item">{task.content}</p>
      <span className="delete item" onClick={handleDeleteClick}>
        Delete
      </span>
    </li>
  );
}



function TodoList() {
  const [text, setText] = useState(''); //字串 預設空字串
  const [tasks, setTasks] = useState([]); //未完成 陣列 預設空陣列
  const [completedTasks, setCompletedTasks] = useState([]);//已完成 陣列 預設空陣列

  //將預設空字串轉成輸入的值
  function handleInputChange(e) {
    setText(e.target.value);
  }


  function handleCompleteTask(taskId) {
    //找到當前事項的index
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const task = tasks[taskIndex];

    // 建立相同的 tasks[]
    const newTasks = [...tasks];

    console.log(newTasks,'splice前');
    //將newTask的當前元素刪除
    newTasks.splice(taskIndex, 1);
    console.log(newTasks,'splice後');
    task.completed = true;
    setCompletedTasks([...completedTasks, task]);
    //在 setCompletedTasks 的函數中，使用 [...completedTasks, task] 這樣的語法是將 completedTasks 陣列展開後，再加上新的 task 元素，最後將其作為新的陣列賦值給 completedTasks。這裡之所以需要這樣寫，是因為在 React 中，為了實現可變性（Immutability），通常需要使用新的資料創建新的物件或陣列，而不是修改原本的物件或陣列。因此，在這個例子中，我們使用了展開運算符 ... 將 completedTasks 展開為一個新的陣列，再加上 task 元素，最後再將新的陣列賦值給 completedTasks。這樣可以保持 completedTasks 的不可變性，同時也可以觸發 React 的重新渲染。
    
    setTasks(newTasks);
    //在 setTasks(newTasks) 中，newTasks 是一個新的狀態值，只需要一個參數傳遞給 setTasks 函數即可。
    //而在 setCompletedTasks([...completedTasks, task]) 中，[...completedTasks, task] 是一個新的陣列，其中包含舊的 completedTasks 陣列的所有元素以及新完成的任務 task。因此需要使用 [...completedTasks, task] 這個新的陣列作為參數，來更新 completedTasks 的狀態值。
  }
  
  function handleUncheckTask(taskId) {
    const taskIndex = completedTasks.findIndex((task) => task.id === taskId);
    const task = completedTasks[taskIndex];
    const newCompletedTasks = [...completedTasks];
    newCompletedTasks.splice(taskIndex, 1);
    task.completed = false;
    setTasks([...tasks, task]);
    setCompletedTasks(newCompletedTasks);
  }
  
  
  function handleSubmit(e) {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      content: text,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    // clear the text input
    setText('');
  }

  function handleDeleteTask(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
    setCompletedTasks(completedTasks.filter((task) => task.id !== taskId));
  }

  function handleClearAll() {
    setTasks([]);
    setCompletedTasks([]);
  }

  return (
    <div className={ToDoListStyles.todolistSection}>
      <div className={ToDoListStyles.todoContainer}>
        <div className={ToDoListStyles.todoHeader}>
          <h1>My To-do List</h1>
        </div>
        <div className={ToDoListStyles.todoInputArea}>
        <form
          action=""
          className={ToDoListStyles.todoForm}
          onSubmit={handleSubmit}
          >
          <input type="text"
          className={ToDoListStyles.inputText}
          placeholder="在此輸入........" 
          value={text}
          onChange={handleInputChange}
          />
          <input
          type="submit"
          value="新增任務"
          className={ToDoListStyles.inputSubmit}
          />
        </form>
        </div>
        <div className={ToDoListStyles.taskListArea}>
          <ul className ={ToDoListStyles.commonList}>
            <h3 className={ToDoListStyles.noTesk}>未完成</h3>
            {tasks.map((task) => (
              <Template
                key={task.id}
                task={task}
                completeTask={handleCompleteTask}
                deleteTask={handleDeleteTask}
              />
            ))}
          </ul>
          <ul className={ToDoListStyles.commonList}>
            <h3 className={ToDoListStyles.noTesk}>已完成</h3>
            {completedTasks.map((task) => (
              <Template
              key={task.id}
              task={task}
              completeTask={handleCompleteTask}
              deleteTask={handleDeleteTask}
              uncheckTask={handleUncheckTask}
            />
            ))}
          </ul>
        </div>
        <button
          className={ToDoListStyles.finishedButton}
          onClick={handleClearAll}
        >
          清除全部
        </button>
      </div>
    </div>
  );
}


export default TodoList;
