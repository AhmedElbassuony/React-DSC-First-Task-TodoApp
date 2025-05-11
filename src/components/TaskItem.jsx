import { useContext } from "react"
import { TaskProvider } from "../App";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const TaskItem = ({ task, done, id }) => {
  const { dispatch } = useContext(TaskProvider);


  const onCheck = () => {
    dispatch({ type: "toggle", idx: id });
  }
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      margin: "10px",
      backgroundColor: "#4b4b4b",
      borderRadius: "10px",
      padding: "10px"
    }}>
      <input type="checkbox" checked={done} onChange={onCheck} />
      <p>{task}</p>
      <button className="edit"><FaRegEdit /></button>
      <button className="delete" onClick={() => dispatch({ type: "remove", idx: id })}><RiDeleteBin6Line /></button>
    </div>
  )
};

export default TaskItem;