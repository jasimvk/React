import { createSlice } from "@reduxjs/toolkit";

export interface allTasksState {
  allTasks: Task[];
}
type Task = {
  id: string;
  task_name: string;
  task_date: string;
  actions: { label: string; value: string }[];
};
const initialState: allTasksState = {
  allTasks: [
    {
      id: "1",
      task_name: "Task 1",
      task_date: "Mon 08/08/2022",
      actions: [
        {
          label: "Going to the park",
          value: "Going to the park",
        },
        {
          label: "Finish Homework",
          value: "Finish Homework",
        },
        {
          label: "Call My Father",
          value: "Call My Father",
        },
        {
          label: "Bring gift to my sister birthday",
          value: "Bring gift to my sister birthday",
        },
      ],
    },
    {
      id: "2",
      task_name: "Task 1",
      task_date: "Mon 08/08/2022",
      actions: [
        {
          label: "Going to the park",
          value: "Going to the park",
        },
        {
          label: "Finish Homework",
          value: "Finish Homework",
        },
        {
          label: "Call My Father",
          value: "Call My Father",
        },
        {
          label: "Bring gift to my sister birthday",
          value: "Bring gift to my sister birthday",
        },
      ],
    },
  ],
};

export const allTasksSlice = createSlice({
  name: "allTasks",
  initialState,
  reducers: {
    addNewTask: (state, action) => {
      state.allTasks = action.payload;
    },
  },
});

export const { addNewTask } = allTasksSlice.actions;
export default allTasksSlice.reducer;

