import React, { Component } from "react";
import { Button, CardBody, Card } from "reactstrap";
import "./style.css";

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  // closeToggle() {
  //   if (!this.state.collapse) {
  //     this.toggle();
  //   }
  // }

  render() {
    return (
      <div>
        <Button
          className="show-button"
          color="primary"
          onClick={this.toggle}
          style={{ marginBottom: "1rem" }}
        >
          <i class="fas fa-info" />
        </Button>
        {this.state.collapse && <Show />}
      </div>
    );
  }
}

function Show(props) {
  return (
    <Card>
      <CardBody>{props.text}</CardBody>
    </Card>
  );
}

export default Toggle;
