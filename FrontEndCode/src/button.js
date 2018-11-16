import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class FloatingActionButtons extends Component{
  render(){
    const { classes, getRecommendedListings } = this.props;
    return (
      <div>
        <Button variant="contained" color="primary" className={classes.button} onClick={getRecommendedListings}>
          Recommend listings
          <Icon className={classes.rightIcon}>send</Icon>
        </Button>
      </div>
    );
  }
}

FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingActionButtons);
