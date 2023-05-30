import "./scss/main.scss";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

const App = () => {
  const [cookies, setCookies, removeCookies] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;
  const [tasks, setTasks] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`);
      const json = await response.json();
      setTasks(json);
    } catch (err) {
      console.log("Error");
    }
  };
  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);
  console.log(tasks);
  //sort by day
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader listName={" 🗒️ TASKIFY"} getData={getData} />
          <p className="welcome">
            Welcome back <span className="welcome-user">{userEmail}</span>
          </p>
          <div className="card-container">
            {sortedTasks?.map((task) => (
              <ListItem key={task.id} task={task} getData={getData} />
            ))}
          </div>
        </>
      )}
      <p className="copyright">Create by Veronika Gabrielová</p>
    </div>
  );
};

export default App;
