


import { useParams } from "react-router-dom";
import AddForm from "./AddForm";

const AddFormWrapper = () => {
  const { type, id } = useParams(); // Grab both type and optional id

  // Validate type to avoid invalid routes
  const validTypes = ["stack", "category", "sub-category"];
  if (!validTypes.includes(type)) {
    return <h2>Invalid type</h2>;
  }

  const mode = id ? "edit" : "add"; // If id exists -> edit mode

  return <AddForm type={type} mode={mode} itemId={id} />;
};

export default AddFormWrapper;
