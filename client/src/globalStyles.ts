import { createMuiTheme, makeStyles } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    common: {
      white: "#FFFFFF",
      black: "#1A1A1A",
    },
    type: "dark",
    primary: {
      light: "#5C98FF",
      main: "#2979ff",
      dark: "#0A64FF",
    },
    background: {
      default: "#F3F3F3",
    },
  },
  typography: {
    fontFamily: `"Quicksand", "Roboto", "Arial", "sans-serif"`,
    h1: {
      fontSize: "2.441rem",
    },
    h2: {
      fontSize: "1.953rem",
    },
    h3: {
      fontSize: "1.563rem",
    },
    h4: {
      fontSize: "1.25rem",
    },
  },
  shape: {
    borderRadius: 8,
  },
});

const windowStyles = {
  width: "100%",
  height: "100%",
};

export const useGlobalStyles = makeStyles(() => ({
  "@global": {
    "*": {
      "&:focus": {
        outline: "none",
      },

      "&:focus-visible": {
        outline: "lightgreen solid 2px",
      },
    },

    html: {
      width: "100vw",
      height: "100vh",
    },

    body: windowStyles,

    "#root": {
      ...windowStyles,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      "& > *": windowStyles,
    },

    a: {
      textDecoration: "none",
    },

    img: {
      maxWidth: "100%",
    },
  },
}));
