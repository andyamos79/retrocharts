import { Fragment } from "react";
import { Table } from "react-bootstrap";

import styled from "styled-components";

const TableDataWrapper = styled.div`
  z-index: 1;
  top: 100px;
  background: #ffffffaa;
  position: fixed;
  border-radius: 20px;
  overflow: scroll;
  height: 80%;
`;

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

export default function DisplayData(props) {
  const { values } = props;
  return (
    <TableDataWrapper>
      <Table>
        <tbody>
          <tr>
            <th>User Id</th>
            <th>Date</th>
            <th>Category</th>
            <th>Value</th>
          </tr>
        </tbody>
        <Fragment>{_mapValues(values)}</Fragment>
      </Table>
    </TableDataWrapper>
  );
}
