import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {getOffers} from '../../util'; // getRating,
import OffersList from '../offers-list/offers-list';
import Authorization from '../authorization/authorization';
import {fetchFavoriteOffers} from '../../store/api-actions';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import {ActionCreator} from '../../store/action';
import {connect} from 'react-redux';
import {AppRoute} from '../../const';
import {cardProp} from '../card/card.prop';

const Favorites = (props) => {
  const {favoriteOffers, changeCity, loadFavoriteOffers} = props;

  if (!favoriteOffers) {
    loadFavoriteOffers();
    return (
      <LoadingScreen />
    );
  }

  const cityList = [...new Set(favoriteOffers.map((offer) => offer.city.name))];

  const cardClickHandler = (city) => {
    changeCity(city);
  };


  return (
    <React.Fragment>
      {favoriteOffers.length
        ?
        <div className="page">
          <header className="header">
            <div className="container">
              <div className="header__wrapper">
                <div className="header__left">
                  <Link className="header__logo-link" to="/">
                    <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
                  </Link>
                </div>
                <nav className="header__nav">
                  <ul className="header__nav-list">
                    <li className="header__nav-item user">
                      <a className="header__nav-link header__nav-link--profile" href="#">
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        <Authorization />
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>

          <main className="page__main page__main--favorites">
            <div className="page__favorites-container container">
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {cityList.map((city, i) => (
                    <li key={city + i} className="favorites__locations-items" onClick={() => cardClickHandler(city)}>
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <Link to={AppRoute.MAIN} className="locations__item-link">
                            <span>{city}</span>
                          </Link>
                        </div>
                      </div>
                      <div className="favorites__places">
                        <OffersList offers={getOffers(city, favoriteOffers)}/>
                        {/* {favoriteOffers.map((card, id) => (
                          <article key={card.id + id} className="favorites__card place-card">
                            <div className="favorites__image-wrapper place-card__image-wrapper">
                              <a href="#">
                                <img className="place-card__image" src="img/apartment-small-03.jpg" width="150" height="110" alt="Place image"/>
                              </a>
                            </div>
                            <div className="favorites__card-info place-card__info">
                              <div className="place-card__price-wrapper">
                                <div className="place-card__price">
                                  <b className="place-card__price-value">&euro;{card.price}</b>
                                  <span className="place-card__price-text">&#47;&nbsp;night</span>
                                </div>
                                <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
                                  <svg className="place-card__bookmark-icon" width="18" height="19">
                                    <use xlinkHref="#icon-bookmark"></use>
                                  </svg>
                                  <span className="visually-hidden">In bookmarks</span>
                                </button>
                              </div>
                              <div className="place-card__rating rating">
                                <div className="place-card__stars rating__stars">
                                  <span style={{width: `${getRating(card.rating)}` + `%`}}></span>
                                  <span className="visually-hidden">Rating</span>
                                </div>
                              </div>
                              <h2 className="place-card__name">
                                <a href="#">{card.title}</a>
                              </h2>
                              <p className="place-card__type">{card.type}</p>
                            </div>
                          </article>
                        ))} */}
                      </div>
                    </li>
                  ))}


                  <li className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>Cologne</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      <article className="favorites__card place-card">
                        <div className="favorites__image-wrapper place-card__image-wrapper">
                          <a href="#">
                            <img className="place-card__image" src="img/apartment-small-04.jpg" width="150" height="110" alt="Place image"/>
                          </a>
                        </div>
                        <div className="favorites__card-info place-card__info">
                          <div className="place-card__price-wrapper">
                            <div className="place-card__price">
                              <b className="place-card__price-value">&euro;180</b>
                              <span className="place-card__price-text">&#47;&nbsp;night</span>
                            </div>
                            <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
                              <svg className="place-card__bookmark-icon" width="18" height="19">
                                <use xlinkHref="#icon-bookmark"></use>
                              </svg>
                              <span className="visually-hidden">In bookmarks</span>
                            </button>
                          </div>
                          <div className="place-card__rating rating">
                            <div className="place-card__stars rating__stars">
                              <span style={{width: 100 + `%`}}></span>
                              <span className="visually-hidden">Rating</span>
                            </div>
                          </div>
                          <h2 className="place-card__name">
                            <a href="#">White castle</a>
                          </h2>
                          <p className="place-card__type">Apartment</p>
                        </div>
                      </article>
                    </div>
                  </li>
                </ul>
              </section>
            </div>
          </main>
          <footer className="footer container">
            <a className="footer__logo-link" href="main.html">
              <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
            </a>
          </footer>
        </div>

        : ``
      }
    </React.Fragment>
  );
};

Favorites.propTypes = {
  favoriteOffers: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape(cardProp)), PropTypes.array]).isRequired,
  changeCity: PropTypes.func.isRequired,
  loadFavoriteOffers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  favoriteOffers: state.favoriteOffers
});

const mapDispatchToProps = (dispatch) => ({
  changeCity(city) {
    dispatch(ActionCreator.incrementCity(city));
  },
  loadFavoriteOffers() {
    dispatch(fetchFavoriteOffers());
  }
});

export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
