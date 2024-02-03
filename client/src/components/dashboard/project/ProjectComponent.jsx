import React, { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
  Divider,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardActions,
  Box,
  Stack,
} from "@mui/material";
import ShowIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Outlet } from "react-router-dom";

const ProjectComponent = () => {
  return (
    <>
      <Box>
        <Outlet />
      </Box>
    </>
  );
};

export default ProjectComponent;
