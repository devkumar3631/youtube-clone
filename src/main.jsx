import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import appStore from "./store/AppStore.js";
import { createBrowserRouter, RouterProvider } from "react-router";
import Body from "./component/Body.jsx";
import Watch from "./component/Watch.jsx";
import Test from "./component/test.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Body />,
      },
      {
        path: "watch",
        element: <Watch />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={appStore}>
    <RouterProvider router={router} />
  </Provider>,
  // </StrictMode>,
);
