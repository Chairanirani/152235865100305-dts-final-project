import * as React from 'react';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const IsiAccordionJuzEn = (prop) => {

    const [juzs, setJuzs] = React.useState({data : []});

    const offset = prop.numberInSurah - 1;
    

    // const url = `http://api.alquran.cloud/v1/surah/${prop.parameterJuz}/en.asad?offset=${offset}&limit=1`;
    let params = new URLSearchParams();
    params.append("offset", offset);
    params.append("limit", 1);
    const request = {
        params: params
    };

    React.useEffect(() => {
        const fetchJuz = async () => {
            
            try {
                const fetchedJuz = await axios.get(`http://api.alquran.cloud/v1/surah/${prop.surahNumber}/en.asad`,request);
                
                setJuzs({
                    data : fetchedJuz.data.data.ayahs[0].text
                });
               

            }catch (error) {
                console.log(error);
            }
        }

        fetchJuz();
    }, []);

    // console.log(juzs.data);

    return (
        <>
        {
            
                    <>
                    <Typography sx={{ fontSize: '10px', textAlign: 'right' }}>{juzs.data}</Typography>
                    </>
           
        }
        </>
    )
}

export default IsiAccordionJuzEn;