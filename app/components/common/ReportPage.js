import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import UpdateIcon from '@material-ui/icons/Update';

import styles from './styles/reportPage';

const ReportPage = ({ classes, data, toolName }) => {
  console.log(data);

  return (
    <div className={classes.root}>
      {toolName === 'doctor' ? (
        <Typography component="p">
          {data.split('Perms check').join(' ')}
        </Typography>
      ) : (
        <List dense>
          {data &&
            data
              .filter(dataItem => dataItem.value !== null)
              .map(dataItem => {
                const valueArray = Array.isArray(dataItem.value);

                if (valueArray) {
                  return (
                    <List dense subheader={dataItem.name} key={dataItem.name}>
                      {dataItem.value.map(valueItem => {
                        return (
                          <ListItem key={valueItem.name}>
                            <ListItemText>
                              <Typography>{valueItem.name}</Typography>
                            </ListItemText>
                            <ListItemSecondaryAction>
                              <Typography>{valueItem.value}</Typography>
                            </ListItemSecondaryAction>
                          </ListItem>
                        );
                      })}
                    </List>
                  );
                }

                return (
                  <ListItem key={dataItem.name}>
                    <ListItemText>
                      <Typography>{dataItem.name}</Typography>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <Typography>{dataItem.value}</Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
        </List>
      )}
    </div>
  );
};

export default withStyles(styles)(ReportPage);
