'use strict';

import React from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

class CritterPediaCell extends React.Component {
  render() {
    return (<div className="critterpedia-cell" id={this.props.critter.id}>
      <Button className="criterpedia-cell-button" onClick={() => { this.props.showModal(this.props.critter) }} >
        <Badge pill variant="warning">
          {this.props.critter.name}
        </Badge>
        <img src={require(`./../data/images/fish${this.props.critter.id}.png`)} />
      </Button>
    </div>);
  }
}

export default CritterPediaCell;