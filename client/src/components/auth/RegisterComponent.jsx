import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerAction } from "../../actions/userAction";

const RegisterComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    try {
      e.preventDefault();
      const res = await dispatch(
        registerAction({ name, email, password, role: "ADMIN" })
      );

      if (!res || res.status !== 200) throw "Something wrong";

      //   redirect to login
      navigate("/login");
    } catch (error) {
      console.log(error, "from register component");
    }
  };

  return (
    <>
      <Card sx={{ padding: "1rem" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Register
          </Typography>
          <div>
            <TextField
              label="Name"
              type="text"
              name="name"
              fullWidth
              margin="normal"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email"
              type="email"
              name="email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Divider sx={{ margin: "2rem 0 1rem 0" }} />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              onClick={register}
            >
              Register
            </Button>
            <Typography variant="body2" style={{ marginTop: "1rem" }}>
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default RegisterComponent;
