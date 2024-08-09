"use client";

import { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import ProtectedRoute from '../auth/ProtectedRoute';
import LogoutButton from './components/LogoutButton';
import { AuthProvider, useAuth } from '../auth/AuthContext';

const HomeContent = () => {
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <div className="container p-4">
        <div className="text-center mb-4">
          <img src="/ToDoTitle.png" alt="TodoWizard Title" className="mx-auto w-48 h-auto" />
        </div>
        <div className="flex justify-end mb-4">
          {user && (
            <p className="text-lg font-semibold mr-4">
              Logged in as {user.type === 'github' ? user.name : 'Guest'}
            </p>
          )}
          <LogoutButton />
        </div>
        <TaskForm />
        <div className="flex">
          <div className="w-1/2">
            <h2 className="text-2xl font-bold mb-2">Incomplete Tasks</h2>
            <TaskList tasks={incompleteTasks} setTasks={setIncompleteTasks} />
          </div>
          <div className="w-1/2">
            <h2 className="text-2xl font-bold mb-2">Completed Tasks</h2>
            <TaskList tasks={completedTasks} setTasks={setCompletedTasks} />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

const Home = () => {
  return (
    <AuthProvider>
      <HomeContent />
    </AuthProvider>
  );
};

export default Home;
