import React, { useEffect } from "react";
import Card from "./Card";

const Cart = () => {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setData(cart);
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[1rem] pb-[40px]">
        {data.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
