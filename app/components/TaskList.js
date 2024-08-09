import { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useAuth } from '../../auth/AuthContext';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, setTasks }) => {
  const { user } = useAuth();

  useEffect(() => {
    let unsubscribe;
    if (user && user.type === 'guest') {
      // Fetch tasks from guestTasks collection
      const q = query(collection(db, 'guestTasks'));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const tasksData = [];
        querySnapshot.forEach((doc) => {
          tasksData.push({ id: doc.id, ...doc.data() });
        });
        setTasks(tasksData);
      });
    } else if (user) {
      // Fetch tasks from user-specific tasks collection
      const q = query(collection(db, 'users', user.uid, 'tasks'));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const tasksData = [];
        querySnapshot.forEach((doc) => {
          tasksData.push({ id: doc.id, ...doc.data() });
        });
        setTasks(tasksData);
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, setTasks]);

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
