import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  HomeLayout,
  Register,
  Login,
  DashboardLayout,
  Landing,
  Error,
  AllQuestions,
  Stats,
  AddQuestion,
  Profile,
  Admin,
  Solve,
  Result,
} from "./pages";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";


const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
        children: [
          {
            index: true,
            element: <AllQuestions />,
          },
          {
            path: "problem/:problemId",
            element: <Solve />,
            
          },
          {
            path :"submission/status/:id",
            element:<Result/>
          },
          { path: "stats", element: <Stats /> },
          {
            path: "all-jobs",
            element: <AddQuestion />,
          },

          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "admin",
            element: <Admin />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
