import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import Selector from './Selector';

class AvailabilitySelector extends Selector {
  selectItem(name, fnName) {
    this.setState({
      selectedItem: name,
    });
    this.props.selectItemWithFnHandler(fnName);
  }

  renderSelectorItem(id, name, fnName) {
    return (
      <Dropdown.Item key={id} onSelect={() => { this.selectItem(name, fnName); }}>
        {name}
      </Dropdown.Item>
    );
  }

  render() {
    return (
      <DropdownButton variant="outline-info" title={this.state.selectedItem}>
        {(() => this.props.items.map(({ id, name, fnName }) => this.renderSelectorItem(id, name, fnName)))()}
      </DropdownButton>
    );
  }
}

export default AvailabilitySelector;
