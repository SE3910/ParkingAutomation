import React, { Component } from "react";
import PropTypes from "prop-types";

class SpotDataProvider extends Component {

  static propTypes = {
    endpoint: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired
  };

  constructor(props){
    super(props);
    this.state = {
          data: [],
          availableSpots: "",
          spotsTaken: "",
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
      .then(data => {
        if((data.totalSpots - data.tickets.length)>0){
          return this.setState((state) => ({ data: data, availableSpots: data.totalSpots - data.tickets.length, spotsTaken: data.tickets.length, loaded: true, placeholder: "Loaded" }));
        }
        return this.setState((state) => ({ data: data, availableSpots: "Lot Full", spotsTaken: "50", loaded: true, placeholder: "Loaded" }));
        });
  }

  render() {
    const { data, availableSpots, spotsTaken, loaded, placeholder } = this.state;

    return ( loaded ?
    <div>
       <p>Spots Available: {availableSpots}</p>
       <p>Spots Taken: {spotsTaken}</p>
    </div>: <p>{placeholder}</p>);
  }
}
export default SpotDataProvider;
