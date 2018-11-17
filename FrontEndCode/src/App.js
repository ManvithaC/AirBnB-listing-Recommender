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
    const listing_url = {
      url: this.state.name
    }
    console.log(listing_url);
<<<<<<< HEAD
    axios.post('http://localhost:8000/query', {
      url: this.state.name
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    /*
    axios.post(`http://localhost:8000/query`, { listing_url })
      .then(res => {
        console.log(res);
        console.log(res.data);
        //this.setState({ tileData: res.data})
=======
    axios.post(`http://jsonplaceholder.typicode.com/users`, { url: listing_url })
      .then(res => {
        this.setState({ tileData: res.data})
>>>>>>> f80845ef5f4909f090aeaf1df5626fbee0be90e4
      })
      */
  };

  state = {
    tileData :
      [{
        picture_url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&h=350',
        listing_id: '18461891',
        listing_url: 'https://www.airbnb.com/rooms/18461891',
      },
        {
          picture_url: 'https://a0.muscache.com/im/pictures/102394774/b3fe45ce_original.jpg?aki_policy=large',
          listing_id: '21135710',
          listing_url: 'https://www.airbnb.com/rooms/21135710',
        }],
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
