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
import { useComponentsTranslation, useEnumsTranslation } from '../../i18n';

export const IssuesTable = () => {
  const { issues, deleteIssue, updateIssue } = useIssuesHandling();
  const { t: tEnum } = useEnumsTranslation('IssuePriority');
  const { t: tComponent } = useComponentsTranslation('IssuesTable.columns');

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: tComponent('id'),
      width: 100,
      type: 'string',
      sortable: true,
    },
    {
      field: 'title',
      headerName: tComponent('title'),
      width: 200,
      type: 'string',
      sortable: true,
      editable: true,
    },
    {
      field: 'description',
      headerName: tComponent('description'),
      width: 200,
      type: 'string',
      sortable: true,
      editable: true,
    },
    {
      field: 'completed',
      headerName: tComponent('completed'),
      width: 150,
      type: 'boolean',
      sortable: true,
      editable: true,
    },
    {
      field: 'priority',
      headerName: tComponent('priority'),
      width: 100,
      type: 'singleSelect',
      editable: true,
      valueOptions: Object.values(IssuePriority),
      getOptionLabel: (value) => tEnum(value),
    },
    {
      field: 'createdAt',
      headerName: tComponent('createdAt'),
      width: 200,
      type: 'date',
      valueFormatter: (value) => new Date(value).toUTCString(),
      sortable: true,
      editable: false,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: tComponent('actions'),
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
  const { t: tActions } = useComponentsTranslation('IssuesTable.actions');

  return (
    <GridToolbarContainer>
      <Button startIcon={<Add />} onClick={addIssue}>
        {tActions('addIssue')}
      </Button>
      <Button startIcon={<Save />} onClick={saveIssues}>
        {tActions('save')}
      </Button>
    </GridToolbarContainer>
  );
};
