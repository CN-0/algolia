import React from "react";
import { Form } from "react-bootstrap";

const Select = (props) => {
  return (
    <div>
      <Form inline>
        <Form.Label
          style={{ fontSize: 13 }}
          className="my-1 mr-1"
          htmlFor={props.title}
        >
          {props.title}
        </Form.Label>
        <Form.Control
          as="select"
          className="my-1 mr-sm-2 shadow-none"
          id={props.id}
          custom
          value={props.value}
          onChange={props.handleChange}
          style={{
            height: 28,
            padding: "0rem 1.75rem 0rem .75rem",
            fontSize: 15,
            backgroundColor: "#f6f6ef",
          }}
        >
          {props.options
            ? props.options.map((item, index) => (
                <option key={item} value={props.option_values[index]}>
                  {item}
                </option>
              ))
            : null}
        </Form.Control>
      </Form>
    </div>
  );
};

export default Select;
