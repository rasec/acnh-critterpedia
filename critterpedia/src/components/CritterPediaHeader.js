import React from 'react';
import Selector from './Selector';
import AvailabilitySelector from './AvailabilitySelector';
import SortSelector from './SortSelector';
import CritterPediaInput from './CritterPediaInput';

import locationsFishes from '../data/locations.json';
import locationsBugs from '../data/locationsBugs.json';
import shadows from '../data/shadows.json';
import availabilityTypes from '../data/availabilityTypes.json';

import {CRITTER_TYPE} from '../constants';

const locations = {
  fish: locationsFishes,
  bug: locationsBugs
};

class CritterPediaHeader extends React.Component {
  render() {
    let shadowSelector;
    if(this.props.critterType === CRITTER_TYPE.FISH) {
      shadowSelector = <Selector selectItemHandler={this.props.selectShadowTypeHandler} items={shadows} filterName='Shadow Type' />;
  }
    return (
      <div className="critterpedia-header">
        <Selector selectItemHandler={this.props.selectLocationHandler} items={locations[this.props.critterType]} filterName='Location' />
        {shadowSelector}
        <AvailabilitySelector selectItemWithFnHandler={this.props.selectItemWithFnHandler} items={availabilityTypes} filterName='Availability Type' />
        <SortSelector sortBy={this.props.sortByHandler} />
        <CritterPediaInput handleSearchChange={this.props.handleSearchChange} />
      </div>
    );
  }
}

export default CritterPediaHeader;