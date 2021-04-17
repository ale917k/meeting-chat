import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  topics: {
    alignSelf: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: `calc(100% - ${theme.spacing(8)}px)`,
    padding: `${theme.spacing(4)}px 0`,
    overflowY: "auto",
  },
}));

export default useStyles;
