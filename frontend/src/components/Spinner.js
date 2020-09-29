import React from 'react';

const Spinner = (props) => {
  return (
    <div className="ui active dimmer full">
      <div className="ui big text loader">{props.message}</div>
    </div>
  );
};

Spinner.defaultProps = {
  message: 'Loading...',
};

export default Spinner;
