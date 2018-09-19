import React from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

import 'react-table/react-table.css';

const HourLogTable = ({ tableTitle, hourLogs }) => {
  console.log(hourLogs);

  const columns = [{
    Header: () => (
      <span className="table-title">{tableTitle}</span>
    ),
    columns: [{
      Header: 'Date Opened',
      accessor: 'dateOpened',
      Cell: data => data.original.dateOpened.split('T')[0],
      maxWidth: 100,
    }, {
      Header: 'Date Closed',
      accessor: 'dateClosed',
      Cell: data => {
        console.log(data.original.dateClosed);
        if (data.original.dateClosed === '1970-01-01T00:00:00.000Z') {
          return '';
        }
        return data.original.dateClosed.split('T')[0];
      },
      maxWidth: 100,
    }, {
      Header: 'Company',
      id: 'company',
      accessor: data => <Link to={`/company/${data.company._id}`}>{data.company.name}</Link>,
    }, {
      Header: 'Title',
      id: 'title',
      accessor: data => <Link to={`/hourLog/${data._id}`}>{data.title}</Link>,
    }, {
      Header: 'Hours',
      accessor: 'totalPublicHours',
      maxWidth: 70,
    }, {
      Header: 'Hidden',
      accessor: 'totalHiddenHours',
      maxWidth: 70,
    }],
  }];

  return (
    <ReactTable
      data={hourLogs}
      columns={columns}
      className="-striped -highlight"
      noDataText="Loading..."
      defaultSorted={[
        {
          id: 'dateOpened',
          desc: true,
        },
        {
          id: 'company',
          asc: true,
        },
      ]}
    />
  );
};

export default HourLogTable;
