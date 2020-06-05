'use strict';

import React from 'react';

import fishesData from './../data/fishes.json';
import locations from './../data/locations.json';

import CritterPediaCell from './CritterPediaCell';
import CritterPediaHeader from './CritterPediaHeader';
import CritterPediaDetail from './CritterPediaDetail';


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

  hideModal() {
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
        <CritterPediaDetail showModal={this.state.showModal} item={this.state.selectedItem} hideModal={this.hideModal} />
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

export default CritterPedia;