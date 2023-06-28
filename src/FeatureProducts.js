import Fetchdata from "../src/components/Fetchdata";
import SingleProduct from "../src/components/SingleProduct";
const FeatureProducts = () => {
  const products1 = Fetchdata();

  return (
    <section className="container mx-auto">
  <h2
    style={{
      fontSize: "2.5rem",
      paddingTop: "2.5rem",
      paddingBottom: "2.5rem",
      textAlign: "center",
      fontWeight: "500",
      color: "#4b5563",
    }}
  >
    Feature Products
  </h2>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: "2.5rem",
      width: "80%",
      margin: "0 auto",
      paddingBottom: "2.5rem",
    }}
  >
        {products1 &&
          products1
            .filter((product1) => product1.id % 5 === 0)
            .map((product1) => {
              return <SingleProduct key={product1.id} product1={product1} />;
            })}
      </div>
    </section>
  );
};

export default FeatureProducts;
