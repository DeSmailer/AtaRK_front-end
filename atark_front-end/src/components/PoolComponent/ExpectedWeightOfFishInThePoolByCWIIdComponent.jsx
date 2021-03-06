import React, { Component } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { baseUrl } from '../baseUrl';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { SetWord } from '../translations/Translate';

class ExpectedWeightOfFishInThePoolByCWIId extends Component {

  constructor(props) {
    super(props);

    this.state = {

      columns: [
        { field: 'poolId', headerName: 'PoolId', width: 160 },
        { field: 'maxWeight', headerName: 'MaxWeight', width: 160 },
        { field: 'currentWeight', headerName: 'CurrentWeight', width: 160 }
      ],
      rows: [],
      currentRow: {
        id: -1
      }
    }

    this.dataGridDemo = this.dataGridDemo.bind(this);
    this.setSelection = this.setSelection.bind(this);
  }
  setSelection(row) {
    this.setState({ currentRow: row });
    console.log(this.state.currentRow)
  }

  dataGridDemo(state) {
    return (
      <div>
        <div>

        </div>
        <div style={{ height: 620, width: '100%' }}>
          <DataGrid rows={state.rows} columns={state.columns} pageSize={10}
            onSelectionChange={(newSelection) => { this.setSelection(this.state.rows[newSelection.rowIds]); }}
          />
        </div>
        <Link to={`/FishListByPoolId/${this.state.currentRow.poolId}`}>
          <Button className="btn btn-primary"
            style={{ width: '10%', backgroundColor: '#87ceeb', marginBottom: "20px", margin: "5px" }}>
            {SetWord("Contents")}
          </Button>
        </Link>
        <Link to={`/FishListForRelocationByPoolId/${this.state.currentRow.poolId}`}>
          <Button className="btn btn-primary"
            style={{ width: '15%', backgroundColor: '#87ceeb', marginBottom: "20px", margin: "5px" }}>
            {SetWord("Fish for relocation")}
          </Button>
        </Link>
      </div >
    );
  }


  fillRows(result) {
    var res = [];
    var i = 0;

    result.forEach(element => {
      res[i] = {
        id: i,
        poolId: element.poolId,
        maxWeight: element.maxWeight,
        currentWeight: element.currentWeight
      };
      i++;
    });
    return res;
  }

  componentDidMount() {
    fetch(baseUrl + "Pool/GetWeightOfFishInThePool/" + this.props.match.params.closedWaterSupplyInstallationId, {
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

export default ExpectedWeightOfFishInThePoolByCWIId;