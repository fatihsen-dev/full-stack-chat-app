import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { store } from "./store/index";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
   <Provider store={store}>
      <BrowserRouter>
         <App />
         <Toaster position='top-left' reverseOrder={false} />
      </BrowserRouter>
   </Provider>
);
