import React from "react";
import MainRouter from "./MainRouter";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { Provider } from "react-redux";
import theme from "./theme";
import reduxStore from "./redux/index";
const App = () => {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);
  return (
    <Provider store={reduxStore}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <MainRouter />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
