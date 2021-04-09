import { createGlobalStyle, css } from "styled-components";

const customMediaQuery = (maxWidth: number): string => `@media (max-width: ${maxWidth}px)`;

export const theme = {
  breakpoints: {
    custom: customMediaQuery,
    desktop: customMediaQuery(922),
    tablet: customMediaQuery(768),
    phone: customMediaQuery(576),
  },
  palette: {
    common: {
      white: "#ffffff",
      black: "#1a1a1d",
    },
    type: "light",
    primary: "#2979ff",
    grey: {
      50: "#f2f2f2",
      100: "#d3d3d3",
      150: "#404040",
    },
    text: "rgba(0, 0, 0, 0.87)",
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightBold: 700,
    h1: {
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      fontWeight: 300,
      fontSize: "6rem",
      lineHeight: 1.167,
      letterSpacing: "-0.01562em",
    },
    h2: {
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      fontWeight: 300,
      fontSize: "3.75rem",
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
    },
    h3: {
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      fontWeight: 400,
      fontSize: "3rem",
      lineHeight: 1.167,
      letterSpacing: "0em",
    },
    body: {
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
    },
    button: {
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.75,
      letterSpacing: "0.02857em",
      textTransform: "uppercase",
    },
  },
  spacing: (x: number): string => `${x * 8}px`,
  shape: {
    borderRadius: "8px",
  },
  transitions: {
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
    },
  },
};

const windowSizes = css`
  width: 100%;
  height: 100%;
`;

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;

    &:focus {
      outline: none;
    };
  };

  html {
    ${windowSizes};
    font-size: 15;
  };

  body {
    ${windowSizes};
  };

  #root {
    ${windowSizes};
    display: flex;
    justify-content: center;
    align-items: center;

    & > * {
      ${windowSizes};
    };
  };

  img {
    width: 100%;
  };
`;

export default GlobalStyles;
