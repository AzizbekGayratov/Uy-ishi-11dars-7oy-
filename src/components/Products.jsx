import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../store/productsSlice";
import Card from "./Card";

const baseUrl = import.meta.env.VITE_API_URL;

const Products = ({ cart, setCart }) => {
  const products = useSelector((store) => store.products.products);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPages, setShowPages] = useState(true);

  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");

  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");

  const [sortedPrice, setSortedPrice] = useState("");
  const [sortedRating, setSortedRating] = useState("");

  useEffect(() => {
    const fetchBrands = async () => {
      const response = await fetch(`${baseUrl}/brands`);
      const data = await response.json();
      setBrands(data);
    };
    const fetchColors = async () => {
      const response = await fetch(`${baseUrl}/colors`);
      const data = await response.json();
      setColors(data);
    };
    const getProductsCount = async () => {
      const response = await fetch(`${baseUrl}/products`);
      const data = await response.json();
      const count = Math.ceil(data.length / 8);
      const pages = new Array(count).fill().map((_, i) => i + 1);
      setTotalPages(pages);
    };
    fetchBrands();
    fetchColors();
    getProductsCount();
  }, []);

  const params = [];
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      let Query = `${baseUrl}/products`;
      if (selectedBrand) {
        params.push(`brand_name=${encodeURIComponent(selectedBrand)}`);
      }
      if (selectedColor) {
        params.push(`color_options_like=${encodeURIComponent(selectedColor)}`);
      }
      if (sortedRating) {
        params.push(
          `_sort=ratings_stars&_order=${encodeURIComponent(sortedRating)}`
        );
      }
      if (sortedPrice) {
        params.push(`_sort=price&_order=${encodeURIComponent(sortedPrice)}`);
      }
      if (params.length > 0) {
        Query += `?${params.join("&")}`;
        setShowPages(false);
      } else {
        Query += `?_limit=10&_page=${currentPage}`;
      }

      try {
        const response = await fetch(`${Query}`);
        const data = await response.json();
        dispatch(setProducts(data));
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedBrand, selectedColor, sortedPrice, sortedRating, currentPage]);

  return (
    <div className="grid grid-cols-[240px_1fr] gap-[24px]">
      <aside>
        <div className="collapse collapse-arrow">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            Filter by brands
          </div>
          <div className="collapse-content">
            <ul className="pl-4">
              {brands.map((brand, index) => (
                <li key={index} className="flex gap-2">
                  <input
                    type="radio"
                    value={brand}
                    name="brand"
                    id={brand}
                    checked={brand === selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  />
                  <label htmlFor={brand}>{brand}</label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="collapse collapse-arrow">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            Filter by colors
          </div>
          <div className="collapse-content">
            <ul className="grid grid-cols-8 gap-2">
              {colors.map((color, index) => (
                <li key={index}>
                  <div
                    style={{
                      background: color,
                      outline: selectedColor === color ? "3px solid red" : "",
                    }}
                    className="w-5 h-5 rounded-full border-[1px] border-black"
                    onClick={() => setSelectedColor(color)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="collapse collapse-arrow">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            Sort by price
          </div>
          <div className="collapse-content">
            <ul className="">
              <li className="">
                <input
                  className="hidden"
                  type="radio"
                  value="asc"
                  name="brand"
                  id="upgradePrice"
                  //   checked={brand === selectedBrand}
                  onChange={(e) => setSortedPrice(e.target.value)}
                />
                <label htmlFor="upgradePrice">Arzon mahsulotlar</label>
              </li>
              <li className="">
                <input
                  className="hidden"
                  type="radio"
                  value="desc"
                  name="brand"
                  id="downgradePrice"
                  //   checked={brand === selectedBrand}
                  onChange={(e) => setSortedPrice(e.target.value)}
                />
                <label htmlFor="downgradePrice">Qimmat mahsulotlar</label>
              </li>
            </ul>
          </div>
        </div>
        <div className="collapse collapse-arrow">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            Sort by Rating
          </div>
          <div className="collapse-content">
            <ul className="">
              <li className="">
                <input
                  className="hidden"
                  type="radio"
                  value="asc"
                  name="brand"
                  id="upgradeRating"
                  //   checked={brand === selectedBrand}
                  onChange={(e) => setSortedRating(e.target.value)}
                />
                <label htmlFor="upgradeRating">Past reyting</label>
              </li>
              <li className="">
                <input
                  className="hidden"
                  type="radio"
                  value="desc"
                  name="brand"
                  id="downgradeRating"
                  //   checked={brand === selectedBrand}
                  onChange={(e) => setSortedRating(e.target.value)}
                />
                <label htmlFor="downgradeRating">Baland reyting</label>
              </li>
            </ul>
          </div>
        </div>
      </aside>
      <main className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[1rem] pb-[40px]">
        {loading ? (
          <span className="loading loading-spinner loading-lg"></span>
        ) : (
          <>
            {products.map((product) => (
              <Card
                key={product.id}
                product={product}
                cart={cart}
                setCart={setCart}
              />
            ))}
            {showPages && (
              <div className="join mt-[36px]">
                {totalPages && (
                  <>
                    {totalPages.map((page) => (
                      <button
                        key={page}
                        onClick={() => {
                          setCurrentPage(page);
                        }}
                        className={
                          page === currentPage
                            ? "join-item btn btn-active"
                            : "join-item btn"
                        }
                      >
                        {page}
                      </button>
                    ))}
                  </>
                )}
              </div>
            )}
          </>
        )}
        {products.length === 0 && <div>No products found</div>}
      </main>
    </div>
  );
};

export default Products;
