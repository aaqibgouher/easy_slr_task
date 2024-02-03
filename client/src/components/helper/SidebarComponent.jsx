import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../actions/userAction";

const drawerWidth = 240;

const SidebarComponent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [bars, setBars] = useState([
    { id: 1, name: "Dashboard", target: "", icon: "", value: "DASHBOARD" },
    { id: 1, name: "Users", target: "user", icon: "", value: "USERS" },
    { id: 2, name: "Projects", target: "project", icon: "", value: "PROJECTS" },
    { id: 3, name: "Profile", target: "profile", icon: "", value: "PROFILE" },
    { id: 3, name: "Logout", target: "logout", icon: "", value: "LOGOUT" },
  ]);
  const navigate = useNavigate();
  const meState = useSelector((state) => state.userReducer.me);

  const handleBar = async (bar) => {
    switch (bar) {
      case "DASHBOARD":
        console.log("from home");
        navigate("/");
        break;
      case "USERS":
        navigate("/user");
        break;
      case "PROJECTS":
        console.log("from profile");
        navigate("/project");
        break;
      case "PROFILE":
        navigate("/profile");
        break;
      case "LOGOUT":
        console.log("from logout");
        await logout();
        break; // Don't forget to break here

      default:
        console.log("default");
        break;
    }
  };

  const logout = async () => {
    try {
      const res = await dispatch(logoutAction());

      if (!res || res.status !== 200) throw "Something went wrong";

      // redirect to login
      navigate("/login");
    } catch (error) {
      console.log(error, "from logout");
    }
  };

  const isPathActive = (basePath, currentPath) => {
    if (basePath === "/") {
      return currentPath === basePath;
    } else {
      return currentPath.startsWith(basePath);
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {bars.map(
            (bar, index) =>
              !(bar.value === "USERS" && meState?.role === "USER") && (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    onClick={() => handleBar(bar.value)}
                    selected={isPathActive(`/${bar.target}`, location.pathname)}
                  >
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={bar.name} />
                  </ListItemButton>
                </ListItem>
              )
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default SidebarComponent;
