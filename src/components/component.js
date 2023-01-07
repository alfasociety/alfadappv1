import React from 'react';

import PropTypes from 'prop-types';

import './component.css';

const AppComponent = (props) => {
  return (
    <div className={`component-container ${props.rootClassName} `}>
      <button className="component-button themebutton button">
        {props.button}
      </button>
    </div>
  );
};

AppComponent.defaultProps = {
  button: 'Collect',
  rootClassName: '',
};

AppComponent.propTypes = {
  button: PropTypes.string,
  rootClassName: PropTypes.string,
};

export default AppComponent;
