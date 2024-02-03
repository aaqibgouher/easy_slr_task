import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./middleware/PrivateRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import DasboardComponent from "./components/dashboard/DashboardComponent";
import ProjectComponent from "./components/dashboard/project/ProjectComponent";
import ProjectListComponent from "./components/dashboard/project/ProjectListComponent";
import TaskComponent from "./components/dashboard/task/TaskComponent";
import TaskListComponent from "./components/dashboard/task/TaskListComponent";
import AuthLayout from "./layouts/AuthLayout";
import RegisterComponent from "./components/auth/RegisterComponent";
import LoginComponent from "./components/auth/LoginComponent";
import SnackbarComponent from "./components/helper/SnackbarComponent";
import DialogComponent from "./components/helper/DialogComponent";
import TaskAddComponent from "./components/dashboard/task/TaskAddComponent";
import TaskEditComponent from "./components/dashboard/task/TaskEditComponent";
import UserComponent from "./components/dashboard/user/UserComponent";
import UserListComponent from "./components/dashboard/user/UserListComponent";
import ProfileComponent from "./components/dashboard/profile/ProfileComponent";
import ProfileDetailComponent from "./components/dashboard/profile/ProfileDetailComponent";

function App() {
  return (
    <>
      <Router>
        <DialogComponent />
        <SnackbarComponent />
        <Routes>
          {/* Auth routes */}
          <Route exact path="/" element={<PrivateRoute />}>
            <Route path="/" element={<DashboardLayout />}>
              <Route path="" element={<DasboardComponent />} />
              <Route path="user" element={<UserComponent />}>
                <Route path="" element={<UserListComponent />} />
              </Route>
              <Route path="project" element={<ProjectComponent />}>
                <Route path="" element={<ProjectListComponent />} />
                <Route path=":projectId" element={<TaskComponent />}>
                  <Route path="" element={<TaskListComponent />} />
                  <Route path="task" element={<TaskAddComponent />} />
                  <Route path="task/:taskId" element={<TaskEditComponent />} />
                </Route>
              </Route>
              <Route path="profile" element={<ProfileComponent />}>
                <Route path="" element={<ProfileDetailComponent />} />
              </Route>
            </Route>
          </Route>

          {/* Non Auth routes */}
          <Route path="/" element={<AuthLayout />}>
            <Route path="register" element={<RegisterComponent />} />
            <Route path="login" element={<LoginComponent />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
