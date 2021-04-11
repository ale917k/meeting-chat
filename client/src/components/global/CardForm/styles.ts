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
    backgroundColor: theme.palette.common.black,
    textAlign: "center",
    // color: theme.palette.common.white,
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
    // backgroundColor: theme.palette.common.white,

    // "&:hover": {
    //   backgroundColor: "rgba(255, 255, 255, 0.13)",
    // },
  },
}));

export default useStyles;
