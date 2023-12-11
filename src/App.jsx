import { useEffect } from "react";

import { fetchApi } from "./components/Api";
function App() {
  useEffect(() => {
    apiTesting();
  }, []);
  const apiTesting = () => {
    try {
      const res = fetchApi("/movie/popular");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
}

export default App;
