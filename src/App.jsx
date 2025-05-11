import { createContext, useReducer } from "react";
import TaskList from "./components/TaskList";
import DateRepresenter from "./components/DateRepresenter";
import FilterBar from "./components/FilterBar";
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
  return (
    <TaskProvider.Provider value={{ tasks: tasks, dispatch: dispatch }}>
      <h1>Tasks</h1>
      <h4><DateRepresenter /></h4>
      <div style={{ textAlign: "right" }}><FilterBar /></div>
      <TaskList />
    </TaskProvider.Provider>
  )
}

export default App
