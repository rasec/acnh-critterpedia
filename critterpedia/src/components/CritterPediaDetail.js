import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

import shadows from '../data/shadows.json';
import locations from '../data/locations.json';

class CritterPediaDetail extends React.Component {
  render() {
    return (<div>
      <Modal show={this.props.showModal} onHide={this.props.hideModal} centered className="critterpedia-item-modal">
        <Modal.Header closeButton>
          <Modal.Title>{this.props.item.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card style={{ width: '100%' }}>
            <Card.Img className="critterpedia-item-img" variant="top" src={require(`../data/images/fish${this.props.item.id}.png`)} />
            <Card.Body>
              <Card.Title>{this.props.item.id}. {this.props.item.name}<br /></Card.Title>
              <Card.Text>
                Price: {this.props.item.price} <br />
              ShadowType: {shadows[this.props.item.shadowType - 1].name}<br />
              Location: {locations[this.props.item.location - 1].name}<br />
              Seasonality: {this.props.item.monthsAvailable.join(',')}<br />
                {this.props.item.hoursAvailable.join(',')}<br />
              </Card.Text>
              <div className="title">Seasonality</div>
              <div className="calendar">
                <div className="row">
                  <div className="month" id="month1">Jan.</div>
                  <div className="month" id="month2">Feb.</div>
                  <div className="month" id="month3">Mar.</div>
                  <div className="month" id="month4">Apr.</div>
                </div>
                <div className="row">
                  <div className="month" id="month5">May</div>
                  <div className="month" id="month6">June</div>
                  <div className="month" id="month7">July</div>
                  <div className="month" id="month8">Aug.</div>
                </div>
                <div className="row">
                  <div className="month filled current" id="month9">Sept.</div>
                  <div className="month filled" id="month10">Oct.</div>
                  <div className="month filled" id="month11">Nov.</div>
                  <div className="month" id="month12">Dev</div>
                </div>
              </div>
              <div className="title">Current Active Hours</div>
              <div className="hoursBar">
                <span className="hour filled"></span>
                <span className="hour filled"></span>
                <span className="hour filled"></span>
                <span className="hour filled"></span>
                <span className="hour filled"></span>
                <span className="hour filled marker"></span>
                <span className="hour filled"></span>
                <span className="hour filled"></span>
                <span className="hour filled"></span>
                <span className="hour empty"></span>
                <span className="hour empty"></span>
                <span className="hour empty marker"></span>
                <span className="hour empty"></span>
                <span className="hour empty"></span>
                <span className="hour filled"></span>
                <span className="hour filled"></span>
                <span className="hour filled"></span>
                <span className="hour filled marker"></span>
                <span className="hour filled"></span>
                <span className="hour filled"></span>
                <span className="hour filled"></span>
                <span className="hour filled"></span>
                <span className="hour filled"></span>
                <span className="hour filled"></span>
              </div>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </div >);
  }
}

export default CritterPediaDetail;