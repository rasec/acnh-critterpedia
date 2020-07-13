import React from 'react';
import PropTypes from 'prop-types';

class CritterPediaInput extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { handleSearchChange } = this.props;
    handleSearchChange(event.target.value);
  }

  render() {
    return (<input placeholder="enter name..." onChange={this.handleChange} />);
  }
}
CritterPediaInput.propTypes = {
  handleSearchChange: PropTypes.func.isRequired,
};
export default CritterPediaInput;
