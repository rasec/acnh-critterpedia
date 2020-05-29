import React from 'react';
import ReactDOM from 'react-dom';
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import './index.scss';
import fishesData from './data/fishes.json';
import locations from './data/locations.json';

class CritterPedia extends React.Component {
  constructor(props) {
    super(props);
    this.selectItem = this.selectItem.bind(this);
    this.searchChange = this.searchChange.bind(this);
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
  renderCell(critter, location) {
    return <CritterPediaCell key={critter.id} critter={critter} location={location} />
  }
  render() {
    return (
      <div className="critterpedia">
        <CritterPediaHeader selectLocationHandler={this.selectItem} handleSearchChange={this.searchChange} />
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
        <CritterPediaInput handleSearchChange={this.props.handleSearchChange} />
      </div>
    )
  }
}

class CritterPediaCell extends React.Component {
  render() {
    return (<div className="critterpedia-cell" id={this.props.critter.id}><img src={require(`./data/images/fish${this.props.critter.id}.png`)} />{this.props.critter.id}. {this.props.critter.name}</div>);
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