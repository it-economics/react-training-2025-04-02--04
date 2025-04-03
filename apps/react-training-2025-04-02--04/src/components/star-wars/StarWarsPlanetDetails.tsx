import { Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export const StarWarsPlanetDetails = () => {
  const {id: planetId} = useParams<{id: string}>()

  return (
    <Stack>
     <Typography variant="h3">Planet Details</Typography>
     <Typography variant="h4">Planet ID: {planetId}</Typography>
    </Stack>
  )
}
