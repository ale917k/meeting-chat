import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { StoreProvider } from "context";
import { theme } from "globalStyles";
import App from "App";

ReactDOM.render(
  <BrowserRouter>
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StoreProvider>
  </BrowserRouter>,
  document.getElementById("root"),
);
