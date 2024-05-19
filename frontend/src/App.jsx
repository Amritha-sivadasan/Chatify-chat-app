import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Button, ButtonGroup } from "@chakra-ui/react";
import Home from "./pages/Home";
import Chat from "./pages/Chat";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/chat" Component={Chat} />
      </Routes>
    </div>
  );
}

export default App;
