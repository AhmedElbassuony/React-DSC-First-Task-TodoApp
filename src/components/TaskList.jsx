import { useContext } from "react"
import { TaskProvider } from "../App"



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
    <ul>
      {
        data.map((task, idx) => (<li key={idx}>{task.task}</li>))
      }
    </ul>
  )
};


export default TaskList;