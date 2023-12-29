import { Box } from '@mui/material';
import LoadingIcon from '@public/images/grey.gif'
import Image from 'next/image';

function Loading() {
  return (
    <Box sx={{textAlign:'center'}}>
      <Image src={LoadingIcon} alt='loading' width={100} height={100}  />
    </Box>
  );
}

export default Loading;
