import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import fishes from './data/fishes.json';

const rows = (fishes.length % 5);

class CritterPediaTable extends React.Component {
  renderCell(critter) {
    return <CritterPediaCell critter={critter} />
  }
  render() {
    return (
      <div className="critterpedia">
        <div className="critterpedia-grid">
          {(() => {
            return fishes.map((fish) => {
              return this.renderCell(fish)
            })
          })()}
        </div>
      </div >
    );
  }
}

class CritterPediaCell extends React.Component {
  render() {
    return (<div className="critterpedia-cell" id={this.props.critter.id}><img src={require(`./data/images/fish${this.props.critter.id}.png`)} /></div>);
  }
}

class CritterPediaItem extends React.Component {
  render() {
    return (<div className="critterpedia-item"></div>);
  }
}

ReactDOM.render(
  <CritterPediaTable />,
  document.getElementsByTagName('body')[0]
);