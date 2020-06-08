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
      showModal: false,
      locationType: undefined,
      shadowType: undefined,
      availableTypeFn: undefined,
      sort: {}
    };
  }
  updateFishes(nextState) {
    const locationFilter = nextState.locationType;
    const shadowFilter = nextState.shadowType;
    const availableTypeFilterFn = nextState.availableTypeFn;
    const { sortFn, keyToSort } = nextState.sort;

    let filteredFishes = fishesData.filter(fish => (locationFilter ? (fish.location === locationFilter) : true));
    filteredFishes = filteredFishes.filter(fish => (shadowFilter ? (fish.shadowType === shadowFilter) : true));
    if (availableTypeFilterFn && this[availableTypeFilterFn]) {
      filteredFishes = this[availableTypeFilterFn](filteredFishes);
    }
    if (sortFn) {
      filteredFishes = filteredFishes.sort((a, b) => sortFn(a, b, keyToSort));
    }
    this.setState({
      fishes: filteredFishes
    });
  }

  selectItem(id) {
    this.setState({
      locationType: id
    });
  }

  availableNow(fishesData) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMonth = (now.getMonth() + 1);
    return fishesData.filter(fish => (fish.hoursAvailable && fish.hoursAvailable.includes(currentHour) && fish.monthsAvailable && fish.monthsAvailable.includes(currentMonth)));
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
    this.setState({
      availableTypeFn: fnName
    });
  }

  selectShadowType(id) {
    this.setState({
      shadowType: id
    });
  }
  searchChange(text) {
    const filterdFishes = fishesData.filter(fish => (!text || fish.name.toLowerCase().includes(text.toLowerCase())));
    this.setState({
      fishes: filterdFishes
    });
  }
  sortBy(sortFn, keyToSort) {
    this.setState({
      sort: { sortFn, keyToSort }
    });
  }
  renderCell(critter, location) {
    return <CritterPediaCell key={critter.id} critter={critter} location={location} showModal={this.showModal} />
  }

  hasChangesInFilters(currentState, nextState) {
    return currentState.locationType !== nextState.locationType ||
      currentState.shadowType !== nextState.shadowType ||
      currentState.availableTypeFn !== nextState.availableTypeFn ||
      currentState.sort !== nextState.sort;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.hasChangesInFilters(this.state, nextState)) {
      this.updateFishes(nextState);
    }
    return this.state !== nextState;
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