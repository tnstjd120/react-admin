import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./styles/global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtecedRoute } from "./components/routes/ProtectedRoute";
import Home from "@/pages/home";
import Login from "./pages/login";
import { ThemeProvider } from "@mui/material";
import theme from "./utils/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtecedRoute element={<Home />} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
