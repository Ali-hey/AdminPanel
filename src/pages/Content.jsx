import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AdminContext } from "../context/adminLayoutContext";
import Logout from "./auth/Logout";
import Brands from "./brands/Brands";
import Carts from "./carts/Carts";
import Attributes from "./category/attrs/Attributes";
import Category from "./category/Category";
import CategoryChildren from "./category/CategoryChildren";
import Colors from "./colors/Colors";
import Comments from "./comments/Comments";
import Dashboard from "./dashboard/Dashboard";
import Deliveries from "./deliveries/Deliveries";
import Discounts from "./discounts/Discounts";
import Guaranties from "./guaranties/Guaranties";
import Orders from "./orders/Orders";
import Permissions from "./permissions/Permissions";
import Product from "./product/Product";
import Questions from "./questions/Questions";
import Roles from "./roles/Roles";
import Users from "./users/Users";
import AddProduct from "./product/AddProduct";
import SetAttribute from "./product/setAttr/SetAttributes";
import ProductGallery from "./product/gallery/ProductGallery";

const Content = () => {
  const { showSidebar } = useContext(AdminContext);
  return (
    <section
      id="content_section"
      className={`bg-light py-2 px-3 ${showSidebar ? "with_sidebar" : null}`}
    >
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/add-product" element={<AddProduct />} />
        <Route path="/products/set-attr" element={<SetAttribute />} />
        <Route path="/products/gallery" element={<ProductGallery />} />
        <Route path="/categories" element={<Category />}>
          <Route path=":categoryId" element={<CategoryChildren />} />
        </Route>
        <Route path="/categories/:categoryId/attributes" element={<Attributes />} />
        <Route path="/colors" element={<Colors />} />
        <Route path="/guaranties" element={<Guaranties />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/discounts" element={<Discounts />} />
        <Route path="/carts" element={<Carts />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/deliveries" element={<Deliveries />} />
        <Route path="/users" element={<Users />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/permissions" element={<Permissions />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="*" element={<Dashboard />} />
      </Routes>
    </section>
  );
};

export default Content;
