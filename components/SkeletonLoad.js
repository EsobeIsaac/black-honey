import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

function SkeletonLoad() {
  return (
    <Box>
        <Container>
            <Box py={1}>
                <Stack direction={'row'} spacing={2}>
                    <Skeleton variant='text' height={20} width={'50%'} />
                    <Skeleton variant='text' height={20} width={'50%'} />
                </Stack>
                <Skeleton variant='circular' height={80} width={80} />
                <Skeleton variant='rectangular' height={40} width={'100%'} />
            </Box>
            <Box py={1}>
                <Stack direction={'row'} spacing={2}>
                    <Skeleton variant='text' height={20} width={'50%'} />
                    <Skeleton variant='text' height={20} width={'50%'} />
                </Stack>
                <Skeleton variant='circular' height={80} width={80}/>
                <Skeleton variant='rectangular' height={40} width={'100%'} />
            </Box>
            <Box py={1}>
                <Stack direction={'row'} spacing={2}>
                    <Skeleton variant='text' height={20} width={'50%'} />
                    <Skeleton variant='text' height={20} width={'50%'} />
                </Stack>
                <Skeleton variant='circular' height={80} width={80}/>
                <Skeleton variant='rectangular' height={40} width={'100%'} />
            </Box>
        </Container>
    </Box>
  );
}

export default SkeletonLoad;
