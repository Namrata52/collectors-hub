import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Marketplace from "../pages/Marketplace";
import ProductDetails from "../pages/ProductDetails";
import Community from "../pages/Community";
import Collection from "../pages/Collection";
import PostDetails from "../pages/PostDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Marketplace />} />
        <Route path="/community" element={<Community />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/post/:id" element={<PostDetails />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
