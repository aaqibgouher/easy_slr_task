import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { Box, Divider } from "@mui/material";

const DasboardComponent = () => {
  // Example data or function to retrieve data
  const totalProjects = 20;
  const totalTasks = 150;
  const completedTasks = 100;

  return (
    <>
      <Box>
        <Typography variant="h3" component="div">
          Analytics
        </Typography>
        <Grid container spacing={3} sx={{ marginY: "2rem" }}>
          {/* Total Projects */}
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Total Projects
                </Typography>
                <Typography variant="h4" color="primary">
                  {totalProjects}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Total Tasks */}
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Total Tasks
                </Typography>
                <Typography variant="h4" color="primary">
                  {totalTasks}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Pending and Completed Tasks */}
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Total Completed Tasks
                </Typography>
                <Typography variant="h4" color="primary">
                  {totalTasks}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Total Pending Tasks
                </Typography>
                <Typography variant="h4" color="primary">
                  {totalTasks}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Total Users
                </Typography>
                <Typography variant="h4" color="primary">
                  {totalTasks}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DasboardComponent;
