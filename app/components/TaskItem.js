const TaskItem = ({ task, deleteTask, completeTask, revertTask, isCompleted }) => {
    return (
      <div className={`border p-2 my-2 rounded ${isCompleted ? 'bg-green-100' : ''}`}>
        <h3 className="text-xl">{task.title}</h3>
        <p>{task.description}</p>
        {!isCompleted && (
          <button
            className="bg-green-500 text-white px-2 py-1 rounded"
            onClick={completeTask}
          >
            Complete
          </button>
        )}
        {isCompleted && (
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
  