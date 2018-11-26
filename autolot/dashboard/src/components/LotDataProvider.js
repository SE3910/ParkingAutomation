import React, { Component } from "react";
import PropTypes from "prop-types";

class LotDataProvider extends Component {

  static propTypes = {
    endpoint: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired
  };

  constructor(props){
    super(props);
    this.state = {
          data: [],
          loaded: false,
          placeholder: "Loading..."
        };
   }

  componentDidMount() {
      fetch(this.props.endpoint)
      .then(response => {
        if (response.status !== 200) {
          return this.setState({ placeholder: "Something went wrong" });
        }
        return response.json();
      })
      .then(data => this.setState((state) => ({ data: data, loaded: true, placeholder: "Loaded" })));
  }

  componentDidUpdate(prevProps){
    if(this.props.currentTicket !== prevProps.currentTicket){
        this.fetchData(this.props.currentTicket)
    }
  }

  render() {
    const { data, loaded, placeholder } = this.state;

    return ( loaded ?
    <div>
        <p>Lot Name: {data.name}</p>
        <p>Total Spots: {data.totalSpots}</p>
    </div>: <p>{placeholder}</p>);
  }
}
export default LotDataProvider;
