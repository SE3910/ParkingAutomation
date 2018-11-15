import React, { Component } from "react";
import PropTypes from "prop-types";

class GateDataProvider extends Component {
  static propTypes = {
    endpoint: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired
  };
  state = {
      data: [],
      loaded: false,
      placeholder: "Loading..."
    };
  componentDidMount() {
      fetch(this.props.endpoint)
      .then(response => {
        if (response.status !== 200) {
          return this.setState({ placeholder: "Something went wrong" });
        }
        return response.json();
      })
      .then(data => this.setState({ data: data, loaded: true, placeholder: "Loaded" }));
  }
  render() {
    const { data, loaded, placeholder } = this.state;
    return (loaded ? <div>{data.name}</div> : <p>{placeholder}</p>);
  }
}
export default GateDataProvider;
