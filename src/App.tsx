import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import AdminLayout from "@/pages/admin/AdminLayout";

import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import ProductDetail from "@/pages/ProductDetail";
import About from "@/pages/About";
import GetToKnowMe from "@/pages/GetToKnowMe";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Contact";
import Cart from "@/pages/Cart";

import Login from "@/pages/admin/Login";
import Dashboard from "@/pages/admin/Dashboard";
import Products from "@/pages/admin/Products";
import ProductNew from "@/pages/admin/ProductNew";
import ProductEdit from "@/pages/admin/ProductEdit";
import Orders from "@/pages/admin/Orders";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/shop", element: <Shop /> },
      { path: "/shop/:slug", element: <ProductDetail /> },
      { path: "/about", element: <About /> },
      { path: "/get-to-know-me", element: <GetToKnowMe /> },
      { path: "/faq", element: <FAQ /> },
      { path: "/contact", element: <Contact /> },
      { path: "/cart", element: <Cart /> },
    ],
  },
  {
    path: "/admin/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "products", element: <Products /> },
      { path: "products/new", element: <ProductNew /> },
      { path: "products/:id", element: <ProductEdit /> },
      { path: "orders", element: <Orders /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
