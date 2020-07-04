import React from 'react';
import spinner from '../../assets/img/spinner.gif';

const Loader = () => {
  return (
    <div className="Loader">
      <img src={spinner} alt="Loading..." />
    </div>
  );
};

export default Loader;
