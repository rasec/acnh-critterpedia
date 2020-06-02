import React from 'react';
import ReactDOM from 'react-dom';
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import './index.scss';
import fishesData from './data/fishes.json';
import shadows from './data/shadows.json';
import locations from './data/locations.json';

const sortTypes = [
  {
    name: 'id',
    keyToSort: 'id',
    sortFn: (a, b, keyToSort) => (a[keyToSort] - b[keyToSort])
  },
  {
    name: 'Price',
    keyToSort: 'price',
    sortFn: (a, b, keyToSort) => (b[keyToSort] - a[keyToSort])
  }
];

class CritterPedia extends React.Component {
  constructor(props) {
    super(props);
    this.selectItem = this.selectItem.bind(this);
    this.searchChange = this.searchChange.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.state = {
      fishes: fishesData,
    };
  }
  selectItem(id) {
    const filterdFishes = fishesData.filter(fish => (fish.location === id));
    this.setState({
      fishes: filterdFishes
    });
  }
  searchChange(text) {
    const filterdFishes = fishesData.filter(fish => (!text || fish.name.toLowerCase().includes(text.toLowerCase())));
    this.setState({
      fishes: filterdFishes
    });
  }
  sortBy(sortFn, keyToSort) {
    const sortedFishes = fishesData.sort((a, b) => sortFn(a, b, keyToSort));
    this.setState({
      fishes: sortedFishes
    });
  }
  renderCell(critter, location) {
    return <CritterPediaCell key={critter.id} critter={critter} location={location} />
  }
  render() {
    return (
      <div className="critterpedia">
        <CritterPediaHeader selectLocationHandler={this.selectItem} handleSearchChange={this.searchChange} sortByHandler={this.sortBy} />
        <div className="critterpedia-grid">
          {(() => {
            return this.state.fishes.map((fish) => {
              const fishLocation = locations.find(location => (fish.location === location.id));
              return this.renderCell(fish, fishLocation);
            });
          })()
          }
        </div>
      </div >
    );
  }
}

class CritterPediaHeader extends React.Component {
  render() {
    return (
      <div class="critterpedia-header">
        <PlaceSelector selectItemHandler={this.props.selectLocationHandler} />
        <SortSelector sortBy={this.props.sortByHandler} />
        <CritterPediaInput handleSearchChange={this.props.handleSearchChange} />
      </div>
    )
  }
}

class CritterPediaCell extends React.Component {
  render() {
    return (<div className="critterpedia-cell" id={this.props.critter.id}>
      <img src={require(`./data/images/fish${this.props.critter.id}.png`)} />
      {this.props.critter.id}. {this.props.critter.name}<br />
      {this.props.critter.price}<br />
      {shadows[this.props.critter.shadowType - 1].name}</div>);
  }
}

class CritterPediaItem extends React.Component {
  render() {
    return (<div className="critterpedia-item"></div>);
  }
}

class PlaceSelector extends React.Component {
  constructor(props) {
    super(props);
    this.selectItem = this.selectItem.bind(this);
    this.state = {
      selectedItem: 'Select a location',
    };
  }
  selectItem(id, name) {
    this.setState({
      selectedItem: name
    });
    this.props.selectItemHandler(id)
  }
  renderSelectorItem(id, name) {
    return (
      <Dropdown.Item key={id} id={id} onSelect={() => { this.selectItem(id, name) }}>{name}</Dropdown.Item>
    );
  }
  render() {

    return (
      <DropdownButton variant="info" title={this.state.selectedItem}>
        {(() => {
          return locations.map(({ id, name }) => {
            return this.renderSelectorItem(id, name);
          });
        })()
        }
      </DropdownButton>
    );
  }
}

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
      sortType: name
    });
    this.props.sortBy(sortFn, keyToSort)
  }
  renderSortItem({ id, name, sortFn, keyToSort }) {
    return (
      <Dropdown.Item key={id} id={id} onSelect={() => { this.sortBy({ name, sortFn, keyToSort }) }}>{name}</Dropdown.Item>
    );
  }
  render() {

    return (
      <DropdownButton variant="info" title={this.state.sortType}>
        {(() => {
          return sortTypes.map(({ id, name, keyToSort, sortFn }) => {
            return this.renderSortItem({ id, name, sortFn, keyToSort });
          });
        })()
        }
      </DropdownButton>
    );
  }
}

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

ReactDOM.render(
  <CritterPedia />,
  document.getElementsByTagName('body')[0]
);