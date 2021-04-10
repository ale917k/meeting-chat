import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  outerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: theme.palette.common.black,
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    width: theme.spacing(50),
    padding: theme.spacing(1),
  },
  input: {
    width: "100%",
    border: "none",
    borderRadius: 0,
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
  },
  heading: {
    borderBottom: `2px solid ${theme.palette.common.white}`,
    paddingBottom: theme.spacing(1),
    color: theme.palette.common.white,
    fontSize: "2.5rem",
  },
  button: {
    display: "inline-block",
    width: "100%",
    background: theme.palette.primary.main,
    border: "none",
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(3),
    color: `${theme.palette.common.white} !important`,
    textTransform: "uppercase",
    textDecoration: "none",
  },
}));

export default useStyles;
