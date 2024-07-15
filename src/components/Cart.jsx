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
          <>
            <Card key={product.id} product={product}></Card>
          </>
        ))}
      </div>

      {data.length === 0 && <p className="text-center">Cart is empty</p>}
      {data.length > 0 && (
        <button
          className="bg-red-500 text-white px-[15px] py-[6px] rounded mb-[36px] block ml-auto"
          onClick={() => {
            setData([]);
            localStorage.removeItem("cart");
          }}
        >
          Clear all
        </button>
      )}
    </div>
  );
};

export default Cart;
