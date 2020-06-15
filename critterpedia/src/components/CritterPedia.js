import React from 'react';
import Nav from 'react-bootstrap/Nav'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'


import fishesData from './../data/fishes.json';
import bugsData from './../data/bugs.json';
import locationsFishes from './../data/locations.json';
import locationsBugs from './../data/locationsBugs.json';

import CritterPediaCell from './CritterPediaCell';
import CritterPediaHeader from './CritterPediaHeader';
import CritterPediaDetail from './CritterPediaDetail';

import {CRITTER_TYPE, CRITTER_TYPE_NAME} from '../constants';
const locations = {
  [CRITTER_TYPE.FISH]: locationsFishes,
  [CRITTER_TYPE.BUG]: locationsBugs
};

const data = {
  [CRITTER_TYPE.FISH]: fishesData,
  [CRITTER_TYPE.BUG]: bugsData
};


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
      critterType: CRITTER_TYPE.FISH,
      critters: data,
      selectedItem: fishesData[0],
      showModal: false,
      locationType: undefined,
      shadowType: undefined,
      availableTypeFn: undefined,
      sort: {}
    };
  }
  updateCritters(nextState) {
    const type = nextState.critterType;
    const locationFilter = nextState.locationType;
    const shadowFilter = nextState.shadowType;
    const availableTypeFilterFn = nextState.availableTypeFn;
    const { sortFn, keyToSort } = nextState.sort;

    const dataToFilter = data[type];
    let filteredData = dataToFilter.filter(critter => (locationFilter ? (critter.location === locationFilter) : true));
    filteredData = filteredData.filter(critter => (shadowFilter ? (critter.shadowType === shadowFilter) : true));
    if (availableTypeFilterFn && this[availableTypeFilterFn]) {
      filteredData = this[availableTypeFilterFn](filteredData);
    }
    if (sortFn) {
      filteredData = filteredData.sort((a, b) => sortFn(a, b, keyToSort));
    }
    this.setState({
      critters: {
        [type]: filteredData
      }
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
    const critterType = this.state.critterType;
    const dataToFilter = data[critterType];
    const filteredData = dataToFilter.filter(critter => (!text || critter.name.toLowerCase().includes(text.toLowerCase())));
    this.setState({
      critters: {
        [critterType]: filteredData
      }
    });
  }
  sortBy(sortFn, keyToSort) {
    this.setState({
      sort: { sortFn, keyToSort }
    });
  }
  renderCell(critter, location, critterType) {
    return <CritterPediaCell critterType={critterType} key={critter.id} critter={critter} location={location} showModal={this.showModal} />
  }

  hasChangesInFilters(currentState, nextState) {
    return currentState.locationType !== nextState.locationType ||
      currentState.shadowType !== nextState.shadowType ||
      currentState.availableTypeFn !== nextState.availableTypeFn ||
      currentState.sort !== nextState.sort;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.hasChangesInFilters(this.state, nextState)) {
      this.updateCritters(nextState);
    }
    return this.state !== nextState;
  }

  setCritterType(type) {
    this.setState({
      critterType: type,
      critters: data,
      selectedItem: data[type][0]
    });
  }
  render() {
    const fishTabImage = `${process.env.PUBLIC_URL}/images/${this.state.critterType === CRITTER_TYPE.FISH ? 'fishLight' : 'fish'}.png`;
    const bugTabImage = `${process.env.PUBLIC_URL}/images/${this.state.critterType === CRITTER_TYPE.BUG ? 'bugLight' : 'bug'}.png`;
    return (
      <div className="critterpedia">
        <CritterPediaHeader critterType={this.state.critterType} selectLocationHandler={this.selectItem} selectShadowTypeHandler={this.selectShadowType} selectItemWithFnHandler={this.selectItemWithFn} handleSearchChange={this.searchChange} sortByHandler={this.sortBy} />
        <Nav variant="tabs" defaultActiveKey={CRITTER_TYPE.FISH} onSelect={(critter) => this.setCritterType(critter)} className="tabs">
          <Nav.Item>
            <Nav.Link eventKey={CRITTER_TYPE.FISH} title={CRITTER_TYPE_NAME.FISH} className="tab fish"><img src={fishTabImage} /></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CRITTER_TYPE.BUG} title={CRITTER_TYPE_NAME.BUG} className="tab bug"><img src={bugTabImage} /></Nav.Link>
          </Nav.Item>
        </Nav>
        <CritterPediaDetail critterType={this.state.critterType} showModal={this.state.showModal} critter={this.state.selectedItem} hideModal={this.hideModal} />
        <div className="critterpedia-grid">
          {(() => {
            const critterType = this.state.critterType;
            const critters = this.state.critters[this.state.critterType] || [];
            const critterLocations = locations[this.state.critterType];
            return critters.map((critter) => {
              const critterLocation = critterLocations.find(location => (critter.location === location.id));
              return this.renderCell(critter, critterLocation, critterType);
            });
          })()
          }
        </div>
      </div >
    );
  }
}

export default CritterPedia;