import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const baseUrl = import.meta.env.VITE_API_URL;

const SingleProduct = ({ cart, setCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  console.log(product);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${baseUrl}/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div className="flex gap-[20px] items-center justify-center">
      {loading && <span className="loading loading-spinner loading-lg"></span>}
      {!loading && (
        <>
          <img src={product.image_url} alt="img" />
          <div>
            <h1 className="text-6xl">{product.name}</h1>
            <p className="text-xl">{product.description}</p>
            <p className="text-2xl font-semibold">${product.price}</p>
            <p className="text-2xl">{"⭐️".repeat(product.ratings_stars)}</p>
            <button
              className="bg-black text-white px-4 py-2 rounded mt-[20px]"
              onClick={() => {
                Swal.fire({
                  icon: "question",
                  text: "Do you want to add this product to your cart?",
                  showCancelButton: true,
                  confirmButtonText: "Yes, add it!",
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                }).then((result) => {
                  if (result.isConfirmed) {
                    setCart([...cart, product]);
                    const data = localStorage.getItem("cart");
                    if (data) {
                      const cart = JSON.parse(data);
                      cart.push(product);
                      localStorage.setItem("cart", JSON.stringify(cart));
                    }
                    navigate("/cart");
                    toast.success("Product added to cart");
                  }
                });
              }}
            >
              Add to cart
            </button>
            <button className="btn ml-3" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleProduct;
