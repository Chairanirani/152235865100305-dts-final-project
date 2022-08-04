import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { styled } from '@mui/material/styles';
import { Box } from "@mui/system";
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import DetailSurahEn from "./DetailSurahEn";
import Navbar from '../containers/Navbar';
  
export default function DetailSurah() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '	rgb(245,245,245)',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
  
    let params = useParams();

    const parameterSurah = params?.plan;

    const [surahs, setSurahs] = React.useState({data : [], data2: [], data3: [], data4:[]});

    React.useEffect(() => {
        const fetchSurah = async () => {
            
            try {
                const fetchedSurah = await axios.get(`http://api.alquran.cloud/v1/surah/${parameterSurah}`);

                const fetchedSurahEn = await axios.get(`http://api.alquran.cloud/v1/surah/${parameterSurah}/en.asad`);

                setSurahs({
                    data : fetchedSurah.data.data.ayahs,
                    data2 : fetchedSurah.data.data.name,
                    data3 : fetchedSurah.data.data.englishName,
                    data4: fetchedSurah.data.data.number,
                });

            }catch (error) {
                console.log(error);
            }
        }

        fetchSurah();
    }, []);

  return (
    <Box sx={{ flexGrow: 1, padding: '100px' }} >
        <Item key={`b${surahs.data3}`}>
            <Typography>
                {`Surah ${surahs.data3} (${surahs.data2})`}
            </Typography>
        </Item>
        <Item key={`c${surahs.data2}`}>
        {
            // console.log(surahs.data.ayahs[0].number)
            surahs.data.map(x=> (
                

                <Grid container spacing={1} sx={{ borderBottom: '1px solid black' }} key={`a${x.number}`}>
                    <Grid item xs={6} md={12} sx={{ marginTop: '10px' }}>
                        <Typography sx={{ fontSize: '30px', textAlign: 'center', padding: '10px', margin: '5px' }}>{x.text}</Typography> 
                        {/* <DetailSurahEn numberInSurah={x.numberInSurah} numberOfSurah={surahs.data4} /> */}
                    </Grid>
                </Grid>
            ))
        }
        </Item>
        {/* <Item>
        {
            
                surahs.data4.map(y=> (

                    <Grid container spacing={1} sx={{ borderBottom: '1px solid black' }}>
                        <Grid item xs={6} md={12} sx={{ marginTop: '10px' }}>
                           
                            <Typography sx={{ fontSize: '15px', textAlign: 'center', padding: '10px', margin: '5px' }}>{y.text}</Typography> 
                        </Grid>
                        
                    </Grid>
                ))
           
        }
        </Item> */}

        <Navbar numSurah={surahs.data4} />
    </Box>
  );
}