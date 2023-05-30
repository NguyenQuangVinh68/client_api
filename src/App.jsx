import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";
import { StateProvider } from "./context/ContextProvider.jsx";

function App() {
  return (
     <StateProvider>
       <RouterProvider router={router}>
      </RouterProvider>
     </StateProvider>
  );
}

export default App;
