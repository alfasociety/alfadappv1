import React from 'react';

import PropTypes from 'prop-types';

import './component1.css';

const Component1 = (props) => {
  return (
    <div className={`component1-container ${props.rootClassName} `}>
      <button className="component1-button themebutton button">
        {props.button}
      </button>
    </div>
  );
};

Component1.defaultProps = {
  button: 'Collect',
  rootClassName: '',
};

Component1.propTypes = {
  button: PropTypes.string,
  rootClassName: PropTypes.string,
};

export default Component1;
