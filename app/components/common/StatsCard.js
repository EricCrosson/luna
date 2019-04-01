import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';

import statsCardStyle from './styles/statsCardStyle';

function StatsCard({ ...props }) {
  const {
    classes,
    title,
    description,
    statLink,
    small,
    statText,
    statIconColor,
    iconColor
  } = props;
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography component="p" className={classes.cardCategory}>
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          component="h2"
          className={classes.cardTitle}
        >
          {description}
          {small !== undefined ? (
            <small className={classes.cardTitleSmall}>{small}</small>
          ) : null}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.cardStats}>
          <props.statIcon
            className={
              classes.cardStatsIcon +
              ' ' +
              classes[statIconColor + 'CardStatsIcon']
            }
          />{' '}
          {statLink !== undefined ? (
            <a href={statLink.href} className={classes.cardStatsLink}>
              {statLink.text}
            </a>
          ) : statText !== undefined ? (
            statText
          ) : null}
        </div>
      </CardActions>
    </Card>
  );
}

StatsCard.defaultProps = {
  iconColor: 'purple',
  statIconColor: 'gray'
};

StatsCard.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.func.isRequired,
  iconColor: PropTypes.oneOf(['orange', 'green', 'red', 'blue', 'purple']),
  title: PropTypes.node,
  description: PropTypes.node,
  small: PropTypes.node,
  statIcon: PropTypes.func.isRequired,
  statIconColor: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray'
  ]),
  statLink: PropTypes.object,
  statText: PropTypes.node
};

export default withStyles(statsCardStyle)(StatsCard);
