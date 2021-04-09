import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  outerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: theme.palette.common.black,

    [theme.breakpoints.down("sm")]: {
      height: "100%",
    },
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: theme.spacing(100),
    maxWidth: "90%",
    height: "60%",
    background: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,

    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      height: "100%",
    },
  },
}));

export default useStyles;
