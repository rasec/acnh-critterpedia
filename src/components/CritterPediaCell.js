import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { CRITTER_TYPE, CRITTER_TYPE_NAME } from '../constants';

function CritterPediaCell(props) {
  const { critterType, critter, showModal } = props;
  let critterUrl;
  if (critterType && critterType === CRITTER_TYPE.FISH) {
    critterUrl = `${process.env.PUBLIC_URL}/images/${CRITTER_TYPE_NAME.FISH.toLowerCase()}/`
      + `${CRITTER_TYPE.FISH.toLowerCase()}${critter.id}.png`;
  } else {
    critterUrl = `${process.env.PUBLIC_URL}/images/${CRITTER_TYPE_NAME.BUG.toLowerCase()}/`
      + `${CRITTER_TYPE.BUG.toLowerCase()}${critter.id}.png`;
  }
  return (
    <div className="critterpedia-cell" id={critter.id}>
      <Button className="criterpedia-cell-button" onClick={() => { showModal(critter); }}>
        <Badge pill variant="warning" className="critter-name">
          {critter.name}
        </Badge>
        <img src={critterUrl} alt="" />
      </Button>
    </div>
  );
}

CritterPediaCell.propTypes = {
  critterType: PropTypes.string.isRequired,
  critter: PropTypes.shape({ id: PropTypes.number.isRequired, name: PropTypes.string.isRequired }).isRequired,
  showModal: PropTypes.func.isRequired,
};

export default CritterPediaCell;
