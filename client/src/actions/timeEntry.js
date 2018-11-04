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
  TIME_ENTRY_IN_COMPANY_HOUR_LOG_BULK_ACTION,
  GET_COMPANY_HOUR_LOG,
  GET_CONTRACTOR_HOUR_LOG,
} from './types';

export const getCreatedTimeEntries = () => async dispatch => {
  const res = await axios.get('/api/v1/timeEntries/created');

  dispatch({ type: GET_CREATED_TIME_ENTRIES, payload: res.data });
};

export const createNewTimeEntry = formProps => async dispatch => {
  const res = await axios.post('/api/v1/timeEntry/create', formProps);

  toast.info('Time Entry Created');

  dispatch({ type: CREATE_NEW_TIME_ENTRY, payload: res.data });
};

export const createAndSubmitTimeEntry = formProps => async dispatch => {
  const res = await axios.post('/api/v1/timeEntry/createAndSubmit', formProps);

  toast.info('Time Entry Created and Submitted');

  await dispatch({ type: CREATE_AND_SUBMIT_TIME_ENTRY, payload: res.data });
};

export const editTimeEntry = (timeEntryId, formProps) => async dispatch => {
  const res = await axios.post(`/api/v1/timeEntry/${timeEntryId}/edit`, formProps);

  toast.info('Time Entry Edited');

  dispatch({ type: EDIT_TIME_ENTRY, payload: res.data });
};

export const adjudicateTimeEntry = (timeEntryId, formProps) => async dispatch => {
  const res = await axios.post(`/api/v1/timeEntry/${timeEntryId}/adjudicate`, formProps);

  toast.info('Time Entry Adjudicated');

  dispatch({ type: ADJUDICATE_TIME_ENTRY, payload: res.data });
};

export const approveTimeEntry = timeEntryId => async dispatch => {
  const res = await axios.post(`/api/v1/timeEntry/${timeEntryId}/approve`);

  toast.info('Time Entry Approved');

  dispatch({ type: APPROVE_TIME_ENTRY, payload: res.data });
};

export const hideTimeEntry = timeEntryId => async dispatch => {
  const res = await axios.post(`/api/v1/timeEntry/${timeEntryId}/hide`);

  toast.info('Time Entry Hidden');

  dispatch({ type: HIDE_TIME_ENTRY, payload: res.data });
};

export const rejectTimeEntry = timeEntryId => async dispatch => {
  const res = await axios.post(`/api/v1/timeEntry/${timeEntryId}/reject`);

  toast.info('Time Entry Rejected');

  dispatch({ type: REJECT_TIME_ENTRY, payload: res.data });
};

export const submitTimeEntry = timeEntryId => async dispatch => {
  const res = await axios.post(`/api/v1/timeEntry/${timeEntryId}/submit`);

  toast.info('Time Entry Submitted');

  dispatch({ type: SUBMIT_TIME_ENTRY, payload: res.data });
};

export const deleteTimeEntry = timeEntryId => async dispatch => {
  const res = await axios.post(`/api/v1/timeEntry/${timeEntryId}/delete`);

  toast.info('Time Entry Deleted');

  dispatch({ type: DELETE_TIME_ENTRY, payload: res.data });
};

export const approveAllNewTimeEntries = () => async dispatch => {
  const res = await axios.post('/api/v1/timeEntry/newTimeEntryBulkAction/approveAll/approved');

  toast.info('Approved all Time Entries');

  dispatch({ type: NEW_TIME_ENTRY_BULK_ACTION, payload: res.data });
};

export const hideAllNewTimeEntries = () => async dispatch => {
  const res = await axios.post('/api/v1/timeEntry/newTimeEntryBulkAction/hideAll/hidden');

  toast.info('Hid all Time Entries');

  dispatch({ type: NEW_TIME_ENTRY_BULK_ACTION, payload: res.data });
};

export const submitAllNewTimeEntries = () => async dispatch => {
  const res = await axios.post('/api/v1/timeEntry/newTimeEntryBulkAction/submitAll/submitted');

  toast.info('Submitted all Time Entries');

  dispatch({ type: NEW_TIME_ENTRY_BULK_ACTION, payload: res.data });
};

export const deleteAllNewTimeEntries = () => async dispatch => {
  const res = await axios.post('/api/v1/timeEntry/newTimeEntryBulkAction/deleteAll/deleted');

  toast.info('Deleted all Time Entries');

  dispatch({ type: NEW_TIME_ENTRY_BULK_ACTION, payload: res.data });
};

export const hideFromApprovedTimeEntries = companyHourLogId => async dispatch => {
  const bulkAction = await axios.post(`/api/v1/timeEntry/timeEntryInCompanyHourLogBulkAction/${companyHourLogId}/approved/hidden`);
  const companyHourLog = await axios.get(`/api/v1/companyHourLog/${companyHourLogId}`);

  toast.info('Hid all Approved Time Entries');

  dispatch({ type: TIME_ENTRY_IN_COMPANY_HOUR_LOG_BULK_ACTION, payload: bulkAction.data });
  dispatch({ type: GET_COMPANY_HOUR_LOG, payload: companyHourLog.data });
};

export const rejectFromApprovedTimeEntries = companyHourLogId => async dispatch => {
  const bulkAction = await axios.post(`/api/v1/timeEntry/timeEntryInCompanyHourLogBulkAction/${companyHourLogId}/approved/rejected`);
  const companyHourLog = await axios.get(`/api/v1/companyHourLog/${companyHourLogId}`);

  toast.info('Rejected all Approved Time Entries');

  dispatch({ type: TIME_ENTRY_IN_COMPANY_HOUR_LOG_BULK_ACTION, payload: bulkAction.data });
  dispatch({ type: GET_COMPANY_HOUR_LOG, payload: companyHourLog.data });
};

export const approveFromHiddenTimeEntries = companyHourLogId => async dispatch => {
  const bulkAction = await axios.post(`/api/v1/timeEntry/timeEntryInCompanyHourLogBulkAction/${companyHourLogId}/hidden/approved`);
  const companyHourLog = await axios.get(`/api/v1/companyHourLog/${companyHourLogId}`);

  toast.info('Approved all Hidden Time Entries');

  dispatch({ type: TIME_ENTRY_IN_COMPANY_HOUR_LOG_BULK_ACTION, payload: bulkAction.data });
  dispatch({ type: GET_COMPANY_HOUR_LOG, payload: companyHourLog.data });
};

export const rejectFromHiddenTimeEntries = companyHourLogId => async dispatch => {
  const bulkAction = await axios.post(`/api/v1/timeEntry/timeEntryInCompanyHourLogBulkAction/${companyHourLogId}/hidden/rejected`);
  const companyHourLog = await axios.get(`/api/v1/companyHourLog/${companyHourLogId}`);

  toast.info('Rejected all Hidden Time Entries');

  dispatch({ type: TIME_ENTRY_IN_COMPANY_HOUR_LOG_BULK_ACTION, payload: bulkAction.data });
  dispatch({ type: GET_COMPANY_HOUR_LOG, payload: companyHourLog.data });
};

export const approveFromSubmittedTimeEntries = companyHourLogId => async dispatch => {
  const bulkAction = await axios.post(`/api/v1/timeEntry/timeEntryInCompanyHourLogBulkAction/${companyHourLogId}/submitted/approved`);
  const companyHourLog = await axios.get(`/api/v1/companyHourLog/${companyHourLogId}`);

  toast.info('Approved all Submitted Time Entries');

  dispatch({ type: TIME_ENTRY_IN_COMPANY_HOUR_LOG_BULK_ACTION, payload: bulkAction.data });
  dispatch({ type: GET_COMPANY_HOUR_LOG, payload: companyHourLog.data });
};

export const hideFromSubmittedTimeEntries = companyHourLogId => async dispatch => {
  const bulkAction = await axios.post(`/api/v1/timeEntry/timeEntryInCompanyHourLogBulkAction/${companyHourLogId}/submitted/hidden`);
  const companyHourLog = await axios.get(`/api/v1/companyHourLog/${companyHourLogId}`);

  toast.info('Hid all Submitted Time Entries');

  dispatch({ type: TIME_ENTRY_IN_COMPANY_HOUR_LOG_BULK_ACTION, payload: bulkAction.data });
  dispatch({ type: GET_COMPANY_HOUR_LOG, payload: companyHourLog.data });
};

export const rejectFromSubmittedTimeEntries = companyHourLogId => async dispatch => {
  const bulkAction = await axios.post(`/api/v1/timeEntry/timeEntryInCompanyHourLogBulkAction/${companyHourLogId}/submitted/rejected`);
  const companyHourLog = await axios.get(`/api/v1/companyHourLog/${companyHourLogId}`);

  toast.info('Rejected all Submitted Time Entries');

  dispatch({ type: TIME_ENTRY_IN_COMPANY_HOUR_LOG_BULK_ACTION, payload: bulkAction.data });
  dispatch({ type: GET_COMPANY_HOUR_LOG, payload: companyHourLog.data });
};

export const rejectFromSubmittedContractorHourLogTimeEntries = contractorHourLogId => async dispatch => {
  const bulkAction = await axios.post(`/api/v1/timeEntry/contractorHourLogBulkAction/${contractorHourLogId}/rejectAllSubmitted`);
  const contractorHourLog = await axios.get(`/api/v1/contractorHourLog/${contractorHourLogId}`);

  toast.info('Rejected all Submitted Time Entries');

  dispatch({ type: TIME_ENTRY_IN_COMPANY_HOUR_LOG_BULK_ACTION, payload: bulkAction.data });
  dispatch({ type: GET_CONTRACTOR_HOUR_LOG, payload: contractorHourLog.data });
};

export const submitFromNewContractorHourLogTimeEntries = contractorHourLogId => async dispatch => {
  const bulkAction = await axios.post(`/api/v1/timeEntry/contractorHourLogBulkAction/${contractorHourLogId}/submitAllCreated`);
  const contractorHourLog = await axios.get(`/api/v1/contractorHourLog/${contractorHourLogId}`);

  toast.info('Submitted all Created Time Entries');

  dispatch({ type: TIME_ENTRY_IN_COMPANY_HOUR_LOG_BULK_ACTION, payload: bulkAction.data });
  dispatch({ type: GET_CONTRACTOR_HOUR_LOG, payload: contractorHourLog.data });
};

export const deleteFromNewContractorHourLogTimeEntries = contractorHourLogId => async dispatch => {
  const bulkAction = await axios.post(`/api/v1/timeEntry/contractorHourLogBulkAction/${contractorHourLogId}/deleteAllCreated`);
  const contractorHourLog = await axios.get(`/api/v1/contractorHourLog/${contractorHourLogId}`);

  toast.info('Deleted all Created Time Entries');

  dispatch({ type: TIME_ENTRY_IN_COMPANY_HOUR_LOG_BULK_ACTION, payload: bulkAction.data });
  dispatch({ type: GET_CONTRACTOR_HOUR_LOG, payload: contractorHourLog.data });
};