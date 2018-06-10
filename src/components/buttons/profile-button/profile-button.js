import React from 'react';
import './profile-button.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';

  class DropDownButton extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
        <Dropdown isOpen = { this.state.dropdownOpen } toggle = { this.toggle }>
          <DropdownToggle size="sm" className="nav-btn" caret>
            <i className="fa fa-user"></i>
            Profil
          </DropdownToggle>
          <DropdownMenu>
            {this.props.children}
          </DropdownMenu>
        </Dropdown>
    );
  }
}
export default DropDownButton;