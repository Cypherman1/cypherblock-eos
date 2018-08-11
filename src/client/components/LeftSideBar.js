import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import query from '../queries/CurrentUser';
import Sidebar from './SideBar';

class LeftSideBar extends Component {
  render() {
    const {loadding, user} = this.props.data;
    if (loadding) {
      return <Sidebar />;
    }
    if (user) {
      return <Sidebar />;
    } else {
      return <Sidebar />;
    }
  }
}

export default graphql(query)(LeftSideBar);
