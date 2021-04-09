import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: "flex",
    // justifyContent: (props) => props.justify,
    marginTop: 3,
    padding: "0 5%",
  },
  box: {
    display: "inline-block",
    maxWidth: "80%",
    padding: `${theme.spacing(1)}px ${theme.spacing(4)}px`,
    // background: (props) => props.bg,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.common.white,
  },
  messageText: {
    width: "100%",
    float: "left",
    // color: (props) => props.color,
    fontSize: "1.1rem",
    letterSpacing: 0,
    wordWrap: "break-word",

    "& img": {
      verticalAlign: "middle",
    },
  },
  sentText: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.grey[500],
    letterSpacing: 0.3,
    // padding: (props) => props.padding,
  },
  justifyStart: {
    justifyContent: "flex-start",
  },
  justifyEnd: {
    justifyContent: "flex-end",
  },
  paddingLeft: {
    paddingLeft: 10,
  },
  paddingRight: {
    paddingRight: 10,
  },
  bgPrimary: {
    background: theme.palette.primary.main,
  },
  bgLight: {
    background: theme.palette.background.default,
  },
  colorWhite: {
    color: theme.palette.common.white,
  },
  colorDark: {
    color: theme.palette.common.black,
  },
}));

export default useStyles;
