import * as React from 'react';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { Button, Grid } from '@mui/material';

import Navbar from '../containers/Navbar';

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));

const IsiAccordionJuz = (prop) => {

    const [juzs, setJuzs] = React.useState({data : [], data2 : []});
    const [footers, setFooters] = React.useState({nums : 0});

    React.useEffect(() => {
        const fetchJuz = async () => {
            
            try {
                const fetchedJuz = await axios.get(`http://api.alquran.cloud/v1/juz/${prop.parameterJuz}`);
                
                setJuzs({
                    data : fetchedJuz.data.data.ayahs
                });
                //  console.log(setJuzs);

            }catch (error) {
                console.log(error);
            }
        }

        fetchJuz();
    }, [prop.parameterJuz]);
    
    return (
        <AccordionDetails>
            {
                juzs.data
                .filter(x => x.surah.number === prop.numberSurah)
                .map(x => (
                    <Grid container spacing={1} sx={{ borderBottom: '1px solid black' }} key={x.number}>
                        <Grid item xs={6} md={2} sx={{ marginTop: '10px' }}>
                            <Button variant='outlined' onClick={()=> setFooters({nums: x.numberInSurah})}>PLAY</Button>
                        
                        </Grid>
                        <Grid item xs={6} md={9}>
                            <Typography sx={{ fontSize: '30px', textAlign: 'right', padding: '10px', margin: '5px' }}>{x.text}</Typography>
                            
                        </Grid>
                        <Grid item xs={6} md={1} >
                        <Typography sx={{ fontSize: '20px', textAlign: 'center', padding: '10px', margin: '5px', backgroundColor: '#ededed', borderRadius: '50%' }}> {(x.numberInSurah).toLocaleString('ar-u-nu-arab')}</Typography>
                        
                        </Grid>
                    </Grid>
                    
                ))
            }
            
            <Navbar num={footers.nums} />
        </AccordionDetails>
    )
}

export default IsiAccordionJuz;