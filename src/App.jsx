import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./routes/Routes";
import { Provider } from "react-redux";
import store from "./app/store";

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  );
};

export default App;