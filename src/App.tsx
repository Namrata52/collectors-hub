import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import { PostProvider } from "./context/PostContext";
import { CollectionProvider } from "./context/CollectionContext";

function App() {
  return (
    <>
      <CollectionProvider>
        <PostProvider>
          <BrowserRouter>
            <Toaster position="top-right" />
            <AppRoutes />
          </BrowserRouter>
        </PostProvider>
      </CollectionProvider>
    </>
  );
}

export default App;
