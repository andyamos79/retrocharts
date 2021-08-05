import React, { Fragment, useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";

import { getAllUsersData } from "../clients/backend";
import UserDataTable from "../components/UserDataTable";
import AllUserDataChart from "../components/AllUserBoxPlot";
import AllUserInputForm from "../components/AllUserInputForm";

import styled from "styled-components";

const ChartsWrapper = styled.div`
  top: 100px;
  z-index: 1;
`;

import BGImage from "../components/BGImage";

export default function allUsers() {

  const [values, setValues] = useState(undefined);

  const today = new Date().toISOString();
  const [dates, setDates] = useState({ from: today, to: today });

  useEffect(async () => {
    const getData = async () => await getAllUsersData(dates.from);
    const result = await getData();
    setValues(result);
  }, [dates]);

  return (
    <ChartsWrapper>
      <Container fluid>
        <Row>
          <Col xs={4}>
            <Row>{<AllUserInputForm dates={dates} setDates={setDates}></AllUserInputForm>}</Row>
            <Row>{values && <UserDataTable values={values} />}</Row>
          </Col>
          <Col xs={8}>
            <Row fluid>{values && <AllUserDataChart values={values} />}</Row>
          </Col>
        </Row>
      </Container>
      <BGImage />
    </ChartsWrapper>
  );
}
