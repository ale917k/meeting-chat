import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  topics: {
    alignSelf: "flex-start",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: `calc(100% - ${theme.spacing(8)}px)`,
    padding: `${theme.spacing(4)}px 0`,
    overflowY: "auto",
  },
  scrollWrapper: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: "100%",
  },
  loader: {
    position: "absolute",
    bottom: "20%",
  },
}));

export default useStyles;
