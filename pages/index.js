import styles from "../styles/Home.module.css";
import RadarChart from "react-svg-radar-chart";

import "react-svg-radar-chart/build/css/index.css";
import React, { useState, useEffect } from "react";
import { Alert, Row } from "react-bootstrap";

import InputForm from "../components/InputForm";
import Heading from "../components/Heading";

import { getAllUsersData, postUserData } from "../clients/backend";
import { defaultValues } from "../data/dataModel";

const captions = {
  process: 'Process',
  people: 'People',
  technology: 'Technology',
  other: 'Other',
};

export default function Home() {
  const [radarValues, setRadarValues] = useState(defaultValues);
  const [allUserValues, setAllUserValues] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getData = async () => await getAllUsersData();
    const result = getData();
    console.log(result);
    if (!result) {
      setErrorMessage("Unable to get data");
    } else {
      setErrorMessage(JSON.stringify(result, null, 2));
      setAllUserValues(result);
    }
  }, []);

  useEffect(() => {
    const postData = async () => postUserData(radarValues);
    const result = postData();
    console.log(result);
    if (!result) {
      setErrorMessage("Unable to post data");
    }
  }, [radarValues]);

  return (
    <div className={styles.container}>
      <Heading />
      <main className={styles.main}>
        <h1 className={styles.title}>RetroChart</h1>
        <Row><Alert style={{background: "red"}}>{errorMessage}</Alert></Row>
        <Row>
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
