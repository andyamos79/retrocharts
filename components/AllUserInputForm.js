import { dateFormats } from "highcharts";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

import styled from "styled-components";

const FormWrapper = styled.div`
  background: #ffffffaa;
  border-radius: 20px;
  padding: 20px;
  width: 95%;
  margin: 5px;
  position: relative;
  z-index: 2;
`;

export default function AllUserInputForm(props) {
  const { dates, setDates } = props;
  console.log(dates);
  return (
    <FormWrapper>
      <Form.Label>From: </Form.Label>
      <DayPickerInput
        onDayChange={(day) => setDates({ ...dates, ...{ from: day.toISOString() } })}
      />
      <Form.Label>To: </Form.Label>
      <DayPickerInput
        onDayChange={(day) => setDates({ ...dates, ...{ to: day.toISOString() } })}
      />
    </FormWrapper>
  );
}
