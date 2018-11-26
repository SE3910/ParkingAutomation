import React, { Component } from "react";
import PropTypes from "prop-types";

class TicketTableDataProvider extends Component {

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
    <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card strpied-tabled-with-hover">
                                <div className="card-header ">
                                    <h4 className="card-title">Cars Parked</h4>
                                    <p className="card-category">Active Tickets</p>
                                </div>
                                <div className="card-body table-full-width table-responsive">
                                    <table className="table table-hover table-striped">
                                        <thead>
                                            <th>TicketId</th>
                                            <th>Timestamp</th>
                                        </thead>
                                        <tbody>
                                            {this.state.data.tickets.map(ticket=>
                                                 <tr>
                                                    <td key={ticket.ticketId}>{ticket.ticketId}</td>
                                                    <td key={ticket.timestamp}>{ticket.timestamp}</td>
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
export default TicketTableDataProvider;
