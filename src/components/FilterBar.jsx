import { useContext } from "react"
import { TaskProvider } from "../App";

const FilterBar = () => {
  const { tasks, dispatch } = useContext(TaskProvider);

  return (
    <div className="filter-bar">
      <button className={tasks.filter === "All" ? "active" : ""} onClick={() => dispatch({ type: "All" })}>All</button>
      <button className={tasks.filter === "Pending" ? "active" : ""} onClick={() => dispatch({ type: "Pending" })}>Pending</button>
      <button className={tasks.filter === "Complete" ? "active" : ""} onClick={() => dispatch({ type: "Complete" })}>Complete</button>
    </div>
  )


};

export default FilterBar;