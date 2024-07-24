import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const TaskItem = ({ task }) => {
  const completeTask = async () => {
    const taskRef = doc(db, 'tasks', task.id);
    try {
      await updateDoc(taskRef, { completed: true });
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const revertTask = async () => {
    const taskRef = doc(db, 'tasks', task.id);
    try {
      await updateDoc(taskRef, { completed: false });
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const deleteTask = async () => {
    const taskRef = doc(db, 'tasks', task.id);
    try {
      await deleteDoc(taskRef);
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
