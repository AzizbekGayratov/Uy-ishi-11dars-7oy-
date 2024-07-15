import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_URL;

const SingleProduct = ({ cart, setCart }) => {
  const { id } = useParams();
  console.log(id);
  const [product, setProduct] = React.useState([]);
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
      {loading && <p>Loading...</p>}
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
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
              }}
            >
              Add to cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleProduct;
