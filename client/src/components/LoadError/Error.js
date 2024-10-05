import { Typography } from "@mui/material";

const ErrorMessage = ({ message }) => (
    <Typography color="error" align="center">
        {message}
    </Typography>
);
export default ErrorMessage