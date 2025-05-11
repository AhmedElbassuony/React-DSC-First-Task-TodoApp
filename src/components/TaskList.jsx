import { useContext } from "react"
import { TaskProvider } from "../App"
import TaskItem from "./TaskItem";



const TaskList = () => {
  const { tasks } = useContext(TaskProvider);
  let data;
  switch (tasks.filter) {
    case "All":
      data = tasks.data;
      break;
    case "Pending":
      data = tasks.data.filter((task) => task.done === false);
      break;
    case "Complete":
      data = tasks.data.filter((task) => task.done === true);
      break;
    default:
      data = tasks.data.filter((task) => task.task.include(tasks.filter));;
      break;
  }
  return (
    <div>
      {
        data.map(({ task, done, id }) => (<TaskItem key={id} id={id} task={task} done={done} />))
      }
    </div>
  )
};


export default TaskList;