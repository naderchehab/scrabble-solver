import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

require("./App.css");

export default class App extends React.Component {

  state = {
    tableData: [],
  };

  componentDidMount() {
    fetch('/api/solve')
    .then(response => {
      return response.json();
    })
    .then(result => {
      this.setState({tableData: result});
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <Table>
          <TableBody displayRowCheckbox={false}>
            {this.state.tableData[0].map((row, index) => (
              <TableRow key={index}>
                <TableRowColumn>{index}</TableRowColumn>
                {row.map((col, index) => (
                  <TableRowColumn key={index}>{col}</TableRowColumn>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </MuiThemeProvider>
    );
  }
}
