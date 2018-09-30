import axios from 'axios';
import { toast } from 'react-toastify';

import {
  GET_CREATED_TIME_ENTRIES,
  CREATE_NEW_TIME_ENTRY,
  CREATE_AND_SUBMIT_TIME_ENTRY,
  EDIT_TIME_ENTRY,
  ADJUDICATE_TIME_ENTRY,
  APPROVE_TIME_ENTRY,
  HIDE_TIME_ENTRY,
  REJECT_TIME_ENTRY,
  SUBMIT_TIME_ENTRY,
  DELETE_TIME_ENTRY,
  NEW_TIME_ENTRY_BULK_ACTION,
  TIME_ENTRY_IN_HOUR_LOG_BULK_ACTION,
  GET_HOUR_LOG,
} from './types';

export const getCreatedTimeEntries = () => async dispatch => {
  const res = await axios.get('/api/v1/timeEntries/created');

  dispatch({ type: GET_CREATED_TIME_ENTRIES, payload: res.data });
};

export const createNewTimeEntry = formProps => async dispatch => {
  const res = await axios.post('/api/v1/timeEntry/create', formProps);

  toast.info('Time Entry Created', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  dispatch({ type: CREATE_NEW_TIME_ENTRY, payload: res.data });
};

export const createAndSubmitTimeEntry = formProps => async dispatch => {
  const res = await axios.post('/api/v1/timeEntry/createAndSubmit', formProps);

  toast.info('Time Entry Created and Submitted', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  await dispatch({ type: CREATE_AND_SUBMIT_TIME_ENTRY, payload: res.data });
};

export const editTimeEntry = (timeEntryId, formProps) => async dispatch => {
  const res = await axios.post(`/api/v1/timeEntry/${timeEntryId}/edit`, formProps);

  toast.info('Time Entry Edited', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  dispatch({ type: EDIT_TIME_ENTRY, payload: res.data });
};

export const adjudicateTimeEntry = (timeEntryId, formProps) => async dispatch => {
  const res = await axios.post(`/api/v1/timeEntry/${timeEntryId}/adjudicate`, formProps);

  toast.info('Time Entry Adjudicated', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  dispatch({ type: ADJUDICATE_TIME_ENTRY, payload: res.data });
};

export const approveTimeEntry = timeEntryId => async dispatch => {
  const res = await axios.post(`/api/v1/timeEntry/${timeEntryId}/approve`);

  toast.info('Time Entry Approved', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  dispatch({ type: APPROVE_TIME_ENTRY, payload: res.data });
};

export const hideTimeEntry = timeEntryId => async dispatch => {
  const res = await axios.post(`/api/v1/timeEntry/${timeEntryId}/hide`);

  toast.info('Time Entry Hidden', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  dispatch({ type: HIDE_TIME_ENTRY, payload: res.data });
};

export const rejectTimeEntry = timeEntryId => async dispatch => {
  const res = await axios.post(`/api/v1/timeEntry/${timeEntryId}/reject`);

  toast.info('Time Entry Rejected', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  dispatch({ type: REJECT_TIME_ENTRY, payload: res.data });
};

export const submitTimeEntry = timeEntryId => async dispatch => {
  const res = await axios.post(`/api/v1/timeEntry/${timeEntryId}/submit`);

  toast.info('Time Entry Submitted', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  dispatch({ type: SUBMIT_TIME_ENTRY, payload: res.data });
};

export const deleteTimeEntry = timeEntryId => async dispatch => {
  const res = await axios.post(`/api/v1/timeEntry/${timeEntryId}/delete`);

  toast.info('Time Entry Deleted', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  dispatch({ type: DELETE_TIME_ENTRY, payload: res.data });
};

export const approveAllNewTimeEntries = () => async dispatch => {
  const res = await axios.post('/api/v1/timeEntry/newTimeEntryBulkAction/approveAll/approved');

  toast.info('Approved all Time Entries', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  dispatch({ type: NEW_TIME_ENTRY_BULK_ACTION, payload: res.data });
};

export const hideAllNewTimeEntries = () => async dispatch => {
  const res = await axios.post('/api/v1/timeEntry/newTimeEntryBulkAction/hideAll/hidden');

  toast.info('Hid all Time Entries', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  dispatch({ type: NEW_TIME_ENTRY_BULK_ACTION, payload: res.data });
};

export const submitAllNewTimeEntries = () => async dispatch => {
  const res = await axios.post('/api/v1/timeEntry/newTimeEntryBulkAction/submitAll/submitted');

  toast.info('Submitted all Time Entries', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  dispatch({ type: NEW_TIME_ENTRY_BULK_ACTION, payload: res.data });
};

export const deleteAllNewTimeEntries = () => async dispatch => {
  const res = await axios.post('/api/v1/timeEntry/newTimeEntryBulkAction/deleteAll/deleted');

  toast.info('Deleted all Time Entries', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  dispatch({ type: NEW_TIME_ENTRY_BULK_ACTION, payload: res.data });
};

export const hideFromApprovedTimeEntries = hourLogId => async dispatch => {
  const bulkAction = await axios.post(`/api/v1/timeEntry/timeEntryInHourLogBulkAction/${hourLogId}/approved/hidden`);
  const hourLog = await axios.get(`/api/v1/hourLog/${hourLogId}`);

  toast.info('Hid all Approved Time Entries', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  dispatch({ type: TIME_ENTRY_IN_HOUR_LOG_BULK_ACTION, payload: bulkAction.data });
  dispatch({ type: GET_HOUR_LOG, payload: hourLog.data });
};

export const rejectFromApprovedTimeEntries = hourLogId => async dispatch => {
  const bulkAction = await axios.post(`/api/v1/timeEntry/timeEntryInHourLogBulkAction/${hourLogId}/approved/rejected`);
  const hourLog = await axios.get(`/api/v1/hourLog/${hourLogId}`);

  toast.info('Rejected all Approved Time Entries', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  dispatch({ type: TIME_ENTRY_IN_HOUR_LOG_BULK_ACTION, payload: bulkAction.data });
  dispatch({ type: GET_HOUR_LOG, payload: hourLog.data });
};

export const approveFromHiddenTimeEntries = hourLogId => async dispatch => {
  const bulkAction = await axios.post(`/api/v1/timeEntry/timeEntryInHourLogBulkAction/${hourLogId}/hidden/approved`);
  const hourLog = await axios.get(`/api/v1/hourLog/${hourLogId}`);

  toast.info('Approved all Hidden Time Entries', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  dispatch({ type: TIME_ENTRY_IN_HOUR_LOG_BULK_ACTION, payload: bulkAction.data });
  dispatch({ type: GET_HOUR_LOG, payload: hourLog.data });
};

export const rejectFromHiddenTimeEntries = hourLogId => async dispatch => {
  const bulkAction = await axios.post(`/api/v1/timeEntry/timeEntryInHourLogBulkAction/${hourLogId}/hidden/rejected`);
  const hourLog = await axios.get(`/api/v1/hourLog/${hourLogId}`);

  toast.info('Rejected all Hidden Time Entries', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  dispatch({ type: TIME_ENTRY_IN_HOUR_LOG_BULK_ACTION, payload: bulkAction.data });
  dispatch({ type: GET_HOUR_LOG, payload: hourLog.data });
};

export const approveFromSubmittedTimeEntries = hourLogId => async dispatch => {
  const bulkAction = await axios.post(`/api/v1/timeEntry/timeEntryInHourLogBulkAction/${hourLogId}/submitted/approved`);
  const hourLog = await axios.get(`/api/v1/hourLog/${hourLogId}`);

  toast.info('Approved all Submitted Time Entries', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  dispatch({ type: TIME_ENTRY_IN_HOUR_LOG_BULK_ACTION, payload: bulkAction.data });
  dispatch({ type: GET_HOUR_LOG, payload: hourLog.data });
};

export const hideFromSubmittedTimeEntries = hourLogId => async dispatch => {
  const bulkAction = await axios.post(`/api/v1/timeEntry/timeEntryInHourLogBulkAction/${hourLogId}/submitted/hidden`);
  const hourLog = await axios.get(`/api/v1/hourLog/${hourLogId}`);

  toast.info('Hid all Submitted Time Entries', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  dispatch({ type: TIME_ENTRY_IN_HOUR_LOG_BULK_ACTION, payload: bulkAction.data });
  dispatch({ type: GET_HOUR_LOG, payload: hourLog.data });
};

export const rejectFromSubmittedTimeEntries = hourLogId => async dispatch => {
  const bulkAction = await axios.post(`/api/v1/timeEntry/timeEntryInHourLogBulkAction/${hourLogId}/submitted/rejected`);
  const hourLog = await axios.get(`/api/v1/hourLog/${hourLogId}`);

  toast.info('Rejected all Submitted Time Entries', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  dispatch({ type: TIME_ENTRY_IN_HOUR_LOG_BULK_ACTION, payload: bulkAction.data });
  dispatch({ type: GET_HOUR_LOG, payload: hourLog.data });
};