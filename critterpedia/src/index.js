import React from 'react';
import ReactDOM from 'react-dom';
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import './index.scss';
import fishesData from './data/fishes.json';
import shadows from './data/shadows.json';
import locations from './data/locations.json';
import availabilityTypes from './data/availabilityTypes.json';
import Button from 'react-bootstrap/Button';

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
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.state = {
      fishes: fishesData,
      selectedItem: fishesData[0],
      showModal: false
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
  leaveThisMonth() {
  }

  showModal(item) {
    this.setState({
      selectedItem: item,
      showModal: true
    });
  }

  hideModal(){
    this.setState({
      showModal: false
    });
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
    return <CritterPediaCell key={critter.id} critter={critter} location={location} showModal={this.showModal} />
  }
  render() {
    return (
      <div className="critterpedia">
        <CritterPediaHeader selectLocationHandler={this.selectItem} selectShadowTypeHandler={this.selectShadowType} selectItemWithFnHandler={this.selectItemWithFn} handleSearchChange={this.searchChange} sortByHandler={this.sortBy} />
        <CritterPediaItem showModal={this.state.showModal} item={this.state.selectedItem} hideModal={this.hideModal}/>
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
      <div className="critterpedia-header">
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
      <Button className="criterpedia-cell-button" onClick={() => { this.props.showModal(this.props.critter)}} >
        <Badge pill variant="warning">
        {this.props.critter.name}
        </Badge>
        <img src={require(`./data/images/fish${this.props.critter.id}.png`)} />
        </Button>
      </div>);
  }
}

class CritterPediaItem extends React.Component {
  render() {
    return (<div className="critterpedia-item">
      <Modal show={this.props.showModal} onHide={this.props.hideModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.item.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Card style={{ width: '100%' }}>
          <Card.Img className="critterpedia-item-img" variant="top" src={require(`./data/images/fish${this.props.item.id}.png`)} />
          <Card.Body>
            <Card.Title>{this.props.item.id}. {this.props.item.name}<br /></Card.Title>
            <Card.Text>
              Price: {this.props.item.price} <br/>
              ShowType: {shadows[this.props.item.shadowType - 1].name}<br/>
              Habitat: {locations[this.props.item.location - 1].name}<br/>
            </Card.Text>
          </Card.Body>
        </Card>
        </Modal.Body>
      </Modal>
    </div>);
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