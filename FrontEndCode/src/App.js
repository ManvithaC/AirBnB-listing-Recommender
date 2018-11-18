import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './App.css';
import axios from 'axios';
import FloatingActionButtons from './button.js';
import TitlebarGridList from './GridList.js';
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

  getRecommendedListings = () => {

    
   
      

    axios.post('http://localhost:8000/query', {
      url: this.state.name
    })
      .then(function (response) {
        console.log(response);
        this.setState({ tileData: response.data })
      })
      .catch(function (error) {
        alert("Something seems wrong. Please try again later.");
        console.log(error);
      });

  };

  state = {
    tileData : [],
    name : ''
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
            Airbnb Listings Recommendation System
          </Typography>
          <div className="row">
            <div className="mt-3 mr-5 ml-5 col-md-11">
              <TextField
                id="outlined-full-width"
                label="Enter the listing URL"
                style={{ margin: 8 }}
                multiline
                rows="1"
                placeholder="https://example-listing-id.com"
                helperText="Enter the url you would like to get the recommendations for"
                fullWidth
                margin="normal"
                variant="outlined"
                value={this.state.name}
                onChange={this.handleChange('name')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <FloatingActionButtons getRecommendedListings={this.getRecommendedListings}></FloatingActionButtons>
          </div>
          <div className={"row m-5"}>
            <TitlebarGridList tileData={this.state.tileData}/>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
