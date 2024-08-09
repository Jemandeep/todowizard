import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useAuth } from '../../auth/AuthContext';

const TaskItem = ({ task }) => {
  const { user } = useAuth();

  console.log("Rendering TaskItem:", task);

  const completeTask = async () => {
    const taskRef = user && user.type === 'guest' 
      ? doc(db, 'guestTasks', task.id) 
      : doc(db, 'users', user.uid, 'tasks', task.id);
    try {
      await updateDoc(taskRef, { completed: true });
      console.log("Task marked as completed: ", task.id);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const revertTask = async () => {
    const taskRef = user && user.type === 'guest' 
      ? doc(db, 'guestTasks', task.id) 
      : doc(db, 'users', user.uid, 'tasks', task.id);
    try {
      await updateDoc(taskRef, { completed: false });
      console.log("Task marked as incomplete: ", task.id);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const deleteTask = async () => {
    const taskRef = user && user.type === 'guest' 
      ? doc(db, 'guestTasks', task.id) 
      : doc(db, 'users', user.uid, 'tasks', task.id);
    try {
      await deleteDoc(taskRef);
      console.log("Task deleted: ", task.id);
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  return (
    <div className={`border p-2 my-2 rounded ${task.completed ? 'bg-green-100' : ''}`}>
      <h3 className="text-xl">{task.title}</h3>
      <p>{task.description}</p>
      {!task.completed && (
        <button
          className="bg-green-500 text-white px-2 py-1 rounded"
          onClick={completeTask}
        >
          Complete
        </button>
      )}
      {task.completed && (
        <button
          className="bg-yellow-500 text-white px-2 py-1 rounded ml-2"
          onClick={revertTask}
        >
          Revert
        </button>
      )}
      <button
        className="bg-red-500 text-white px-2 py-1 rounded ml-2"
        onClick={deleteTask}
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
