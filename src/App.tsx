import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { RootState } from "./app/store";
import Loader from "./components/Loader";

function App() {
  const navigate = useNavigate();
  // redux state
  const { currentUser } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    if (currentUser?.userName) {
      if (currentUser?.userType === "user") {
        navigate("/tasks", { replace: true });
        
      } else {
        navigate("/users", { replace: true });
      }
    }else {
      navigate("/login", { replace: true });
    }
  }, [navigate, currentUser]);
  return <div className="App"><Loader/></div>;
}

export default App;
