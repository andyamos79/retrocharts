import styles from "../styles/Home.module.css";
import RadarChart from "react-svg-radar-chart";

import "react-svg-radar-chart/build/css/index.css";
import React, { useState, useEffect } from "react";
import { Alert, Row } from "react-bootstrap";

import InputForm from "../components/InputForm";
import Heading from "../components/Heading";

import { getAllUsersData } from "../clients/backend";

// export interface Captions {
//   process: string;
//   people: string;
//   technology: string;
//   other: string;
// }

// export interface RadarValues {
//   data: {
//     process?: Number,
//     people?: Number,
//     technology?: Number,
//     other?: Number,
//   },
//   meta: {
//     userName: String,
//     color: String,
//   }
// }

const captions = {
  process: 'Process',
  people: 'People',
  technology: 'Technology',
  other: 'Other',
};

export default function Home() {
  const defaultValues = {
    data: {
      process: 0,
      people: 0,
      technology: 0,
      other: 0,
    },
    meta: {
      color: "",
      userName: "",
    },
  };

  const [radarValues, setRadarValues] = useState(defaultValues);
  const [allUserValues, setAllUserValues] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getData = async () => await getAllUsersData();
    const result = getData();
    setAllUserValues(result);
  }, []);

  useEffect(() => {}, [allUserValues]);

  return (
    <div className={styles.container}>
      <Heading />
      <main className={styles.main}>
        <h1 className={styles.title}>RetroChart</h1>
        <Row>
          <Alert>{errorMessage}</Alert>
        </Row>
        <Row
          style={{
            display: "flex",
          }}
        >
          <InputForm
            categories={captions}
            setRadarValues={setRadarValues}
            radarValues={radarValues}
          />
          {(allUserValues.length > 0) && 
          <RadarChart
            captions={captions}
            data={allUserValues}
            size={650}
            options={{
              zoomDistance: 1.25,
            }}
          />}
        </Row>
      </main>
    </div>
  );
}
