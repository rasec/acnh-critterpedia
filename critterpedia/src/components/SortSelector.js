import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const sortTypes = [
  {
    name: 'id',
    keyToSort: 'id',
    sortFn: (a, b, keyToSort) => (a[keyToSort] - b[keyToSort]),
  },
  {
    name: 'Price',
    keyToSort: 'price',
    sortFn: (a, b, keyToSort) => (b[keyToSort] - a[keyToSort]),
  },
];

class SortSelector extends React.Component {
  constructor(props) {
    super(props);
    this.sortBy = this.sortBy.bind(this);
    this.state = {
      sortType: 'Select a way of sorting...',
    };
  }

  sortBy({ name, sortFn, keyToSort }) {
    this.setState({
      sortType: name,
    });
    this.props.sortBy(sortFn, keyToSort);
  }

  renderSortItem({
    id, name, sortFn, keyToSort,
  }) {
    return (
      <Dropdown.Item key={id} id={id} onSelect={() => { this.sortBy({ name, sortFn, keyToSort }); }}>{name}</Dropdown.Item>
    );
  }

  render() {
    return (
      <DropdownButton variant="outline-info" title={this.state.sortType}>
        {(() => sortTypes.map(({
          id, name, keyToSort, sortFn,
        }) => this.renderSortItem({
          id, name, sortFn, keyToSort,
        })))()}
      </DropdownButton>
    );
  }
}

export default SortSelector;
