import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import theme from "./Theme/theme.js";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import ChatProvider from "./context/ChatProvide";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <ChatProvider>
          {" "}
          <App />
        </ChatProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
