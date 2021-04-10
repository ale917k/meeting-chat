import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    display: "inline-block",
    width: 80,
    height: 80,

    "&:after": {
      content: "''",
      display: "block",
      width: "3rem",
      height: "3rem",
      margin: "0.5rem",
      borderRadius: "50%",
      border: "5px solid var(--color-light-black)",
      borderColor: "var(--color-light-black) transparent var(--color-light-black) transparent",
      animation: "$spinnerEffect 1.2s linear infinite",
    },
  },
  "@keyframes spinnerEffect": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
}));

export default useStyles;
