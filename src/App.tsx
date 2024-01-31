import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./styles/global.css";

import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { ThemeProvider } from "@mui/material";
import theme from "./utils/theme";
import useLocationChange from "./hooks/useLocationChange";
import ObjectRoute from "./routes/ObjectRoute";
import { checkAuth } from "./auth/auth";

function App() {
  useLocationChange((location) => {
    console.log(location);
    checkAuth();

    console.log(checkAuth());
  });

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<ProtectedRoute isAuth={false} />}>
          {Object.entries(ObjectRoute.protected).map(([key, value]) => (
            <Route key={key} path={value.path} element={value.element} />
          ))}
        </Route>

        {Object.entries(ObjectRoute.unprotected).map(([key, value]) => (
          <Route key={key} path={value.path} element={value.element} />
        ))}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
