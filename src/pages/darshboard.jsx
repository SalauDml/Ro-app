import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "../darshboard.css";
import SearchComponent from "../components/search";
import Card from "../components/card";
import SubHeader from "../components/sub_header";
import { getCookies, removeToken } from "../utils/functions";

const useQuery = () => new URLSearchParams(useLocation().search)

export default function Darshboard() {
  const { path } = useParams();
  const query = useQuery();
  const [store, setStore] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const navigate = useNavigate(); // Initialize navigate
  const token = getCookies();

  const type = query.get("type");

  useEffect(() => {
    const URL = (type, path) => {
      if (path && type) {
        return `http://127.0.0.1:8000/${path}/get_products/?type=${type}`;
      } else {
        return `http://127.0.0.1:8000/product/get_products/`;
      }
    };

    fetch(URL(type, path), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Include token in Authorization header
      },
    })
      .then((response) => {
        if (response.status === 401) {
          throw new Error("Unauthorized");
        }
        return response.json();
      })
      .then((response) => setStore(response.data))
      .catch((err) => {
        console.error("Fetch error:", err);
        removeToken()
        navigate("/login"); // Redirect to login page
      });
  }, [path, type, navigate, token]);

  return (
    <main>
      <section className="container flex-row-between p-1">
        <div className="logo">
          <img src="/rocommerce.png" alt="logo" />
        </div>
        <div>
          <SearchComponent />
        </div>
      </section>
      <section>
        <SubHeader state={selectedValue} setState={setSelectedValue} />
      </section>
      <section className="product_container">
        {!store ? (
          <div>No Data</div>
        ) : (
          store
            .filter((product) =>
              selectedValue !== ""
                ? selectedValue.toLowerCase() === product.type.toLowerCase()
                : product
            )
            .map((product) => {
              return (
                <div key={product.id}>
                  <Card
                    title={product.name}
                    imageUrl={product.image_url}
                    description={product.description}
                    price={Number(product.price)}
                  />
                </div>
              );
            })
        )}
      </section>
    </main>
  );
}
