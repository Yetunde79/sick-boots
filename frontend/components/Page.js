import React, { Component } from "react";
import styled from "styled-components";

import Header from "./Header";
import Meta from ".//Meta";

const MyButton = styled.button`
  background-color: red;
  font-size: ${props => (props.huge ? "100px" : "50px")};
  span {
    font-size: 50px;
  }
`;

class Page extends Component {
  render() {
    return (
      <div>
        <Meta />
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default Page;
