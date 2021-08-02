import React, { Fragment, useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";

import { getAllUsersData } from "../clients/backend";
import UserDataTable from "../components/UserDataTable";
import AllUserDataChart from "../components/AllUserBoxPlot";



export default function allUsers() {
  const [values, setValues] = useState(undefined);

  useEffect(async () => {
    const getData = async () => await getAllUsersData(new Date().toISOString());
    const result = await getData();
    setValues(result);
  }, []);

  return (
    <Fragment>
      <Container>
        <Row>
          <Col
            style={{
              left: "10px",
              position: "absolute",
              width: "25%"
            }}
            >
            {
              values && 
              <UserDataTable values={values} />
            }
          </Col>
          <Col
            style={{
              left: "30%",
              position: "absolute",
              width: "60%"
            }}
          >
            {
              values &&
              <AllUserDataChart values={values} />
            }
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
