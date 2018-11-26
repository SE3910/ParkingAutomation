import React, { Component } from "react";
import PropTypes from "prop-types";

class GateDataProvider extends Component {

  static propTypes = {
    endpoint: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired
  };

  constructor(props){
    super(props);
    this.state = {
          data: [],
          currentTicket: "",
          timestamp: "",
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
      if((data.tickets.length)>0){
          return this.setState((state) => ({ data: data, currentTicket: data.tickets[data.tickets.length-1].ticketId, timestamp: data.tickets[data.tickets.length-1].timestamp, loaded: true, placeholder: "Loaded" }));
        }
         return this.setState((state) => ({ data: data, currentTicket: "No ticket data at this time.", timestamp: "00:00:00", loaded: true, placeholder: "Loaded" }));
       });


  }

  componentDidUpdate(prevProps){
    if(this.props.currentTicket !== prevProps.currentTicket){
        this.fetchData(this.props.currentTicket)
    }
  }

  render() {
    const { data, currentTicket, timestamp, loaded, placeholder } = this.state;

    return ( loaded ?
    <div>
        <p>Ticket Number: {currentTicket}</p>
        <p>Timestamp: {timestamp}</p>
    </div>: <p>{placeholder}</p>);
  }
}
export default GateDataProvider;
