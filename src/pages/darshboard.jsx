import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import "../darshboard.css";
import SearchComponent from "../components/search";
import Card from "../components/card";
import SubHeader from "../components/sub_header";

const useQuery = () => new URLSearchParams(useLocation().search)

export default function Darshboard() {
  const { path } = useParams();
  const query = useQuery();
  const [store, setStore] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const type = query.get("type");

  console.log("Params: ",path)
  console.log("Type: ", type)

  useEffect(() => {
    const URL = (type, path) => {
        if(path && type) {
          return `http://127.0.0.1:8000/${path}/get_products/?type=${type}`
        }else {
          return `http://127.0.0.1:8000/product/get_products/`
        }
    } 

    fetch(URL(type, path))
      .then((response) => response.json())
      .then((response) => setStore(response.data));
  }, [path, type]);

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
        {store
          .filter((product) =>
            selectedValue !== "" ? selectedValue.toLowerCase() === product.type.toLowerCase(): product
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
          })}
      </section>
    </main>
  );
}
