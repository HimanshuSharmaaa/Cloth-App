import { useContext } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import { ShopContext } from "../../Context/ShopContext";

const override = {
  display: "block",
  margin: "60px auto",
  borderColor: "red",
};

function Loader() {
  const { loading } = useContext(ShopContext);
  return (
    <div className="sweet-loading">
    <FadeLoader color={'grey'} loading={loading} cssOverride={override} size={100} aria-label="Loading Spinner" data-testid="loader"/>
    </div>
  );
}

export default Loader;