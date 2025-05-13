import { createContext, useReducer, useState } from "react";
import TaskList from "./components/TaskList";
import DateRepresenter from "./components/DateRepresenter";
import FilterBar from "./components/FilterBar";
import { Dialog } from '@headlessui/react'
const initialTodos = {
  filter: "All",
  data: [{
    id: 0,
    task: "Task 1",
    done: false
  }, {
    id: 1,
    task: "Task 2",
    done: true
  }, {
    id: 2,
    task: "Task 3",
    done: false
  }
  ]
};
const reducer = (state, action) => {
  switch (action.type) {
    case "toggle":
      return {
        ...state, data: state.data.map((task) => {
          if (task.id === action.idx) {
            return { ...task, done: !task.done }
          }
          return task;
        })
      }
    case "remove":
      return {
        ...state, data: state.data.filter((task) => task.id !== action.idx)
      }
    case "create":
      return {
        ...state, data: [...state.data, action.task]
      }
    case "edit":
      return {
        ...state, data: state.data.map((task) => {
          if (task.id === action.task.id) {
            return { ...task, task: action.task.task }
          }
          return task;
        })
      }
    case "All":
      return { ...state, filter: "All" };
    case "Pending":
      return { ...state, filter: "Pending" };
    case "Complete":
      return { ...state, filter: "Complete" };
    default:
      return state;
  }
};

export const TaskProvider = createContext();


function App() {
  const [tasks, dispatch] = useReducer(reducer, initialTodos);


  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState({ id: 0, task: "", done: false });
  const [error, setError] = useState("");

  const close = () => { setIsOpen(false) };
  const open = () => {
    setError("");
    setTask({
      id: tasks.data.length,
      task: "",
      done: false,
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
    dispatch({ type: "create", task: task });
    close();
  }

  return (
    <TaskProvider.Provider value={{ tasks: tasks, dispatch: dispatch }}>
      <h1>Tasks</h1>
      <h4><DateRepresenter /></h4>
      <div className="search">
        <input type="search" />
        <button>Search</button>
      </div>
      <div style={{ textAlign: "right" }}><FilterBar /></div>
      <TaskList />
      <button className="open" onClick={open}>+</button>
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
    </TaskProvider.Provider>
  )
}

export default App
