import Head from 'next/head'
import styles from '../styles/Home.module.css'
import RadarChart from 'react-svg-radar-chart';
import InputForm from '../components/InputForm';

import 'react-svg-radar-chart/build/css/index.css';
import React, { useState } from 'react';
import { Row } from 'react-bootstrap';

export interface Captions {
  process: string;
  people: string;
  technology: string;
  other: string;
}

const captions = {
  process: 'Process',
  people: 'People',
  technology: 'Technology',
  other: 'Other',
};

export interface RadarValues {
  data: {
    process?: Number,
    people?: Number,
    technology?: Number,
    other?: Number,
  },
  meta: {
    userName: String,
    color: String,
  }
}



export default function Home() {

  const [radarValues, setRadarValues] = useState({
    data: {
      process: 0,
      people: 0,
      technology: 0,
      other: 0,
    },
    meta: {
      color: "",
      userName: "",
    }
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>RetroCharts</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          RetroChart
        </h1>
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
          <RadarChart
            captions={captions}
            data={[radarValues]}
            size={650}
            options={{
              zoomDistance:1.25
            }}
          />
        </Row>
      </main>
    </div>
  )
}
