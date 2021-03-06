import React, { Component } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { baseUrl } from '../baseUrl';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { SetWord } from '../translations/Translate';

class HerdListAdmin extends Component {

  constructor(props) {
    super(props);

    this.state = {

      columns: [
        { field: 'herdId', headerName: 'HerdId', width: 160 },
        { field: 'kindOfFishId', headerName: 'KindOfFishId', width: 160 },
        { field: 'dateOfBirth', headerName: 'DateOfBirth', width: 160 },
        { field: 'poolIdNow', headerName: 'PoolIdNow', width: 160 },
        { field: 'averageWeightOfAnIndividual', headerName: 'AverageWeightOfAnIndividual', width: 160 },
        { field: 'quantity', headerName: 'Quantity', width: 160 }
      ],
      rows: [],
      currentRow: {
        id: -1
      }
    }

    this.dataGridDemo = this.dataGridDemo.bind(this);
    this.setSelection = this.setSelection.bind(this);
    this.deleteHerd = this.deleteHerd.bind(this);
  }
  deleteHerd() {
    fetch(baseUrl + `Herd/Delete/${this.state.currentRow.herdId}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json; charset=UTF-8'
      },
      credentials: 'same-origin'
    })
      .then(
        (response) => {
          if (response.ok) {
            this.componentDidMount()
            alert("Ok");
          }
        },
        (error) => {
          alert(error);

        }
      );
  }
  setSelection(row) {
    this.setState({ currentRow: row });
    console.log(this.state.currentRow)
    console.log("Ид" + this.state.currentRow.fishId)
  }

  dataGridDemo(state) {
    return (
      <div>
        <div style={{ height: 620, width: '100%' }}>
          <DataGrid rows={state.rows} columns={state.columns} pageSize={10}
            onSelectionChange={(newSelection) => { this.setSelection(this.state.rows[newSelection.rowIds]); }}
          />
        </div>
        <div >
          <Link to={`/EditHerdAdmin/${this.state.currentRow.herdId}`}>
            <Button className="btn btn-primary"
              style={{ width: '10%', backgroundColor: '#87ceeb', marginBottom: "20px", margin: "5px" }}>
              {SetWord("Edit Herd")}
            </Button>
          </Link>
          <Button onClick={this.deleteHerd} className="btn btn-primary"
            style={{ width: '15%', backgroundColor: '#87ceeb', marginBottom: "20px", margin: "5px" }}>
            {SetWord("Remove Herd")}
          </Button>
        </div>
      </div >
    );
  }
  fillRows(result) {
    var res = [];
    var i = 0;
    result.forEach(element => {
      res[i] = {
        id: i,
        herdId: element.herdId,
        kindOfFishId: element.kindOfFishId,
        dateOfBirth: element.dateOfBirth,
        poolIdNow: element.poolIdNow,
        averageWeightOfAnIndividual: element.averageWeightOfAnIndividual,
        quantity: element.quantity
      };
      i++;
    });
    return res;
  }

  componentDidMount() {

    fetch(baseUrl + `Herd/Get`, {
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
          console.log(result);
          this.setState({
            isLoaded: true,
            rows: this.fillRows(result)
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    return (
      this.dataGridDemo(this.state)
    );
  }
}

export default HerdListAdmin;