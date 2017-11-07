import React from "react";
import PropTypes from "prop-types";

import Icon from "./Icon";

import "./Menu.css";

export default class Menu extends React.Component {
  getClassName() {
    const visibleClass = this.props.visible ? "in" : "";
    return `Menu ${visibleClass}`;
  }

  render() {
    const { mana, onHide, outgoingAuctions } = this.props;

    return (
      <div className={this.getClassName()}>
        <header>
          <Icon name="decentraland" />
          <h1 className="menu-title">Decentraland</h1>

          <div onClick={onHide}>
            <Icon name="laquo" />
          </div>
        </header>

        <div className="your-balance">
          <h2>Your Balance</h2>
          <div className="mana-value">{mana} MANA</div>
        </div>

        <div className="ongoing-auctions">
          <h3>Ongoing auctions</h3>
          <div className="table">
            <div className="table-row table-header">
              <div className="col-land">Land</div>
              <div className="col-status">Status</div>
              <div className="col-amount">Amount</div>
              <div className="col-time-left">Time left</div>
              <div className="col-address" />
            </div>

            {outgoingAuctions.map((auction, index) => (
              <AuctionTableRow
                key={index}
                auction={auction}
                className={index % 2 === 0 ? "gray" : ""}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  visible: PropTypes.bool,
  mana: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
  outgoingAuctions: PropTypes.array
};

Menu.defaultProps = {
  visible: false,
  outgoingAuctions: []
};

function AuctionTableRow({ auction, className = "" }) {
  const statusClass = auction.status.toLowerCase();

  return (
    <div className={`table-row ${className}`}>
      <div className="col-land">{auction.land}</div>
      <div className="col-status">{auction.status}</div>
      <div className={`col-amount ${statusClass}`}>{auction.amount}</div>
      <div className="col-time-left">{auction.timeLeft}</div>
      <div className="col-address">{auction.address}</div>
    </div>
  );
}
