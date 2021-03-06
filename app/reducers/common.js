/**
 * global reducer: Handles state management for global operations.
 */

import { identity, merge, assoc, propOr, prop, prepend } from 'ramda';

import {
  updateNotifications,
  addNotification,
  clearNotifications,
  clearCommands,
  clearSnackbar,
  commandError,
  setSnackbar,
  setManager,
  setMode,
  setEnv,
  toggleLoader,
  togglePackageLoader,
  uiException,
  npmCommand,
  setActivePage,
  updateStatus,
  setRunningCommand,
  clearRunningCommand
} from 'models/ui/actions';
import initialState from './initialState';

const { modules, ...common } = initialState;

/**
 *
 * @param {*} commonState
 * @param {*} handlers
 */
const createReducer = (commonState, handlers) => (
  state = commonState,
  action
) => propOr(identity, prop('type', action), handlers)(state, action);

const handlers = {
  [clearRunningCommand.type]: state =>
    merge(state, {
      npm: {
        ...state.npm,
        operationStatus: 'idle',
        operationPackages: [],
        operationCommand: null
      }
    }),
  [setRunningCommand.type]: (
    state,
    { payload: { operationStatus, operationPackages, operationCommand } }
  ) =>
    merge(state, {
      npm: {
        ...state.npm,
        operationStatus,
        operationPackages,
        operationCommand
      }
    }),
  [setActivePage.type]: (state, { payload: page }) =>
    merge(state, {
      activePage: page,
      npm: {
        ...state.npm,
        paused: true
      }
    }),
  [updateStatus.type]: (state, { payload: { status } }) =>
    merge(state, {
      onlineStatus: {
        ...state.onlineStatus,
        status
      }
    }),
  [uiException.type]: (state, { payload: message }) =>
    assoc('uiException', message, state),
  [setEnv.type]: (state, { payload: env }) =>
    merge(state, {
      npm: {
        ...state.npm,
        env
      }
    }),
  [updateNotifications.type]: (state, { payload: { notifications } }) =>
    assoc('notifications', notifications, state),
  [addNotification.type]: (
    state,
    { payload: { type, body, required, requiredBy } }
  ) =>
    merge(state, {
      notifications: prepend(
        {
          type,
          body,
          required: required.charAt(0) === '@' ? required.slice(1) : required,
          requiredBy
        },
        state.notifications
      )
    }),
  [npmCommand.type]: (state, { payload: command }) =>
    merge(state, {
      npm: {
        ...state.npm,
        commands: prepend(command, state.npm.commands)
      }
    }),
  [commandError.type]: (state, { payload: error }) =>
    assoc('command_error', error, state),
  [clearSnackbar.type]: state =>
    merge(state, {
      snackbarOptions: {
        open: false,
        type: 'info',
        message: null
      }
    }),
  [clearCommands.type]: state =>
    merge(state, {
      npm: {
        ...state.npm,
        paused: false, // enable fetching
        commands: []
      }
    }),
  [clearNotifications.type]: state =>
    merge(state, {
      ...state,
      notifications: []
    }),
  [setSnackbar.type]: (state, { payload }) =>
    assoc('snackbarOptions', merge(state.snackbarOptions, payload), state),
  [setMode.type]: (state, { payload: { mode, directory } }) =>
    merge(state, {
      activePage: 'packages',
      mode,
      directory,
      npm: {
        ...state.npm,
        paused: false
      }
    }),
  [setManager.type]: (state, { payload: { manager } }) =>
    assoc('manager', manager, state),
  [toggleLoader.type]: (state, { payload: { loading, message } }) =>
    merge(state, {
      loader: {
        loading,
        message
      }
    }),
  [togglePackageLoader.type]: (state, { payload: { loading, message } }) =>
    merge(state, {
      packageLoader: {
        loading,
        message
      }
    })
};

const reducer = createReducer(common, handlers);
export default reducer;
