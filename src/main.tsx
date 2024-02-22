import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

import { SnackbarProvider } from "notistack";

import "./assets/fonts.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const enableMocking = async () => {
  return;
  // if (!import.meta.env.DEV) return;

  // const { worker } = await import("./mocks/browser.ts");
  // return worker.start();
};

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  );
});
