import "../darshboard.css";
// import Card from "../components/card";

export default function Darshboard() {


    return (
        <main>
            <section className="container flex-row-between p-1">
                <div className="logo">
                    <img src="/rocommerce.png" alt="logo" />
                </div>
            </section>

            <section className="product_container">
                0 Products 
            </section>
        </main>
    );
}
