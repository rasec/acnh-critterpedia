import React from 'react';
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

function Calendar(props) {
  return (
    <div className="calendar cols2-content">
      <div className="row">
        <div className={getClassNameMonth(1, props.months)}>Jan.</div>
        <div className={getClassNameMonth(2, props.months)}>Feb.</div>
        <div className={getClassNameMonth(3, props.months)}>Mar.</div>
        <div className={getClassNameMonth(4, props.months)}>Apr.</div>
      </div>
      <div className="row">
        <div className={getClassNameMonth(5, props.months)}>May</div>
        <div className={getClassNameMonth(6, props.months)}>June</div>
        <div className={getClassNameMonth(7, props.months)}>July</div>
        <div className={getClassNameMonth(8, props.months)}>Aug.</div>
      </div>
      <div className="row">
        <div className={getClassNameMonth(9, props.months)}>Sept.</div>
        <div className={getClassNameMonth(10, props.months)}>Oct.</div>
        <div className={getClassNameMonth(11, props.months)}>Nov.</div>
        <div className={getClassNameMonth(12, props.months)}>Dev</div>
      </div>
    </div>
  );
}

function ActiveHoursBar(props) {
  return (
    <div className="hoursBar cols2-content">
      <span className={getClassNameHour(0, props.hours)} />
      <span className={getClassNameHour(1, props.hours)} />
      <span className={getClassNameHour(2, props.hours)} />
      <span className={getClassNameHour(3, props.hours)} />
      <span className={getClassNameHour(4, props.hours)} />
      <span className={getClassNameHour(5, props.hours)} />
      <span className={getClassNameHour(6, props.hours)} />
      <span className={getClassNameHour(7, props.hours)} />
      <span className={getClassNameHour(8, props.hours)} />
      <span className={getClassNameHour(9, props.hours)} />
      <span className={getClassNameHour(10, props.hours)} />
      <span className={getClassNameHour(11, props.hours)} />
      <span className={getClassNameHour(12, props.hours)} />
      <span className={getClassNameHour(13, props.hours)} />
      <span className={getClassNameHour(14, props.hours)} />
      <span className={getClassNameHour(15, props.hours)} />
      <span className={getClassNameHour(16, props.hours)} />
      <span className={getClassNameHour(17, props.hours)} />
      <span className={getClassNameHour(18, props.hours)} />
      <span className={getClassNameHour(19, props.hours)} />
      <span className={getClassNameHour(20, props.hours)} />
      <span className={getClassNameHour(21, props.hours)} />
      <span className={getClassNameHour(22, props.hours)} />
      <span className={getClassNameHour(23, props.hours)} />
    </div>
  );
}

class CritterPediaDetail extends React.Component {
  render() {
    let shadow; let
      critterUrl;
    if (this.props.critterType && this.props.critterType === CRITTER_TYPE.FISH) {
      shadow = (
        <div className="cardCell">
          <span className="title">ShadowType</span>
          {' '}
          <img className="critterpedia-shadow-img" src={`${process.env.PUBLIC_URL}/images/shadows/shadow${this.props.critter.shadowType}.png`} />
        </div>
      );
      critterUrl = `${process.env.PUBLIC_URL}/images/${CRITTER_TYPE_NAME.FISH.toLowerCase()}/${CRITTER_TYPE.FISH.toLowerCase()}${this.props.critter.id}.png`;
    } else {
      critterUrl = `${process.env.PUBLIC_URL}/images/${CRITTER_TYPE_NAME.BUG.toLowerCase()}/${CRITTER_TYPE.BUG.toLowerCase()}${this.props.critter.id}.png`;
    }
    const critterLocations = locations[this.props.critterType];

    return (
      <div>
        <Modal show={this.props.showModal} onHide={this.props.hideModal} size="lg" centered className="critterpedia-item-modal">
          <Modal.Header closeButton>
            <Modal.Title>
              <Badge variant="light">{this.props.critter.name}</Badge>
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
                      <Calendar months={this.props.critter.monthsAvailable} />
                    </div>
                    <div className="cardCell">
                      <div className="title">Current Active Hours</div>
                      <ActiveHoursBar hours={this.props.critter.hoursAvailable} />
                    </div>
                  </div>
                  <div className={`cardRow ${(this.props.critterType && this.props.critterType === CRITTER_TYPE.FISH) ? 'row3' : 'row2'} withBorder`}>
                    <div className="cardCell">
                      <span className="title">Location</span>
                      {' '}
                      {critterLocations[this.props.critter.location].name}
                    </div>
                    <div className="cardCell">
                      <span className="title">Price</span>
                      {' '}
                      {this.props.critter.price}
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
}

export default CritterPediaDetail;
