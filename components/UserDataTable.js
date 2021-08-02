import { Fragment } from "react";
import { Table } from 'react-bootstrap';

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
  );
}
