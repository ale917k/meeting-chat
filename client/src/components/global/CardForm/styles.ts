import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  outerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(2),
    width: "100%",
    height: "100%",
    padding: theme.spacing(1),
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    width: theme.spacing(50),
    padding: theme.spacing(1),
  },
  field: {
    marginBottom: theme.spacing(2),
  },
  textCenter: {
    textAlign: "center",
  },
}));

export default useStyles;
