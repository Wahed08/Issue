import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ErrorModal = ({ error }) => {
  const customId = "";

  return (
    <div>
      {toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: false,
        toastId: customId,
      })}
      <ToastContainer
        style={{ width: "300px", marginTop: "80px", Color: "red" }}
      />
    </div>
  );
};

export default ErrorModal;
