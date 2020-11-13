import React from 'react';
import PropTypes from 'prop-types';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const sortTypes = [
  {
    id: 'id',
    name: 'id',
    keyToSort: 'id',
    sortFn: (a, b, keyToSort) => (a[keyToSort] - b[keyToSort]),
  },
  {
    id: 'price',
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
    const { sortBy } = this.props;
    this.setState({
      sortType: name,
    });
    sortBy(sortFn, keyToSort);
  }

  renderSortItem({
    id, name, sortFn, keyToSort,
  }) {
    return (
      <Dropdown.Item key={id} id={id} onSelect={() => { this.sortBy({ name, sortFn, keyToSort }); }}>{name}</Dropdown.Item>
    );
  }

  render() {
    const { sortType } = this.state;
    return (
      <DropdownButton variant="outline-info" title={sortType}>
        {(() => sortTypes.map(({
          id, name, keyToSort, sortFn,
        }) => this.renderSortItem({
          id, name, sortFn, keyToSort,
        })))()}
      </DropdownButton>
    );
  }
}

SortSelector.propTypes = {
  sortBy: PropTypes.func.isRequired,
};

export default SortSelector;
