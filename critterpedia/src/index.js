import React from 'react';
import ReactDOM from 'react-dom';
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import './index.scss';
import fishesData from './data/fishes.json';
import shadows from './data/shadows.json';
import locations from './data/locations.json';
import availabilityTypes from './data/availabilityTypes.json';

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
    this.selectShadowType = this.selectShadowType.bind(this);
    this.selectItemWithFn = this.selectItemWithFn.bind(this);
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
  availableNow() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMonth = (now.getMonth() + 1);
    const filterdFishes = fishesData.filter(fish => (fish.hoursAvailable && fish.hoursAvailable.includes(currentHour) && fish.monthsAvailable && fish.monthsAvailable.includes(currentMonth)));
    this.setState({
      fishes: filterdFishes
    });
  }
  newThisMonth() {
  }
  endThisMonth() {
  }

  selectItemWithFn(fnName) {
    this[fnName]();
  }

  selectShadowType(id) {
    const filterdFishes = fishesData.filter(fish => (fish.shadowType === id));
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
        <CritterPediaHeader selectLocationHandler={this.selectItem} selectShadowTypeHandler={this.selectShadowType} selectItemWithFnHandler={this.selectItemWithFn} handleSearchChange={this.searchChange} sortByHandler={this.sortBy} />
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
        <Selector selectItemHandler={this.props.selectLocationHandler} items={locations} filterName='Location' />
        <Selector selectItemHandler={this.props.selectShadowTypeHandler} items={shadows} filterName='Shadow Type' />
        <AvailabilitySelector selectItemWithFnHandler={this.props.selectItemWithFnHandler} items={availabilityTypes} filterName='Availability Type' />
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
          return this.props.items.map(({ id, name }) => {
            return this.renderSelectorItem(id, name);
          });
        })()
        }
      </DropdownButton>
    );
  }
}

class AvailabilitySelector extends Selector {
  selectItem(name, fnName) {
    this.setState({
      selectedItem: name
    });
    this.props.selectItemWithFnHandler(fnName)
  }
  renderSelectorItem(id, name, fnName) {
    return (
      <Dropdown.Item key={id} id={id} onSelect={() => { this.selectItem(name, fnName) }}>{name}</Dropdown.Item>
    );
  }
  render() {
    return (
      <DropdownButton variant="info" title={this.state.selectedItem}>
        {(() => {
          return this.props.items.map(({ id, name, fnName }) => {
            return this.renderSelectorItem(id, name, fnName);
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