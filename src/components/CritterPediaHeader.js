import React from 'react';
import PropTypes from 'prop-types';
import Selector from './Selector';
import AvailabilitySelector from './AvailabilitySelector';
import SortSelector from './SortSelector';
import CritterPediaInput from './CritterPediaInput';

import locationsFishes from '../data/locations.json';
import locationsBugs from '../data/locationsBugs.json';
import shadows from '../data/shadows.json';
import availabilityTypes from '../data/availabilityTypes.json';

import { CRITTER_TYPE } from '../constants';

const locations = {
  fish: locationsFishes,
  bug: locationsBugs,
};

function CritterPediaHeader(props) {
  let shadowSelector;
  const {
    critterType,
    selectShadowTypeHandler,
    selectLocationHandler,
    selectItemWithFnHandler,
    sortByHandler,
    handleSearchChange,
  } = props;
  if (critterType === CRITTER_TYPE.FISH) {
    shadowSelector = (
      <Selector
        selectItemHandler={selectShadowTypeHandler}
        items={shadows}
        filterName="Shadow Type"
      />
    );
  }
  return (
    <div className="critterpedia-header">
      <Selector selectItemHandler={selectLocationHandler} items={locations[critterType]} filterName="Location" />
      {shadowSelector}
      <AvailabilitySelector selectItemWithFnHandler={selectItemWithFnHandler} items={availabilityTypes} filterName="Availability Type" />
      <SortSelector sortBy={sortByHandler} />
      <CritterPediaInput handleSearchChange={handleSearchChange} />
    </div>
  );
}
CritterPediaHeader.defaultProps = {
  selectShadowTypeHandler: undefined,
};

CritterPediaHeader.propTypes = {
  critterType: PropTypes.string.isRequired,
  selectShadowTypeHandler: PropTypes.func,
  selectLocationHandler: PropTypes.func.isRequired,
  selectItemWithFnHandler: PropTypes.func.isRequired,
  sortByHandler: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
};

export default CritterPediaHeader;
