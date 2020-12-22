import React from "react";
import MainRouter from "./MainRouter";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import theme from "./theme";
import reduxStore from "./redux/index";
const App = () => {
  return (
    <Provider store={reduxStore}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <MainRouter />
          <ToastContainer/>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
