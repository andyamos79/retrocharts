import React, { Fragment, useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";

import { getAllUsersData } from "../clients/backend";
import UserDataTable from "../components/UserDataTable";
import AllUserDataChart from "../components/AllUserBoxPlot";

import BGImage from '../components/BGImage';

export default function allUsers() {
  const [values, setValues] = useState(undefined);

  useEffect(async () => {
    const getData = async () => await getAllUsersData(new Date().toISOString());
    const result = await getData();
    setValues(result);
  }, []);

  return (
    <Fragment>
      <Container fluid>
        <Row>
          <Col xs="3">
            {values && <UserDataTable values={values} />}
          </Col>
          <Col xs="9">
            {values && <AllUserDataChart values={values} />}
          </Col>
        </Row>
      </Container>
      <BGImage />
    </Fragment>
  );
}
