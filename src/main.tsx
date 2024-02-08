import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

import "./assets/fonts.css";

const enableMocking = async () => {
  return;
  // if (!import.meta.env.DEV) return;

  // const { worker } = await import("./mocks/browser.ts");
  // return worker.start();
};

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});
