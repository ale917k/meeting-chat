import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  card: {
    width: 700,
    height: "fit-content",
    margin: "0 auto",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default useStyles;
