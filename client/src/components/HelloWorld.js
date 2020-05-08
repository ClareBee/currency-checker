import React, { useEffect, useState } from "react";
import axios from "axios";
function HelloWorld() {
  const [result, setResult] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/latest")
      .then(function (response) {
        // handle success
        setResult(response);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);
  return (
    <div>
      {JSON.stringify(result)}
      <h1>Hello</h1>
    </div>
  );
}

export default HelloWorld;
