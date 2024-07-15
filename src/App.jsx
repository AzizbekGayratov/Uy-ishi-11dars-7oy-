import React, { useEffect } from "react";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Link,
} from "react-router-dom";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Products from "./components/Products";
import SingleProduct from "./components/SingleProduct";
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";

const App = () => {
  const [cart, setCart] = useState([]);

  return (
    <>
      <header className="pt-[10px] pb-[32px]">
        <div className="max-w-[1350px] mx-auto px-[5px]">
          <div className="flex justify-between items-center">
            <Link to="/">
              <img
                src="/public/header-logo.png"
                className="w-[143px]"
                alt="logo"
              />
            </Link>
            <nav>
              <ul className="flex gap-[30px]">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? "activeLink" : "")}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/products"
                    className={({ isActive }) => (isActive ? "activeLink" : "")}
                  >
                    Products
                  </NavLink>
                </li>
              </ul>
            </nav>
            <div className="flex gap-[20px] items-center">
              <CiSearch className="w-[21.5px] h-[21.5px]"></CiSearch>
              <Link to="/cart" className="relative">
                <span className="absolute -top-[0.1rem] -right-[0.1rem] bg-red-500 text-white rounded-full px-1 text-[10px]">
                  {JSON.parse(localStorage.getItem("cart"))?.length || []}
                </span>
                <CiShoppingCart className="w-[31.5px] h-[31.5px]"></CiShoppingCart>
              </Link>
              <button className="btn bg-[#131118] text-white">Login</button>
            </div>
          </div>
        </div>
      </header>
      <div className="content">
        <div className="max-w-[1350px] mx-auto px-[5px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/products"
              element={<Products cart={cart} setCart={setCart} />}
            />
            <Route path="/cart" element={<Cart cart={cart} />} />
            <Route
              path="/products/:id"
              element={<SingleProduct cart={cart} setCart={setCart} />}
            />
          </Routes>
        </div>
      </div>
      <footer className="bg-[#131118] py-[20px]">
        <div className="max-w-[1350px] mx-auto px-[5px]">
          <p className="text-white text-center">
            ©2023 Krist All Rights are reserved️
          </p>
        </div>
      </footer>
    </>
  );
};

export default App;
