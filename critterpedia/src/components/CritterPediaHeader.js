import React from 'react';
import Selector from './Selector';
import AvailabilitySelector from './AvailabilitySelector';
import SortSelector from './SortSelector';
import CritterPediaInput from './CritterPediaInput';

import locations from '../data/locations.json';
import shadows from '../data/shadows.json';
import availabilityTypes from '../data/availabilityTypes.json';

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

export default CritterPediaHeader;