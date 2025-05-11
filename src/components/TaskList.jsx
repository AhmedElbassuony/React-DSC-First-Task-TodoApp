import { useContext, useState } from "react"
import { TaskProvider } from "../App"
import TaskItem from "./TaskItem";
import { Dialog } from '@headlessui/react'


const TaskList = () => {
  const { tasks, dispatch } = useContext(TaskProvider);


  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState({ id: 0, task: "", done: false });
  const [error, setError] = useState("");

  const close = () => { setIsOpen(false) };
  const open = (id, task, done) => {
    setError("");
    setTask({
      id: id,
      task: task,
      done: done,
    })
    setIsOpen(true)
  };
  const changeHandler = (e) => {
    setError("");
    setTask({
      ...task,
      task: e.target.value
    })
  }
  const submitHandler = (e) => {
    e.preventDefault();
    if (task.task.trim() === "") {
      setError("Task Can't Be Empty!");
      return
    }
    dispatch({ type: "edit", task: task });
    close();
  }


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
        data.map(({ task, done, id }) => (<TaskItem key={id} id={id} task={task} done={done} open={open} />))
      }
      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
        <form onSubmit={submitHandler}>
          <h1>Create New Task</h1>
          <div>
            <input type="text" name="task" value={task.task} onChange={changeHandler} />
            <button>Add Task</button>
          </div>
          {error ? (<p className="error">{error}</p>) : null}
        </form>
      </Dialog>
    </div>
  )
};


export default TaskList;