import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import { Issue, IssuePriority } from '../model/issue';
import { useIssuesHandling } from '../contexts/IssuesHandlingContext';
import { Add, Delete, Save } from '@mui/icons-material';
import { Button } from '@mui/material';

export const IssuesTable = () => {
  const { issues, deleteIssue, updateIssue } = useIssuesHandling();

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
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: ({ row }: GridRowParams<Issue>) => {
        return [
          <GridActionsCellItem
            label="Delete"
            className="textPrimary"
            icon={<Delete />}
            color="inherit"
            onClick={() => deleteIssue(row.id)}
          />,
        ];
      },
    },
  ];

  return (
    <DataGrid
      columns={columns}
      rows={issues}
      slots={{ toolbar: EditToolbar }}
      processRowUpdate={(newRow) => {
        updateIssue(newRow);
        return newRow;
      }}
    />
  );
};

const EditToolbar = () => {
  const { addIssue, saveIssues } = useIssuesHandling();
  return (
    <GridToolbarContainer>
      <Button startIcon={<Add />} onClick={addIssue}>
        Add Issue
      </Button>
      <Button startIcon={<Save />} onClick={saveIssues}>
        Save
      </Button>
    </GridToolbarContainer>
  );
};
