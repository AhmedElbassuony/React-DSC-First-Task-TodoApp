import './App.css'
import { createContext, useReducer } from "react";


const initialTodos = {
  filter: "All",
  data: [{
    task: "Task 1",
    done: false
  }, {
    task: "Task 2",
    done: true
  }, {
    task: "Task 3",
    done: false
  }
  ]
};
const reducer = (state, action) => {
  switch (action.type) {
    case "toggle":
      return {
        ...state, data: state.data.map((task, index) => {
          if (index === action.idx) {
            return { ...task, done: !task.done }
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
  return (
    <TaskProvider.Provider value={{ tasks: tasks, dispatch: dispatch }}>

    </TaskProvider.Provider>
  )
}

export default App
