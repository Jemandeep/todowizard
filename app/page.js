"use client";

import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import ProtectedRoute from '../auth/ProtectedRoute';
import LogoutButton from './components/LogoutButton';
import { AuthProvider, useAuth } from '../auth/AuthContext';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const HomeContent = () => {
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const { user, loading } = useAuth();

  useEffect(() => {
    let unsubscribe;
    if (user && user.type === 'guest') {
      const q = query(collection(db, 'guestTasks'));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
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
    } else if (user) {
      const q = query(collection(db, 'users', user.uid, 'tasks'));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
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
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

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
