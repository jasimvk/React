import { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { addNewTask } from "../features/user/allTasksSlice";
import { addCurrentUser } from "../features/user/userSlice";
import { Link } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
const Tasks = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state: RootState) => state.user);
  const { allTasks } = useAppSelector((state: RootState) => state.allTasks);
  const [taskPopup, setTaskPopup] = useState(false);
  const [activeTask, setActiveTask] = useState("");
  const [tasks, setTasks] = useState<{ id: string, task_name: string, task_date: string, actions: { label: string, value: string }[] }[]>([])
  //on first load pull the data and store it
  useEffect(() => {
    setTasks(allTasks)
  }, [allTasks])
  useEffect(() => {
    if (currentUser?.userName) {
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate, currentUser]);
  useEffect(()=>{
    toast.success( 'Welcome ' +  currentUser?.userName)
  },[])
  const deleteTask = (id: string) => {
    let dup = [...allTasks];
    dup = dup.filter((task) => task.id !== id);
    dispatch(addNewTask(dup));
  };

  const editTask = (task: any) => {
    setActiveTask(task);
    setTaskPopup(true);
  };
  // a little function to help us with reordering the result
  const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const grid = 8;

  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "#eee" : "white",

    // styles we need to apply on draggables
    ...draggableStyle
  });

  const getListStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? "lightblue" : "white",
    padding: grid,
    width: "100%"
  });

  function onDragEnd(result: any) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items: any = reorder(
      tasks,
      result.source.index,
      result.destination.index
    );

    setTasks(items)
  }

  return (
    <>
      <>
        <header className="flex items-center justify-between p-6">
          {currentUser?.userType !== "user" && <Link to="/users">Users</Link>}
          <button
            className="focus:ring-2 ml-auto focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 px-8"
            onClick={() => {
              dispatch(addCurrentUser({}));
              dispatch(addNewTask([]))
              navigate("/login");
            }}
          >
            Logout
          </button>
        </header>
        <div className="container mx-auto">
          <div className="lg:ml-6 flex items-center justify-end">
            <button
              onClick={() => {
                setActiveTask("");
                setTaskPopup(true);
              }}
              className="bg-gray-200 transition duration-150 ease-in-out focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray hover:bg-gray-300 rounded text-indigo-700 px-5 h-8 flex items-center text-sm"
            >
              Create Task
            </button>
          </div>
          <h1 className="text-xl mb-8 mt-12 font-semibold">Create task</h1>
          <div className="w-full overflow-x-scroll xl:overflow-x-hidden">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full h-16 border-gray-300 border-b py-8">
                  <th className="pl-6 text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    ID
                  </th>
                  <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    Task name
                  </th>
                  <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    Task date
                  </th>
                  <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    Task
                  </th>
                  <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided: any, snapshot: any) => (
                    <tbody
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                       {/* {tasks.length === 0 && <Loader />} */}
                      {tasks.length>0&&tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided: any, snapshot: any) => (
                            <tr
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )} className="h-24 border-gray-300 border-b">
                              <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                                {task.id}
                              </td>
                              <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                                {task.task_name}
                              </td>
                              <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                                {task.task_date}
                              </td>
                              <td className="pr-8 relative ">
                                {
                                  task.actions.map((action) => `${action.value}, `)
                                }
                              </td>
                              <td className="pr-8  w-32">
                                <div className="flex items-center relative">
                                  <p
                                    className="cursor-pointer"
                                    onClick={() => editTask(task)}
                                  >
                                    Edit
                                  </p>
                                  <p
                                    className="cursor-pointer ml-4"
                                    onClick={() => deleteTask(task.id)}
                                  >
                                    Delete
                                  </p>
                                </div>
                              </td>
                            </tr>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </tbody>
                  )}
                </Droppable>
              </DragDropContext>
              <tbody>
              </tbody>
            </table>
          </div>
        </div>
      </>
      {taskPopup && (
        <TaskPopup
          allTasks={allTasks}
          setTaskPopup={setTaskPopup}
          activeTask={activeTask}
        />
      )}
    </>
  );
};
export default Tasks;

const TaskPopup = ({
  allTasks,
  setTaskPopup,
  activeTask,
}: {
  allTasks: any;
  setTaskPopup: any;
  activeTask: any;
}) => {
  const [formData, setFormData] = useState({
    task_name: "",
    id: "",
    task_date: "",
    actions: [],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeTask) {
      setFormData(activeTask);
    }
  }, [activeTask]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (activeTask) {
      let dup = [...allTasks];
      dup = dup.filter((task) => task.id !== activeTask.id);
      dup.push(formData);
      dup.reverse();
      dispatch(addNewTask(dup));
      setTaskPopup(false);
    } else {
      let dup = [...allTasks];
      dup.push(formData);
      dup.reverse();
      dispatch(addNewTask(dup));
      setTaskPopup(false);
    }
  };
  const actions = [
    {
      label: "Going to the park",
      value: "Going to the park"
    },
    {
      label: "Finish Homework",
      value: "Finish Homework"
    },
    {
      label: "Call My Father",
      value: "Call My Father"
    },
    {
      label: "Bring gift to my sister birthday",
      value: "Bring gift to my sister birthday"
    },
  ];
  const handleSelectMultiple = (selected: any) => {
    setFormData({ ...formData, actions: selected })
  }
  return (
    <div className="max-w-md m-auto my-16 absolute w-full shadow-lg rounded-md inset-0 z-20 bg-white p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg">Create Task</h2>
        <div onClick={() => setTaskPopup(false)} className="cursor-pointer">
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
            Name
            <input
              required
              className="border-gray-300 rounded border p-2 ml-4"
              type="text"
              value={formData?.task_name}
              onChange={(e) =>
                setFormData({ ...formData, task_name: e.target.value })
              }
            />
          </label>
        </div>
        <div className="my-4">
          <label>
            Date
            <input
              required
              className="border-gray-300 rounded border p-2 ml-4"
              type="text"
              value={formData?.task_date}
              onChange={(e) =>
                setFormData({ ...formData, task_date: e.target.value })
              }
            />
          </label>
        </div>
        <div className="my-4">
          Action
          <MultiSelect
            options={actions}
            value={formData?.actions}
            onChange={handleSelectMultiple}
            labelledBy="Select"
          />
          {/* <select
            defaultValue={formData?.action}
            required
            className="border border-gray-300 p-2 rounded ml-4"
            onChange={(e) =>
              setFormData({ ...formData, action: e.target.value })
            }
          >
            {actions.map((action: string) => {
              return (
                <option className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                  {action}
                </option>
              );
            })}
          </select> */}
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