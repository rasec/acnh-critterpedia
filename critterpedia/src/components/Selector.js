import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

class Selector extends React.Component {
  constructor(props) {
    super(props);
    this.selectItem = this.selectItem.bind(this);
    this.state = {
      selectedItem: `Select ${this.props.filterName}`,
    };
  }

  selectItem(id, name) {
    this.setState({
      selectedItem: name,
    });
    this.props.selectItemHandler(id);
  }

  renderSelectorItem(id, name) {
    return (
      <Dropdown.Item key={id} id={id} onSelect={() => { this.selectItem(id, name); }}>{name}</Dropdown.Item>
    );
  }

  render() {
    return (
      <DropdownButton variant="outline-info" title={this.state.selectedItem}>
        {(() => this.props.items.map(({ id, name }) => this.renderSelectorItem(id, name)))()}
      </DropdownButton>
    );
  }
}

export default Selector;
