import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // Removed because it was causing the timers to be set twice on page load.
  //
  // Reference: https://stackoverflow.com/q/60618844/2338327
  //
  // <React.StrictMode>
  <App />
  // </React.StrictMode>,
);
