import React from 'react';
import PropTypes from 'prop-types';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

class Selector extends React.Component {
  constructor(props) {
    super(props);
    const { filterName } = props;
    this.selectItem = this.selectItem.bind(this);
    this.state = {
      selectedItem: `Select ${filterName}`,
    };
  }

  selectItem(id, name) {
    const { selectItemHandler } = this.props;
    this.setState({
      selectedItem: name,
    });
    selectItemHandler(id);
  }

  renderSelectorItem(id, name) {
    return (
      <Dropdown.Item key={id} id={id} onSelect={() => { this.selectItem(id, name); }}>{name}</Dropdown.Item>
    );
  }

  render() {
    const { items } = this.props;
    const { selectedItem } = this.state;
    return (
      <DropdownButton variant="outline-info" title={selectedItem}>
        {(() => items.map(({ id, name }) => this.renderSelectorItem(id, name)))()}
      </DropdownButton>
    );
  }
}
Selector.defaultProps = {
  selectItemHandler: undefined,
};

Selector.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number.isRequired, name: PropTypes.string.isRequired })).isRequired,
  filterName: PropTypes.string.isRequired,
  selectItemHandler: PropTypes.func,
};

export default Selector;
