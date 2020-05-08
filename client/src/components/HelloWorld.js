import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/helloworld.module";
function HelloWorld() {
  const [result, setResult] = useState("");
  useEffect(() => {
    console.log("you wot mate?");
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
      <h1 className={styles.h2}>Hello</h1>
    </div>
  );
}

export default HelloWorld;
