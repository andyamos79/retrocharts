import { Fragment } from "react";
import { Table } from "react-bootstrap";

import styled from "styled-components";

const TableDataInnerWrapper = styled.div`
  z-index: 2;
  position: relative;
  overflow: scroll;
  padding: 10px;
  height: 100%;
`;

const TableDataOuterWrapper = styled.div`
  z-index: 1;
  top: 100px;
  background: #ffffffaa;
  position: fixed;
  border-radius: 20px;
  padding: 15px;
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
    <TableDataOuterWrapper>
      <TableDataInnerWrapper>
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
      </TableDataInnerWrapper>
    </TableDataOuterWrapper>
  );
}
