import createTimeEntryValidation from '../createTimeEntryValidation';
import { createTimeEntryTableActionButtonsHtml, instantiateTimeEntryTableActions, updateTotalTimeEntryTableHours } from "./timeEntryTableActions";
import { instantiateEditTimeEntryBtn } from "./editTimeEntry"


import axios from 'axios';
import moment from 'moment';

$('#createTimeEntryForm').on('submit', ajaxAddCreatedTimeEntry);
$('#createAndSubmitTimeEntryForm').on('submit', ajaxAddSubmittedTimeEntry);

function ajaxAddCreatedTimeEntry(e) {
  console.log(`ajaxAddCreatedTimeEntry`);
  e.preventDefault();
  createTimeEntryValidation();
  axios
    .post(this.action, {
      date: this.date.value,
      company: this.company.value,
      hours: this.hours.value,
      description: this.description.value
    })
    .then(res => {
      const companyName = $(this).find('option:selected').text();
      let companyTd = companyName;
      if (res.data.admin) companyTd = `<a href="/company/${companyName}">${companyName}</a>`;
      const createdTimeEntryTable = $('#createdTimeEntryTable');
      const timeEntryTableType = "created";
      const timeEntryTableRowNumber = createdTimeEntryTable.find('tr').length-2;
      createdTimeEntryTable.DataTable().row.add([
        `${moment.utc(res.data.timeEntry.date).format("YYYY-MM-DD")}`,
        `${companyTd}`,
        `${res.data.timeEntry.hours}`,
        `${res.data.timeEntry.description}`,
        `${createTimeEntryTableActionButtonsHtml(res, timeEntryTableType, timeEntryTableRowNumber)}`
      ]).draw().node().id = `${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}`;
      updateTotalTimeEntryTableHours(timeEntryTableType, 0, res.data.timeEntry.hours);
      instantiateTimeEntryTableActions(
        timeEntryTableType,
        `#${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Approve`,
        `#${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Hide`,
        `#${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Reject`,
        `#${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Submit`,
        `#${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Delete`,
      );
      instantiateEditTimeEntryBtn(`#${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Edit`);
      createdTimeEntryTable.find('#hours, #description').val('test');
    })
    .catch(console.error);
}

function ajaxAddSubmittedTimeEntry(e) {
  console.log(`ajaxAddSubmittedTimeEntry`);
  e.preventDefault();
  createTimeEntryValidation();
  axios
    .post(this.action, {
      date: this.date.value,
      company: this.company.value,
      hourLog: this.hourLog.value,
      hours: this.hours.value,
      description: this.description.value
    })
    .then(res => {
      const submittedTimeEntryTable = $('#submittedTimeEntryTable');
      const timeEntryTableType = "submitted";
      const timeEntryTableRowNumber = submittedTimeEntryTable.find('tr').length-2;
      submittedTimeEntryTable.DataTable().row.add([
        `${moment.utc(res.data.timeEntry.date).format("YYYY-MM-DD")}`,
        `<a href="/company/${res.data.timeEntry.publicCompany.name}">${res.data.timeEntry.publicCompany.name}</a>`,
        `${res.data.timeEntry.publicUser.firstName} ${res.data.timeEntry.publicUser.lastName}`,
        `${res.data.timeEntry.hours}`,
        `${res.data.timeEntry.description}`,
        `${createTimeEntryTableActionButtonsHtml(res, timeEntryTableType, timeEntryTableRowNumber)}`
      ]).draw().node().id = `${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}`;
      updateTotalTimeEntryTableHours(timeEntryTableType, 0, res.data.timeEntry.hours);
      instantiateTimeEntryTableActions(
        timeEntryTableType,
        `#${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Approve`,
        `#${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Hide`,
        `#${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Reject`,
        `#${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Submit`,
        `#${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Delete`,
      );
      instantiateEditTimeEntryBtn(`#${timeEntryTableType}TimeEntryTableRow${timeEntryTableRowNumber}Edit`);
      submittedTimeEntryTable.find('#hours, #description').val('test');
    })
    .catch(console.error);
}