import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AvatarIcon from './images/avatar.png';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MyJobsIcon from './images/MyJobsIcon.png';
import ExploreIcon from './images/ExplorerIcon.png';
import ExploreIconInverse from './images/ExplorerIconInverse.png';
import ConflictCheckIcon from './images/ConflictCheckicon.png';
import SalesCompIcon from './images/SalesCompsIcon.png';
import MarketSphereIcon from './images/MarketSphereIcon.png';
import TreppIcon from './images/Trepp.png';
import ListItem from '@material-ui/core/ListItem';
import JobExplorerContainer from '../../containers/JobExplorerContainer';
import ConflictCheck from '../../components/ConflictCheck/ConflictCheck';
import MarketSphere from '../../components/MarketSphere/MarketSphere';
import Jobs from '../../components/MyJobs/Jobs';
import Trepp from '../../components/Trepp/Trepp';
import * as tokenService from '../../services/TokenService';
import logo from './images/JLLLogo1.png';
import leftarrow from './images/leftarrow.png';
import BackspaceIcon from '@material-ui/icons/Backspace';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    Link
  } from "react-router-dom";

const drawerWidth = 240;

const allListItems = (
    <div >      
      <ListItem button component={Link} to='/jobs'>       
        <img src={MyJobsIcon}/>     
        <span className="leftmenuitemtext">My Jobs</span>
      </ListItem>
      <Divider className="leftmenuDividerLine" />    
      <ListItem button component={Link} to='/VAS'>
        <img src={ExploreIcon}/>
        <span className="leftmenuitemtext">Explorer</span>
      </ListItem>
      <Divider className="leftmenuDividerLine" />
      <ListItem button component={Link} to='/ConflictCheck' >
        <img src={ConflictCheckIcon}/>
        <span className="leftmenuitemtext">Conflict Check</span>
      </ListItem>
      <Divider className="leftmenuDividerLine" />  
      <ListItem button component={Link} to='/salescomp'>
        <img src={SalesCompIcon}/>
        <span className="leftmenuitemtext">Sales Comp</span>
      </ListItem> 
       <Divider className="leftmenuDividerLine" />
      <ListItem button component={Link} to='/MarketSphere'>
        <img src={MarketSphereIcon}/>
        <span className="leftmenuitemtext">MarketSphere</span>
      </ListItem>
      <Divider className="leftmenuDividerLine" />  
      <ListItem button component={Link} to='/Trepp'>
        <img src={TreppIcon}/>
        <span className="leftmenuitemtext">Trepp</span>
      </ListItem>
      <Divider className="leftmenuDividerLine" />  
    </div>
  );


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: '95%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    backgroundColor: 'Black',
    color: '#fff',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  'appBarShift-right': {
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    backgroundColor: 'Black',
  },
  drawerHeader: {   
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    width: '550px',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  'content-right': {
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  'contentShift-right': {
    marginRight: 0,
  },
});

class Layout extends React.Component {

  state = {
    open: false,
    anchor: 'left',
  };

  constructor(props) {
    super(props);        
    if (this.props.open == "true")
    {
     this.state.open = true;        
    }
  }



  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChangeAnchor = event => {
    this.setState({
      anchor: event.target.value,
    });
  };

  render() {

   
    const { classes, theme } = this.props;
    const { anchor, open } = this.state;

    const drawer = (
      <Drawer
        variant="persistent"
        anchor={anchor}
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        className="leftbarDrawer"
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            <img src={leftarrow} title="Close Menu" className="backspaceIcon" onClick={this.handleDrawerClose} />
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>{allListItems}</List>
        <Divider />       
      </Drawer>
    );
     
    return (
      <div className={classes.root}>      
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-${anchor}`]]: open,
            })}
          >
            <Toolbar disableGutters={!open}>          
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton> 
              <img src={logo} title="JLL" className="jlllogo"/>         
             
              <Typography variant="title" color="inherit" noWrap className="toolBarTitle" >
             
             <div className="logo-header-area">
              <Switch>
              <Route exact path="/VAS" render={ ()=> <img src={ExploreIconInverse}/> } />
              <Route exact path="/ConflictCheck" render={ ()=> <img src={ConflictCheckIcon}/> } />
              <Route exact path="/MarketSphere" render={ ()=> <img src={MarketSphereIcon}/> } />
              <Route exact path="/Trepp" render={ ()=> <img src={TreppIcon}/> } />
              <Route exact path="/Jobs" render={ ()=> <img src={MyJobsIcon}/> } />
               </Switch> 
              <span>{this.props.displayName}</span>
              </div>
              </Typography>
              <div className="logo-header-profile">  User: {tokenService.getOktaUserName()}</div>
            </Toolbar>
          </AppBar>
          {drawer}
          <main
            className={classNames(classes.content, classes[`content-${anchor}`], {
              [classes.contentShift]: open,
              [classes[`contentShift-${anchor}`]]: open,
            })}
          >
            <Switch>
             <Route exact path="/VAS" render={ ()=> <JobExplorerContainer /> } />
             <Route exact path="/ConflictCheck" render={ ()=> <ConflictCheck /> } />
             <Route exact path="/MarketSphere" render={ ()=> <MarketSphere /> } />
             <Route exact path="/Trepp" render={ ()=> <Trepp /> } />
             <Route exact path="/Jobs" render={ ()=> <Jobs /> } />
            </Switch> 
          </main>
        </div>
      </div>
    );
  }
}
Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Layout);