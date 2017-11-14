import { buildCoordinate } from "./util";

export function getBidParcels(addressState) {
  const { bidGroups } = addressState;
  const bidParcels = {};

  for (const bidGroup of bidGroups) {
    for (const bid of bidGroup.bids) {
      const coordinate = buildCoordinate(bid.x, bid.y);
      bidParcels[coordinate] = bid;
    }
  }
  return bidParcels;
}

export function getBidCoordinates(addressState) {
  const bidParcels = getBidCoordinates(addressState);
  return Object.keys(bidParcels);
}

export function hasBidInParcel(addressState, parcel) {
  const parcelCoordinate = buildCoordinate(parcel.x, parcel.y);
  const bidParcels = getBidParcels(addressState);

  return !!bidParcels[parcelCoordinate];
}
