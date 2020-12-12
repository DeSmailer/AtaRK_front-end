import React, { Component } from 'react';
import { baseUrl, getCookie } from '../baseUrl';


class EditClosedWaterSupplyInstallation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Location: "",
            OrganizationId: getCookie('organizationId'),
            ClosedWaterSupplyInstallationId: this.props.match.params.closedWaterSupplyInstallationId,
            isLoaded: false,
            optionsLocationId: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeLocation = this.changeLocation.bind(this);
        this.editClosedWaterSupplyInstallation = this.editClosedWaterSupplyInstallation.bind(this);
    }


    editClosedWaterSupplyInstallation() {
        const newAccount = {
            Location: this.state.Location,
            OrganizationId: this.state.OrganizationId,
            ClosedWaterSupplyInstallationId: this.state.ClosedWaterSupplyInstallationId,
        }
        fetch(baseUrl + "ClosedWaterSupplyInstallation/Update", {
            method: 'PUT',
            body: JSON.stringify(newAccount),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            credentials: 'same-origin'
        })
            .then(
                (response) => {
                    if (response.ok) {
                        alert("Ok");
                    }
                },
                (error) => {
                    alert(error);

                }
            );
    }

    handleSubmit = event => {
        this.editClosedWaterSupplyInstallation();
        event.preventDefault();
    }

    changeLocation(event) {
        this.setState({ Location: event.target.value });
        console.log(this.state.Location);
        console.log(this.state.OrganizationId);
    }

    componentDidMount() {
        console.log(this.props.match.params.closedWaterSupplyInstallationId)
        fetch(baseUrl + "ClosedWaterSupplyInstallation/GetById/" + this.props.match.params.closedWaterSupplyInstallationId,
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                credentials: 'same-origin'
            })
            .then(result => result.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        isLoaded: true,
                        Location: result.location,
                        OrganizationId: result.organizationId,
                        ClosedWaterSupplyInstallationId: result.closedWaterSupplyInstallationId,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                    });
                    alert(error);
                }
            )
    }

    render() {
        if (!this.state.isLoaded) {
            return (
                <div className="text-center">
                    <i className="fa fa-spinner fa-spin"></i>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <div className="col-12">

                    </div>
                    <div style={{ width: "600px", height: "480px", marginLeft: "20%", marginTop: "10%" }}>
                        <h2 style={{ alingCenter: "center", marginLeft: "150px", marginBottom: "40px" }}>Додати УЗВ</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label className="form-group" style={{ width: "600px" }}> Організація
                        <input className="form-control" id="Location" name="Location" value={this.state.OrganizationId} />
                                </label>
                                <label className="form-group" style={{ width: "600px" }}> УЗВ
                        <input className="form-control" id="Location" name="Location" value={this.state.ClosedWaterSupplyInstallationId} />
                                </label>
                                <label className="form-group" style={{ width: "600px" }}> Локація
                        <input className="form-control" id="Location" name="Location" value={this.state.Location} onChange={this.changeLocation} />
                                </label>
                                <button
                                className="btn btn-primary"
                                style={{ width: '20%', backgroundColor: '#87ceeb', marginBottom: "20px", margin: "5px"}}
                                    type="submit"
                                    > 
                                    Змінити
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            );
        }
    }
}

export default EditClosedWaterSupplyInstallation;