import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import StatsCard from 'components/common/StatsCard';

import InfoIcon from '@material-ui/icons/Info';
import UpdateIcon from '@material-ui/icons/Update';

import styles from './styles/reportPage';

const ReportPage = ({ classes }) => {
  return <div className={classes.root} />;
};

export default withStyles(styles)(ReportPage);
