import "./styles/global.css";

import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ObjectRoute from "./routes/ObjectRoute";
import { ThemeSettings } from "./utils/theme/Theme";
import { useLoadingStore } from "./store/useLoadingStore";
import Loading from "./components/common/Loading";

function App() {
  const theme = ThemeSettings();
  const isLoading = useLoadingStore((state) => state.isLoading);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route element={<ProtectedRoute />}>
          {Object.entries(ObjectRoute.protected).map(([key, value]) => (
            <Route key={key} path={value.path} element={value.element} />
          ))}
        </Route>

        {Object.entries(ObjectRoute.unprotected).map(([key, value]) => (
          <Route key={key} path={value.path} element={value.element} />
        ))}
      </Routes>

      {isLoading && <Loading fixed />}
    </ThemeProvider>
  );
}

export default App;
