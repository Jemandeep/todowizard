import TaskItem from './TaskItem';

const TaskList = ({ tasks, deleteTask, completeTask, revertTask, isCompleted }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={() => deleteTask(task.id, isCompleted)}
          completeTask={completeTask ? () => completeTask(task.id) : null}
          revertTask={revertTask ? () => revertTask(task.id) : null}
          isCompleted={isCompleted}
        />
      ))}
    </div>
  );
};

export default TaskList;
