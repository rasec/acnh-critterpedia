import React from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { CRITTER_TYPE, CRITTER_TYPE_NAME } from '../constants';

class CritterPediaCell extends React.Component {
  render() {
    let critterUrl;
    if (this.props.critterType && this.props.critterType === CRITTER_TYPE.FISH) {
      critterUrl = `${process.env.PUBLIC_URL}/images/${CRITTER_TYPE_NAME.FISH.toLowerCase()}/${CRITTER_TYPE.FISH.toLowerCase()}${this.props.critter.id}.png`;
    } else {
      critterUrl = `${process.env.PUBLIC_URL}/images/${CRITTER_TYPE_NAME.BUG.toLowerCase()}/${CRITTER_TYPE.BUG.toLowerCase()}${this.props.critter.id}.png`;
    }
    return (
      <div className="critterpedia-cell" id={this.props.critter.id}>
        <Button className="criterpedia-cell-button" onClick={() => { this.props.showModal(this.props.critter); }}>
          <Badge pill variant="warning" className="critter-name">
            {this.props.critter.name}
          </Badge>
          <img src={critterUrl} />
        </Button>
      </div>
    );
  }
}

export default CritterPediaCell;
