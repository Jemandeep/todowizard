import { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useAuth } from '../../auth/AuthContext';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, setTasks }) => {
  const { user } = useAuth();

  useEffect(() => {
    console.log("User in TaskList useEffect:", user);

    let unsubscribe;
    if (user && user.type === 'guest') {
      const q = query(collection(db, 'guestTasks'));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const tasksData = [];
        querySnapshot.forEach((doc) => {
          tasksData.push({ id: doc.id, ...doc.data() });
        });
        console.log("Guest tasks data:", tasksData);
        setTasks(tasksData);
      });
    } else if (user) {
      const q = query(collection(db, 'users', user.uid, 'tasks'));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const tasksData = [];
        querySnapshot.forEach((doc) => {
          tasksData.push({ id: doc.id, ...doc.data() });
        });
        console.log("User tasks data:", tasksData);
        setTasks(tasksData);
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, setTasks]);

  console.log("Tasks in TaskList:", tasks);

  return (
    <div>
      {tasks && tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
