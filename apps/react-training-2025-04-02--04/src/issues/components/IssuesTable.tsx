import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { issueFactory, IssuePriority } from '../model/issue';

const issues = [
  issueFactory(),
  issueFactory(),
  issueFactory(),
  issueFactory(),
  issueFactory(),
  issueFactory(),
];

export const IssuesTable = () => {
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      type: 'string',
      sortable: true,
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 200,
      type: 'string',
      sortable: true,
      editable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 200,
      type: 'string',
      sortable: true,
      editable: true,
    },
    {
      field: 'completed',
      headerName: 'Completed',
      width: 150,
      type: 'boolean',
      sortable: true,
      editable: true,
    },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 100,
      type: 'singleSelect',
      editable: true,
      valueOptions: Object.values(IssuePriority),
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 200,
      type: 'date',
      valueFormatter: (value) => new Date(value).toUTCString(),
      sortable: true,
      editable: false,
    },
  ];

  return <DataGrid columns={columns} rows={issues} />;
};
