import React from 'react';

class CritterPediaInput extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.handleSearchChange(event.target.value);
  }

  render() {
    return (<input placeholder="enter name..." onChange={this.handleChange} />);
  }
}
export default CritterPediaInput;