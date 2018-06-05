import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.css';

const Card = ({className, dataTest, children, title}) => {
  const cardProps = {
    'data-test': dataTest,
    className: classNames('card', className),
  };

  return (
    <article {...cardProps}>
      <header className="card__header">{title}</header>
      <section className="card__body">{children}</section>
    </article>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  dataTest: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default Card;
