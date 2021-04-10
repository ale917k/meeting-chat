import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: theme.spacing(8),
    background: theme.palette.primary.main,
    borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
  },
  leftContainer: {
    display: "flex",
    alignItems: "center",
    flex: 0.5,
    marginLeft: "5%",
    color: theme.palette.common.white,
  },
  rightContainer: {
    display: "flex",
    justifyContent: "flex-end",
    flex: 0.5,
    marginRight: "5%",
  },
  onlineIcon: {
    width: "auto",
    marginRight: "5%",
  },
}));

export default useStyles;
