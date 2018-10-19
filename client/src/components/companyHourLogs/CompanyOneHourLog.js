import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import $ from 'jquery';


import SpinnerClipLoader from '../SpinnerClipLoader';
import CompanyOneHourLogControls from './CompanyOneHourLogControls';
import TimeEntryTable from '../timeEntries/TimeEntryTable';
import CompanyOneHourLogSubmitTimeEntry from './CompanyOneHourLogSubmitTimeEntry';

import { getCompanyHourLog } from '../../actions/companyHourLog';
import { getActiveUsers } from '../../actions/user';
import { getActiveCompanies } from '../../actions/company';


class CompanyOneHourLog extends Component {
  componentDidMount() {
    const { match } = this.props;
    this.props.getCompanyHourLog(match.params.companyHourLogId);
    this.props.getActiveUsers();
    this.props.getActiveCompanies();
  }

  componentDidUpdate() {
    $('.time-entry-table-bulk-action').attr('disabled', false);
  }

  render() {
    const {
      auth, companyHourLog, activeUsers, activeCompanies, match,
    } = this.props;

    if (!companyHourLog.timeEntries || companyHourLog._id !== match.params.companyHourLogId) {
      return (
        <div>
          <SpinnerClipLoader />
        </div>
      );
    }

    const approvedTimeEntries = companyHourLog.timeEntries.filter(timeEntry => timeEntry.status === 'approved');
    const hiddenTimeEntries = companyHourLog.timeEntries.filter(timeEntry => timeEntry.status === 'hidden');
    const submittedTimeEntries = companyHourLog.timeEntries.filter(timeEntry => timeEntry.status === 'submitted');


    return (
      <div className="container table-font-size">
        <CompanyOneHourLogControls
          companyHourLog={companyHourLog}
          initialValues={companyHourLog.title === 'Current' ? { title: moment.utc().format('YYYY-MM-DD') } : { title: companyHourLog.title }}
          timeEntries={approvedTimeEntries}
        />
        <div className="m-5" />
        <TimeEntryTable
          auth={auth}
          companyHourLogTitle={companyHourLog.title}
          tableTitle="Approved Time Entries"
          timeEntries={approvedTimeEntries}
          match={match}
          activeUsers={activeUsers}
          activeCompanies={activeCompanies}
          defaultPageSize={approvedTimeEntries.length}
          minRows={approvedTimeEntries.length}
        />
        <div className="m-5" />
        <TimeEntryTable
          auth={auth}
          companyHourLogTitle={companyHourLog.title}
          tableTitle="Hidden Time Entries"
          timeEntries={hiddenTimeEntries}
          match={match}
          activeUsers={activeUsers}
          activeCompanies={activeCompanies}
          defaultPageSize={hiddenTimeEntries.length}
          minRows={hiddenTimeEntries.length}
        />
        <div className="m-5" />
        <TimeEntryTable
          auth={auth}
          companyHourLogTitle={companyHourLog.title}
          tableTitle="Submitted Time Entries"
          timeEntries={submittedTimeEntries}
          match={match}
          activeUsers={activeUsers}
          activeCompanies={activeCompanies}
          defaultPageSize={submittedTimeEntries.length}
          minRows={submittedTimeEntries.length}
        />
        <div className="m-5" />
        <CompanyOneHourLogSubmitTimeEntry company={companyHourLog.company || ''} companyHourLogTitle={companyHourLog.title} companyHourLogId={match.params.companyHourLogId} />
      </div>
    );
  }
}

function mapStateToProps({ companyHourLog, activeUsers, activeCompanies }) {
  return { companyHourLog, activeUsers, activeCompanies };
}

export default connect(mapStateToProps, { getCompanyHourLog, getActiveUsers, getActiveCompanies })(CompanyOneHourLog);