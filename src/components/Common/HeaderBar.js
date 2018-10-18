import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// material styles
const styles = theme => ({
  appBar: {
    position: 'absolute',
    backgroundColor: '#333333', // '#0084C7',
    height: '54px',
    color: '#fff',
    zIndex: theme.zIndex.navDrawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    button: {
        right: '20px'
    }
  },
  logo: {
      alignSelf: 'center',
      marginTop: '10px',
      marginBottom:'10px'
  }

});

const appbar = (Actions) => (props) => (
    <AppBar className={props.classes.appBar} position="static" color="default">
        <Toolbar>
            <Typography variant="title" color="inherit" className="logo-header">
            VAS Appraisal Explorer
            </Typography>
        </Toolbar>
    </AppBar>
);

const styledAppbar = () => (
    withStyles(styles, { withTheme: true })(appbar())
)

export default styledAppbar;