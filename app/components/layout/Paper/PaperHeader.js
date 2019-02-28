/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  paperHeader: {
    color: theme.palette.common.white,
    padding: '0.75rem 1.25rem',
    marginBottom: '0',
    borderBottom: 'none',
    background: 'transparent',
    zIndex: '3 !important',
    '&:first-child': {
      borderRadius: 'calc(.25rem - 1px) calc(.25rem - 1px) 0 0'
    }
  }
});

const paperHeader = ({ ...props }) => {
  const { classes, className, children, ...rest } = props;

  const paperHeaderClasses = classNames({
    [classes.paperHeader]: true,
    [className]: className !== undefined
  });

  return (
    <div className={paperHeaderClasses} {...rest}>
      {children}
    </div>
  );
};

paperHeader.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  className: PropTypes.string
};

export default withStyles(styles)(paperHeader);