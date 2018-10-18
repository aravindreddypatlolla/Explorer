import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListIcon from '@material-ui/icons/List';
import ExploreIcon1 from '@material-ui/icons/Explore';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import AllOutIcon from '@material-ui/icons/AllOut';
import HistoryIcon from '@material-ui/icons/History';
import MenuIcon from '@material-ui/icons/Menu';
import menuimage from './images/menu.png';
import MyJobsIcon from './images/MyJobsIcon.png';
import ExploreIcon from './images/ExplorerIcon.png';
import ConflictCheckIcon from './images/ConflictCheckicon.png';
import SalesCompIcon from './images/SalesCompsIcon.png';
import MarketSphereIcon from './images/ConflictCheckicon.png';
import TreppIcon from './images/ConflictCheckicon.png';
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
 

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};


const allListItems = (
    <div >      
      <ListItem button component={Link} to='/jobs'>       
        <img src={MyJobsIcon}/>     
        <span className="leftmenuitemtext">My Jobs Test</span>
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
    </div>
  );

class LeftBar extends Component {

  constructor(props) {
    super(props);    
    this.state.left = props.menuOption == null || props.menuOption == undefined  ? false : true;      
  }
  sideList
  state = {
    left: true,
  };

  
  toggleDrawer = (side, open) => () => {
    console.log(this.state.left);
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;
    console.log('list', allListItems);
    const sideList = (
      <div className={classes.list}>
        <List>{allListItems}</List>
        <Divider />        
      </div>
    );
 
    //<Button onClick={this.toggleDrawer('left', true)} className="leftbarMenu">Menu</Button>
    // <MenuIcon onClick={this.toggleDrawer('left', true)} title="Menu" className="leftbarMenu" />
    return (
      <div> 
        <img src={menuimage} onClick={this.toggleDrawer('left', true)} title="Menu" className="leftbarMenu" />        
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)} classes="leftbarDrawer">
          <div className="leftMenu"            
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>        
      </div>
    );
  }
}

LeftBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LeftBar);