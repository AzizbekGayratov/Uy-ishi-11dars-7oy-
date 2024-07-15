import React from "react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Card = ({ product, cart, setCart }) => {
  return (
    <div key={product.id} className="mb-[20px]">
      <img src={product.image_url} alt="img" className="h-[55%]" />
      <div className="">
        <h4 className="mt-2 text-[18px] font-semibold hover:underline">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h4>
        <p className="text-[14px] mb-[16px]">
          {product.description.length <= 45
            ? product.description
            : product.description.slice(0, 45) + "..."}
        </p>
        <div className="ml-[8px] flex items-center gap-[4px]">
          {product.color_options.map((color, i) => (
            <div
              key={i}
              style={{ backgroundColor: color }}
              className="w-[20px] h-[20px] rounded-full mr-2 border-[0.5px] border-black"
            ></div>
          ))}
        </div>
        <strong>${product.price}</strong>
        <div className="flex items-center gap-[4px] mt-[8px]">
          <p className="text-[14px]">{"⭐️".repeat(product.ratings_stars)}</p>
          <p className="">{product.ratings_stars}</p>
        </div>

        <button
          className="flex items-center gap-[4px] mt-[8px] px-[15px] py-[6px] bg-black text-white rounded    "
          onClick={() => {
            Swal.fire({
              text: "Do you want to add this product to your cart?",
              icon: "question",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes",
            }).then((result) => {
              if (result.isConfirmed) {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                toast.success("Product added to cart");
              }
            });
          }}
        >
          <FaCartShopping /> Add to cart
        </button>
      </div>
    </div>
  );
};

export default Card;
