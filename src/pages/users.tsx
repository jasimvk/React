import { useEffect, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { addNewUser } from "../features/user/allUsersSlice";
import { addCurrentUser } from "../features/user/userSlice";
import Loader from "../components/Loader"
const Users = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state: RootState) => state.user);
  const { allUsers } = useAppSelector((state: RootState) => state.allUsers);
  const [userPopup, setUserPopup] = useState(false);
  const [activeUser, setActiveUser] = useState("");
  //check for the authentication
  //user page is only available for admin type users
  useEffect(() => {
    if (currentUser?.userName) {
      if (currentUser?.userType === "user") {
        navigate("/tasks", { replace: true });
      }
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate, currentUser]);

  const editUser = (source: any) => {
    setActiveUser(source);
    setUserPopup(true);
  };
  useEffect(()=>{
    toast.success( 'Welcome ' +  currentUser?.userName)
  },[])
  const deleteUser = (id: number) => {
    let dup = [...allUsers];
    dup = dup.filter((user) => user.id !== id);
    // push to the store
    dispatch(addNewUser(dup));
  };

  const handleActive = (_user: any, value: boolean) => {
    let dup = [...allUsers];
    let obj: any = {};
    obj = { ...dup.find((user) => user.id === _user.id) };
    if (obj) obj.active = value;
    dup = dup.filter((user) => user.id !== _user.id);
    dup.push(obj)
    dispatch(addNewUser(dup));
  }
  console.log('%c Test value is -------------', 'background: #fff; padding:2px 5px; color: red', allUsers)
  return (
    <>
      <header className="flex items-center justify-between p-6">
        <div className="flex items-center">
          {<Link to="/tasks">Tasks</Link>}
        </div>
        <button
          className="focus:ring-2 ml-auto focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 px-8"
          onClick={() => {
            dispatch(addCurrentUser({}));
            navigate("/login");
          }}
        >
          Logout
        </button>
      </header>

      {/* //page logic */}
      <div className="container mx-auto">
        <div className="lg:ml-6 flex items-center justify-end">
          <button
            onClick={() => {
              setActiveUser("");
              setUserPopup(true);
            }}
            className="bg-gray-200 transition duration-150 ease-in-out focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray hover:bg-gray-300 rounded text-indigo-700 px-5 h-8 flex items-center text-sm"
          >
            Create User
          </button>
        </div>
        <h1 className="text-xl mb-8 mt-12 font-semibold">All Users</h1>
        <div className="w-full overflow-x-scroll xl:overflow-x-hidden">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="w-full h-16 border-gray-300 border-b py-8">
                <th className="pl-6 text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                  ID
                </th>
                <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                  Username
                </th>
                <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                  User Type
                </th>
                <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                  Active Status
                </th>
                <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                  Create Date
                </th>
                <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                  Activation Date
                </th>
                <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                  deActivation Date
                </th>
                <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                  Updated Date
                </th>
                <th className="text-gray-600 text-end font-normal pr-10 text-sm tracking-normal leading-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {allUsers.length === 0 && <Loader />} */}
              {allUsers.length !== 0 && allUsers.map((user, idx) => (
                <tr className="h-24 border-gray-300 border-b" key={idx}>
                  <td className="text-sm pl-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                    {user?.id}
                  </td>
                  <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                    {user.userName}
                  </td>
                  <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                    {user.userType}
                  </td>
                  <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                    <div className="cursor-pointer my-5 rounded-full bg-gray-200 w-12 relative shadow-sm">
                      <input onChange={(e) => handleActive(user, e.target.checked)} checked={user.active} type="checkbox" name={`${user.id}`} id={`${user.id}`} className="focus:outline-none checkbox w-6 h-6 rounded-full bg-white absolute shadow-sm border appearance-none cursor-pointer top-0 bottom-0 m-auto" />
                      <label htmlFor="toggle1" className="toggle-label dark:bg-gray-700 block w-12 h-4 overflow-hidden rounded-full bg-gray-300 cursor-pointer" />
                    </div>
                  </td>
                  <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                    {user.createDate ? user.createDate : "N/A"}
                  </td>
                  <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                    {user.activationDate ? user.activationDate : "N/A"}
                  </td>
                  <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                    {user.deActivationDate ? user.deActivationDate : "N/A"}
                  </td>
                  <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                    {user.updatedDate ? user.updatedDate : "N/A"}
                  </td>
                  {/* Edit and delete */}
                  <td className="pr-8  w-32">
                    <div className="flex items-center relative">
                      <p
                        className="cursor-pointer"
                        onClick={() => editUser(user)}
                      >
                        Edit
                      </p>
                      <p className="cursor-pointer ml-4" onClick={() => deleteUser(user.id)}>Delete</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* user add/edit modal */}
      {userPopup && (
        <UserPopup
          allUsers={allUsers}
          setUserPopup={setUserPopup}
          activeUser={activeUser}
        />
      )}
      <style>
        {`.checkbox:checked {
          /* Apply class right-0*/
          right: 0;
      }
      .checkbox:checked + .toggle-label {
          /* Apply class bg-indigo-700 */
          background-color: #4c51bf;
      }`}
      </style>
    </>
  );
};
export default Users;

const UserPopup = ({
  allUsers,
  setUserPopup,
  activeUser,
}: {
  allUsers: any;
  setUserPopup: any;
  activeUser: any;
}) => {
  const [formData, setFormData] = useState({
    id: "",
    userName: "",
    active: false,
    userType: "user",
    activeStatus: "",
    createDate: "",
    activationDate: "",
    deActivationDate: "",
    updatedDate: "",
    password: "",
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (activeUser) {
      setFormData(activeUser);
    }
  }, [activeUser]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // to update user
    if (activeUser) {
      let dup = [...allUsers];
      dup = dup.filter((user) => user.id !== activeUser.id);
      formData.active = false;
      dup.push(formData);
      dup.reverse();
      // push to the store
      dispatch(addNewUser(dup));
      setUserPopup(false);
    } else {
      // adding
      let dup = [...allUsers];
      formData.active = false;
      dup.push(formData);
      // reverse function is for stacking on top
      dup.reverse();
      dispatch(addNewUser(dup));
      setUserPopup(false);
    }
  };
  const userTypes = ["user", "admin"];
  return (
    <div className="max-w-md m-auto my-16 absolute w-full shadow-lg rounded-md inset-0 z-20 bg-white p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg">Create User</h2>
        <div onClick={() => setUserPopup(false)} className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            fill="currentColor"
            className="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </div>
      </div>
      {/* onsubmit handler */}
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="my-4">
          <label>
            ID
            <input
              required
              className="border-gray-300 rounded border p-2 ml-4"
              type="text"
              value={formData?.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            />
          </label>
        </div>
        <div className="my-4">
          <label>
            Username
            <input
              required
              className="border-gray-300 rounded border p-2 ml-4"
              type="text"
              value={formData?.userName}
              onChange={(e) =>
                setFormData({ ...formData, userName: e.target.value })
              }
            />
          </label>
        </div>
        <div className="my-4">
          <label>
            Password
            <input
              required
              className="border-gray-300 rounded border p-2 ml-4"
              type="text"
              value={formData?.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </label>
        </div>
        <div className="my-4">
          User Type
          <select
            defaultValue={formData?.userType}
            required
            className="border border-gray-300 p-2 rounded ml-4 px-4 w-[195px]"
            onChange={(e) =>
              setFormData({ ...formData, userType: e.target.value })
            }
          >
            {userTypes.map((type: string) => {
              return (
                <option className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                  {type}
                </option>
              );
            })}
          </select>
        </div>
        <div className="my-4">
          <label>
            Create Date
            <input
              className="border-gray-300 rounded border p-2 ml-4"
              type="text"
              value={formData?.createDate}
              onChange={(e) =>
                setFormData({ ...formData, createDate: e.target.value })
              }
            />
          </label>
        </div>
        <div className="my-4">
          <label>
            Activation Date
            <input
              className="border-gray-300 rounded border p-2 ml-4"
              type="text"
              value={formData?.activationDate}
              onChange={(e) =>
                setFormData({ ...formData, activationDate: e.target.value })
              }
            />
          </label>
        </div>
        <div className="my-4">
          <label>
            De-Activation Date
            <input
              className="border-gray-300 rounded border p-2 ml-4"
              type="text"
              value={formData?.deActivationDate}
              onChange={(e) =>
                setFormData({ ...formData, deActivationDate: e.target.value })
              }
            />
          </label>
        </div>
        <div className="my-4">
          <label>
            Updated Date
            <input
              className="border-gray-300 rounded border p-2 ml-4"
              type="text"
              value={formData?.updatedDate}
              onChange={(e) =>
                setFormData({ ...formData, updatedDate: e.target.value })
              }
            />
          </label>
        </div>
        <button
          type="submit"
          className=" absolute bottom-6 right-6 ml-auto mr-6 bg-gray-200 transition duration-150 ease-in-out focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray hover:bg-gray-300 rounded text-indigo-700 px-5 h-8 flex items-center text-sm"
        >
          Continue
        </button>
      </form>
    </div>
  );
};