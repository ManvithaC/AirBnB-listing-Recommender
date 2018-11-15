import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './App.css';
import FloatingActionButtons from './button.js';
import SimpleCard from './card.js';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: 20,
    marginRight: 20,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});


class App extends Component {
  state = {

  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Typography className="mt-2" component="h4" variant="h4" gutterBottom>
            Sentiment Analysis
          </Typography>
          <div className="row">
            <div className="mt-3 mr-5 ml-5 col-md-11">
              <TextField
                id="outlined-full-width"
                label="Comment/Description"
                style={{ margin: 8 }}
                multiline
                rows="10"
                placeholder="I love this house"
                helperText="Enter the comments you would like to calculate the sentiment for."
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <FloatingActionButtons></FloatingActionButtons>
          </div>
          <div className={"row"}>
            <div className={"col-md-3 m-5"}>
              <SimpleCard heading="Score"/>
            </div>
            <div className={"col-md-3 m-5"}>
              <SimpleCard heading="Polarity"/>
            </div>
            <div className={"col-md-3 m-5"}>
              <SimpleCard heading="Example"/>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
