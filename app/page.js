"use client";

import { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const Home = () => {
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const addTask = (task) => {
    setIncompleteTasks([...incompleteTasks, { ...task, id: incompleteTasks.length + 1 }]);
  };

  const deleteTask = (id, isCompleted) => {
    if (isCompleted) {
      setCompletedTasks(completedTasks.filter(task => task.id !== id));
    } else {
      setIncompleteTasks(incompleteTasks.filter(task => task.id !== id));
    }
  };

  const completeTask = (id) => {
    const taskToComplete = incompleteTasks.find(task => task.id === id);
    setCompletedTasks([...completedTasks, { ...taskToComplete }]);
    setIncompleteTasks(incompleteTasks.filter(task => task.id !== id));
  };

  const revertTask = (id) => {
    const taskToRevert = completedTasks.find(task => task.id === id);
    setIncompleteTasks([...incompleteTasks, { ...taskToRevert }]);
    setCompletedTasks(completedTasks.filter(task => task.id !== id));
  };

  return (
    <div className="container p-4">
      <div className="text-center mb-4">
        <img src="/ToDoTitle.png" alt="TodoWizard Title" className="mx-auto w-48 h-auto"/>
      </div>
      <TaskForm addTask={addTask} />
      <div className="flex">
        <div className="w-1/2">
          <h2 className="text-2xl font-bold mb-2">Incomplete Tasks</h2>
          <TaskList tasks={incompleteTasks} deleteTask={deleteTask} completeTask={completeTask} isCompleted={false} />
        </div>
        <div className="w-1/2">
          <h2 className="text-2xl font-bold mb-2">Completed Tasks</h2>
          <TaskList tasks={completedTasks} deleteTask={deleteTask} revertTask={revertTask} isCompleted={true} />
        </div>
      </div>
    </div>
  );
};

export default Home;
