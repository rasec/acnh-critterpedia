import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import locationsFishes from '../data/locations.json';
import locationsBugs from '../data/locationsBugs.json';

import { CRITTER_TYPE, CRITTER_TYPE_NAME } from '../constants';

const locations = {
  [CRITTER_TYPE.FISH]: locationsFishes,
  [CRITTER_TYPE.BUG]: locationsBugs,
};

const getClassNameMonth = (monthNumber, monthsAvailable) => {
  let className = 'month';
  if (monthsAvailable.includes(monthNumber)) {
    className = `${className} filled`;
  }

  if (((new Date()).getMonth() + 1) === monthNumber) {
    className = `${className} current`;
  }
  return className;
};

const getClassNameHour = (hourNumber, hoursAvailable) => {
  let className = 'hour';
  if (hoursAvailable.includes(hourNumber)) {
    className = `${className} filled`;
  }

  if (hourNumber % 6 === 0) {
    className = `${className} marked`;
  }

  if (((new Date()).getHours()) === hourNumber) {
    className = `${className} current`;
  }
  return className;
};

function Calendar({ months }) {
  return (
    <div className="calendar cols2-content">
      <div className="row">
        <div className={getClassNameMonth(1, months)}>Jan.</div>
        <div className={getClassNameMonth(2, months)}>Feb.</div>
        <div className={getClassNameMonth(3, months)}>Mar.</div>
        <div className={getClassNameMonth(4, months)}>Apr.</div>
      </div>
      <div className="row">
        <div className={getClassNameMonth(5, months)}>May</div>
        <div className={getClassNameMonth(6, months)}>June</div>
        <div className={getClassNameMonth(7, months)}>July</div>
        <div className={getClassNameMonth(8, months)}>Aug.</div>
      </div>
      <div className="row">
        <div className={getClassNameMonth(9, months)}>Sept.</div>
        <div className={getClassNameMonth(10, months)}>Oct.</div>
        <div className={getClassNameMonth(11, months)}>Nov.</div>
        <div className={getClassNameMonth(12, months)}>Dev</div>
      </div>
    </div>
  );
}

function ActiveHoursBar({ hours }) {
  return (
    <div className="hoursBar cols2-content">
      <span className={getClassNameHour(0, hours)} />
      <span className={getClassNameHour(1, hours)} />
      <span className={getClassNameHour(2, hours)} />
      <span className={getClassNameHour(3, hours)} />
      <span className={getClassNameHour(4, hours)} />
      <span className={getClassNameHour(5, hours)} />
      <span className={getClassNameHour(6, hours)} />
      <span className={getClassNameHour(7, hours)} />
      <span className={getClassNameHour(8, hours)} />
      <span className={getClassNameHour(9, hours)} />
      <span className={getClassNameHour(10, hours)} />
      <span className={getClassNameHour(11, hours)} />
      <span className={getClassNameHour(12, hours)} />
      <span className={getClassNameHour(13, hours)} />
      <span className={getClassNameHour(14, hours)} />
      <span className={getClassNameHour(15, hours)} />
      <span className={getClassNameHour(16, hours)} />
      <span className={getClassNameHour(17, hours)} />
      <span className={getClassNameHour(18, hours)} />
      <span className={getClassNameHour(19, hours)} />
      <span className={getClassNameHour(20, hours)} />
      <span className={getClassNameHour(21, hours)} />
      <span className={getClassNameHour(22, hours)} />
      <span className={getClassNameHour(23, hours)} />
    </div>
  );
}

function CritterPediaDetail(props) {
  const {
    critterType,
    critter,
    showModal,
    hideModal,
  } = props;

  let shadow; let
    critterUrl;
  if (critterType && critterType === CRITTER_TYPE.FISH) {
    shadow = (
      <div className="cardCell">
        <span className="title">ShadowType</span>
        {' '}
        <img
          className="critterpedia-shadow-img"
          src={`${process.env.PUBLIC_URL}/images/shadows/shadow${critter.shadowType}.png`}
          alt=""
        />
      </div>
    );
    critterUrl = `${process.env.PUBLIC_URL}/images/${CRITTER_TYPE_NAME.FISH.toLowerCase()}/`
      + `${CRITTER_TYPE.FISH.toLowerCase()}${critter.id}.png`;
  } else {
    critterUrl = `${process.env.PUBLIC_URL}/images/${CRITTER_TYPE_NAME.BUG.toLowerCase()}/`
      + `${CRITTER_TYPE.BUG.toLowerCase()}${critter.id}.png`;
  }
  const critterLocations = locations[critterType];

  return (
    <div>
      <Modal show={showModal} onHide={hideModal} size="lg" centered className="critterpedia-item-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            <Badge variant="light">{critter.name}</Badge>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card style={{ width: '100%' }}>
            <Card.Img className="critterpedia-item-img" variant="top" src={critterUrl} />
            <Card.Body>
              <div className="">
                <div className="cardRow row2">
                  <div className="cardCell">
                    <div className="title">Seasonality</div>
                    <Calendar months={critter.monthsAvailable} />
                  </div>
                  <div className="cardCell">
                    <div className="title">Current Active Hours</div>
                    <ActiveHoursBar hours={critter.hoursAvailable} />
                  </div>
                </div>
                <div className={`cardRow ${(critterType && critterType === CRITTER_TYPE.FISH) ? 'row3' : 'row2'} withBorder`}>
                  <div className="cardCell">
                    <span className="title">Location</span>
                    {' '}
                    {critterLocations[critter.location].name}
                  </div>
                  <div className="cardCell">
                    <span className="title">Price</span>
                    {' '}
                    {critter.price}
                  </div>
                  {shadow}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </div>
  );
}

CritterPediaDetail.propTypes = {
  critter: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    location: PropTypes.number.isRequired,
    hoursAvailable: PropTypes.arrayOf(PropTypes.number).isRequired,
    monthsAvailable: PropTypes.arrayOf(PropTypes.number).isRequired,
    shadowType: PropTypes.number,
  }).isRequired,
  critterType: PropTypes.string.isRequired,
  showModal: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]).isRequired,
  hideModal: PropTypes.func.isRequired,
};

ActiveHoursBar.propTypes = {
  hours: PropTypes.arrayOf(PropTypes.number).isRequired,
};

Calendar.propTypes = {
  months: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default CritterPediaDetail;
