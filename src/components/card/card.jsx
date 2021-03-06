import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {getRating, getOfferPath} from '../../util';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';
import {cardProp} from './card.prop';

const PlaceCard = (props) => {
  const {card, activeOffer, removeActiveOffer} = props;
  const {id, isFavorite, isPremium, previewImage, price, rating, title, type} = card;

  const ratingConversion = getRating(rating);

  const premiumTemplate = isPremium ? `` : `visually-hidden`;

  const bookmarkClass = isFavorite ? `place-card__bookmark-button--active` : ``;
  const bookmarkText = isFavorite ? `In bookmarks` : `To bookmarks`;

  const cardHover = (cardId) => {
    activeOffer(cardId);
  };

  const cardHoverLeave = () => {
    removeActiveOffer();
  };

  return (
    <article className="cities__place-card place-card" onMouseOver={() => cardHover(id)} onMouseLeave={() => cardHoverLeave()}>
      <div className={`place-card__mark ${premiumTemplate}`} >
        <span>Premium</span>
      </div>
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={`${previewImage}`} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${bookmarkClass}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{bookmarkText}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${ratingConversion}` + `%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={getOfferPath(id)}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  card: PropTypes.shape(cardProp).isRequired,
  activeOffer: PropTypes.func.isRequired,
  removeActiveOffer: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  activeOffer(id) {
    dispatch(ActionCreator.incrementActiveOffer(id));
  },
  removeActiveOffer() {
    dispatch(ActionCreator.incrementRemoveActiveOffer());
  }
});

export {PlaceCard};
export default connect(null, mapDispatchToProps)(PlaceCard);
