import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../card/card';

const OffersList = (props) => {
  const {offers} = props;

  return (
    <div className="near-places__list places__list tabs__content">
      {offers.map((card, id) => <PlaceCard key={card + id} card={card} />)}
    </div>
  );
};

OffersList.propTypes = {
  offers: PropTypes.array.isRequired,
};

export default OffersList;
