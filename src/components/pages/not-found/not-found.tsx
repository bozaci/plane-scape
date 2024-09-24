import * as Icon from 'phosphor-react';

import './not-found.scss';

const NotFound = () => {
  return (
    <section className="not-found-section">
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <div className="not-found-section__icon text-red">
          <Icon.XCircle />
        </div>

        <span className="section-title section-title--big text-black">404 Error</span>
        <p className="section-text">This page is not found.</p>
      </div>
    </section>
  );
};

export default NotFound;
