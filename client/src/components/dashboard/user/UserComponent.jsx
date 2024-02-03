import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const UserComponent = () => {
  return (
    <>
      <Box>
        <Outlet />
      </Box>
    </>
  );
};

export default UserComponent;
