"use client";

import { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { useAuth,AuthProvider } from '../auth/AuthContext';
import ProtectedRoute from '../auth/ProtectedRoute';
import LogoutButton from './components/LogoutButton';

const HomeContent = () => {
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const { user, loading } = useAuth(); // Get the user and loading state from the Auth context

  useEffect(() => {
    const q = query(collection(db, 'tasks'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const incomplete = [];
      const complete = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.completed) {
          complete.push({ id: doc.id, ...data });
        } else {
          incomplete.push({ id: doc.id, ...data });
        }
      });
      setIncompleteTasks(incomplete);
      setCompletedTasks(complete);
    });
    return () => unsubscribe();
  }, []);

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
            <TaskList tasks={incompleteTasks} />
          </div>
          <div className="w-1/2">
            <h2 className="text-2xl font-bold mb-2">Completed Tasks</h2>
            <TaskList tasks={completedTasks} />
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