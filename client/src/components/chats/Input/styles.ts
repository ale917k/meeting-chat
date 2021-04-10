import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: "flex",
  },
  input: {
    width: "80%",
    border: "none",
    borderTop: `2px solid ${theme.palette.grey[300]}`,
    borderRadius: 0,
    padding: "5%",
    fontSize: "1.2rem",
  },
  button: {
    display: "inline-block",
    width: "20%",
    border: "none",
    background: theme.palette.primary.main,
    padding: theme.spacing(3),
    color: theme.palette.common.white,
    textDecoration: "none",
  },
}));

export default useStyles;
