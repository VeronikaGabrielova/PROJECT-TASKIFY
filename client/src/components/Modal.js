import { useState } from "react";
import { useCookies } from "react-cookie";

const Modal = ({ setShowModal, getData, mode, task }) => {
  const [cookies, setCookies, removeCookies] = useCookies(null);
  const editMode = mode === "edit" ? true : false;
  const [error, setError] = useState("");


  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date(),
  });

  const postData = async (e) => {
    e.preventDefault();
  
    // Is input filled
    if (!data.title) {
      setError("Title is required!");
      return; // stop function and stop sending form
    }
  
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        console.log("worked");
        setShowModal(false);
        getData();
      }
    } catch (err) {
      console.log("error");
    }
  };

  const editData = async (e) => {
    e.preventDefault();

        // Is input filled
        if (!data.title) {
          setError("Title is required!");
          return; // stop function and stop sending form
        }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        setShowModal(false);
        getData();
      }
    } catch (err) {
      console.error("err");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value || "",//solution for uncontrolled components
    }));
    console.log(data);
  };
  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task</h3>
          <button className="cross" onClick={() => setShowModal(false)}>
            X
          </button>
        </div>
        <form>
          <input
            required
            maxLength={30}
            placeholder="Your Task goes here!"
            name="title"
            value={data.title || ""}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="range">Drag To Select Your Current Progress</label>
          <input
            className="modal-progress"
            id="range"
            required
            type="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
            {error && <p className="auth-error">{error}</p>}
          <br />
          <input
            className={mode}
            type="submit"
            value="Submit"
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
