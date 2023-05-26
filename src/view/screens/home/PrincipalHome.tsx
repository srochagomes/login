import { Inter } from 'next/font/google'
import Grid from '@mui/material/Grid'; // Grid version 2
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import accessRequired from '@/domain/auth/AccessRequireService';



const inter = Inter({ subsets: ['latin'] })


export default function PrincipalHome() {
    let payload = accessRequired().then((obj)=>{
      console.log("payload dentro :",obj);
    });

    console.log("payload fora:",payload);
    

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

  return (
    <>      
        <Grid
            container
            direction="column"
            justifyContent="space-around"
            alignItems="center">

            <Box sx={{ my: 8 }}>
            <Item>teste</Item>
            <Item>teste</Item>
            
          {[...new Array(200)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            )
            .join('\n')}
        </Box>
        </Grid>
     
    </>
  )
}
