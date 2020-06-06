import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import '../style/Row.css';

const Row = ({ vals, keys, rowKey }): JSX.Element => (
  <>
    <div className="row">
      {
        vals.map((s: any, i: number) => (
          <Square val={s} key={keys[i]} row={rowKey} col={keys[i]} />
        ))
      }
    </div>
  </>
);

Row.propTypes = {
  vals: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ])),
  keys: PropTypes.arrayOf(PropTypes.number).isRequired,
  rowKey: PropTypes.number.isRequired,
};

Row.defaultProps = {
  vals: Array(9).fill(''),
};

export default Row;
