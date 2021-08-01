import React, { Fragment, useEffect, useState } from "react";
import { getAllUsersData } from "../clients/backend";
import { Table } from "react-bootstrap";

// import BoxPlot from 'replot-boxplot';

function DisplayData(props) {
  const { values } = props;
  const _mapValues = (values) => {
    return values.map((value) => (
      <tbody key={value.id}>
        <tr>
          <td>{value.user_id}</td>
          <td>{value.date}</td>
          <td>{value.category}</td>
          <td>{value.value}</td>
        </tr>
      </tbody>
    ));
  };

  return <Fragment>{_mapValues(values)}</Fragment>;
}

function getTable(values) {
  return (
    <Table>
      <tbody>
        <tr>
          <th>User Id</th>
          <th>Date</th>
          <th>Category</th>
          <th>Value</th>
        </tr>
      </tbody>
      <DisplayData values={values} />
    </Table>
  );
}

export default function allUsers() {
  const [values, setValues] = useState({});

  useEffect(async () => {
    const getData = async () => await getAllUsersData(new Date().toISOString());
    const result = await getData();
    setValues(result);
  }, []);

  return (
    <React.Fragment>
      <div style={{
        left: "100px",
        position: "absolute"
      }}>
        {values.length && getTable(values)}
      </div>
      <div style={{
        left: "400px",
        position: "absolute"
      }}>
        {/* <BoxPlot data={values} groupKey="category" weightKey="value" /> */}
      </div>
    </React.Fragment>
  );
}

