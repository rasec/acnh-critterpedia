import React from 'react';
import ReactDOM from 'react-dom';
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import './index.scss';
import fishesData from './data/fishes.json';
import locations from './data/locations.json';

class CritterPediaTable extends React.Component {
  constructor(props) {
    super(props);
    this.selectItem = this.selectItem.bind(this);
    this.state = {
      fishes: fishesData,
    };
  }
  selectItem(id) {
    const fishes = fishesData.filter(fish => (fish.location === id));
    this.setState({
      fishes
    });
  }
  renderCell(critter, location) {
    return <CritterPediaCell key={critter.id} critter={critter} location={location} />
  }
  render() {
    return (
      <div className="critterpedia">
        <PlaceSelector selectItem={this.selectItem} />
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

class CritterPediaCell extends React.Component {
  render() {
    return (<div className="critterpedia-cell" id={this.props.critter.id}><img src={require(`./data/images/fish${this.props.critter.id}.png`)} />{this.props.location.name}</div>);
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
    this.state = {
      selectedItem: 'Select a location',
    };
  }
  selectItem(id, name) {
    this.setState({
      selectedItem: name
    });
    this.props.selectItem(id)
  }
  renderSelectorItem(id, name, selectItem) {
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

ReactDOM.render(
  <CritterPediaTable />,
  document.getElementsByTagName('body')[0]
);