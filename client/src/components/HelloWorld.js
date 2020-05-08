import React, { useEffect } from "react";
import axios from "axios";

function HelloWorld() {
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/latest")
      .then(function (response) {
        // handle success
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
  return <div>Hello world</div>;
}

export default HelloWorld;
