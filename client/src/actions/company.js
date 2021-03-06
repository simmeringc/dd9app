import axios from 'axios';
import { toast } from 'react-toastify';

import {
  GET_COMPANIES,
  GET_COMPANY,
  GET_COMPANY_HOUR_LOGS,
  GET_ACTIVE_COMPANIES,
  CREATE_COMPANY,
  EDIT_COMPANY,
  ACTIVATE_COMPANY,
  DEACTIVATE_COMPANY,
  CLEAR_COMPANY_ONE_STATE,
  CLEAR_COMPANY_HOUR_LOGS_STATE,
} from './types';

export const getCompanies = () => async dispatch => {
  const res = await axios.get('/api/v1/companies/');

  dispatch({ type: GET_COMPANIES, payload: res.data });
};

export const getCompany = companyId => async dispatch => {
  const res = await axios.get(`/api/v1/company/${companyId}`);

  dispatch({ type: GET_COMPANY, payload: res.data });
};

export const getCompanyHourLogs = companyId => async dispatch => {
  const res = await axios.get(`/api/v1/company/${companyId}/hourLogs`);

  dispatch({ type: GET_COMPANY_HOUR_LOGS, payload: res.data });
};

export const getActiveCompanies = () => async dispatch => {
  const res = await axios.get('/api/v1/activeCompanies');

  dispatch({ type: GET_ACTIVE_COMPANIES, payload: res.data });
};

export const createCompany = formProps => async dispatch => {
  const res = await axios.post('/api/v1/company/create', formProps);

  toast.success(`${res.data.name} successfully created`);

  dispatch({ type: CREATE_COMPANY, payload: res.data });
};

export const editCompany = (companyId, formProps) => async dispatch => {
  const editCompanyRes = await axios.post(`/api/v1/company/${companyId}/edit`, formProps);
  const getCompaniesRes = await axios.get('/api/v1/companies/');

  toast.success(`${editCompanyRes.data.name} successfully edited`);

  await dispatch({ type: EDIT_COMPANY, payload: editCompanyRes.data });
  await dispatch({ type: GET_COMPANIES, payload: getCompaniesRes.data });
};

export const activateCompany = companyId => async dispatch => {
  const res = await axios.post(`/api/v1/company/${companyId}/activate`);

  toast.success(`${res.data.name} successfully activated`);

  dispatch({ type: ACTIVATE_COMPANY, payload: res.data });
};

export const deactivateCompany = companyId => async dispatch => {
  const res = await axios.post(`/api/v1/company/${companyId}/deactivate`);

  if (res.data.status === 'active') {
    toast.error('Error: cannot deactivate a company with an open hour log');
  } else {
    toast.success(`${res.data.name} successfully deactivated`);
  }

  dispatch({ type: DEACTIVATE_COMPANY, payload: res.data });
};

export const clearCompanyOneState = () => async dispatch => {
  dispatch({ type: CLEAR_COMPANY_ONE_STATE, payload: {} });
  dispatch({ type: CLEAR_COMPANY_HOUR_LOGS_STATE, payload: {} });
};
