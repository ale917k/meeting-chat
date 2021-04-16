import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    width: 700,
    height: "fit-content",
    margin: `0 auto ${theme.spacing(3)}px`,
  },
}));

export default useStyles;
