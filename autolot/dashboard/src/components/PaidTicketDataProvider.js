import React, { Component } from "react";
import PropTypes from "prop-types";

class PaidTicketDataProvider extends Component {

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
      .then(data => this.setState(() => ({ data: data, loaded: true, placeholder: "Loaded" })));
  }

  render() {
    const { tickets, loaded, placeholder } = this.state;

    return ( loaded ?

    <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card strpied-tabled-with-hover">
                                <div className="card-header ">
                                    <h4 className="card-title">Cars Exited</h4>
                                    <p className="card-category">Paid Tickets</p>
                                </div>
                                <div className="card-body table-full-width table-responsive">
                                    <table className="table table-hover table-striped">
                                        <thead>
                                            <th>TicketId</th>
                                            <th>Clock In</th>
                                            <th>Clock Out</th>
                                            <th>Time Parked</th>
                                            <th>Amount Paid</th>
                                            <th>Payment Type</th>
                                        </thead>
                                        <tbody>
                                            {this.state.data.tickets.map(ticket=>
                                                 <tr>
                                                    <td key={ticket.ticketId}>{ticket.ticketId}</td>
                                                    <td key={ticket.clockIn}>{ticket.clockIn}</td>
                                                    <td key={ticket.clockOut}>{ticket.clockOut}</td>
                                                    <td key={ticket.timeParked}>{ticket.timeParked}</td>
                                                    <td key={ticket.amountPaid}>{ticket.amountPaid}</td>
                                                    <td key={ticket.paymentType}>{ticket.paymentType}</td>
                                                 </tr>
                                             )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
             </div>
         </div>
        </div>: <p>{placeholder}</p>);
  }

}
export default PaidTicketDataProvider;
