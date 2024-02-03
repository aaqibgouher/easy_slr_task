import { GET_PROJECTS } from "../types";
import { GET_TASKS } from "../types";
import { GET_TASK } from "../types";
import { GET_USERS } from "../types";
import { GET_ASSIGNEES } from "../types";
import { GET_PROJECT } from "../types";
import { GET_ME } from "../types";
import { SET_TOKEN } from "../types";

const initialState = {
  me: null,
  token: null,
  projects: [],
  project: null,
  tasks: [],
  assignees: [],
  priorities: [
    { label: "High", value: "HIGH" },
    { label: "Medium", value: "MEDIUM" },
    { label: "Low", value: "LOW" },
  ],
  status: [
    { label: "Pending", value: "PENDING" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Done", value: "DONE" },
  ],
  task: null,
  users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case GET_ME:
      return {
        ...state,
        me: action.payload,
      };
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case GET_PROJECT:
      return {
        ...state,
        project: action.payload,
      };
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case GET_ASSIGNEES:
      return {
        ...state,
        assignees: action.payload,
      };
    case GET_TASK:
      return {
        ...state,
        task: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
