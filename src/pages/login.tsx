import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { toast } from "react-toastify";
import { addCurrentUser } from "../features/user/userSlice";
import { loggedIn } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
type Person = {
  userName: string;
  password: string;
  active: boolean;
  userType: string;
  createDate: string;
  activationDate: string;
  deActivationDate: string;
  updatedDate: string;
};

const Login = () => {
  // let navigate=useNavigate();
  const [isUserNameFound, setIsUserNameFound] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>();
  const [name, setName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state: RootState) => state.user);
  const { allUsers } = useAppSelector((state: RootState) => state.allUsers);

  // console.log("user",currentUser)

  useEffect(() => {
    if (currentUser?.userName) {
      if (currentUser?.userType === "user") {
        navigate("/tasks", { replace: true });
      } else {
        navigate("/users", { replace: true });
      }
    }
  }, [navigate,currentUser]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let user = allUsers.find((user) => user.userName === userName);
    if (user) {
      setIsUserNameFound(true);
      setName(user.userName);
    } else toast.error("username is incorrect");
    if (password) {
      let user = allUsers.find((user) => user.password === password);
      if (user) {
        dispatch(loggedIn());
        dispatch(addCurrentUser(user));
        user.userType === "user"
          ? (window.location.href = "/tasks")
          : (window.location.href = "/users");
      } else toast.error("password is incorrect");
    }
  };
  return (
    <section className="bg-indigo-600 {-- h-screen --}">
      <div className="mx-auto flex justify-center lg:items-center h-full">
        <form
          className="w-full sm:w-4/6 md:w-3/6 lg:w-4/12 xl:w-3/12 text-white px-2 sm:px-0"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className=" flex flex-col items-center justify-center">
            {isUserNameFound && (
              <h3 className="text-2xl sm:text-3xl xl:text-2xl font-bold leading-tight">
                Welcome {name && name}
              </h3>
            )}
            <h3 className="text-2xl sm:text-3xl xl:text-2xl font-bold ">
              Please enter your{" "}
              {isUserNameFound ? "password to login" : "username to continue"} .
            </h3>
          </div>
          <div className="mt-12 w-full px-2 sm:px-6">
            <div className="flex flex-col mt-5">
              <label
                htmlFor="Username"
                className="text-lg font-semibold leading-tight"
              >
                Username
              </label>
              <input
                onChange={(e) => setUserName(e.target.value)}
                // required
                id="Username"
                required
                value={userName}
                name="username"
                className="h-10 px-2 w-full text-black bg-white border border-indigo-700 rounded mt-2 focus:outline-none shadow"
                type="text"
              />
            </div>
            {isUserNameFound && (
              <div className="flex flex-col mt-5">
                <label
                  htmlFor="password"
                  className="text-lg font-semibold leading-tight"
                >
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  value={password}
                  id="password"
                  name="password"
                  className="h-10 px-2 w-full text-black bg-white border border-indigo-700  rounded mt-2 focus:outline-none shadow"
                  type="password"
                />
              </div>
            )}
          </div>
          <div className="px-2 sm:px-6 flex justify-end">
            <button
              type="submit"
              disabled={userName?.length ? false : true}
              className="focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-50 bg-white transition duration-150 ease-in-out hover:bg-gray-200 rounded text-indigo-600 px-8 py-3 text-sm mt-6"
            >
              {isUserNameFound ? "Login" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
export default Login;