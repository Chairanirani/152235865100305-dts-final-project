import React from "react";
import axios from 'axios';
import { Typography } from "@mui/material";

const DetailSurahEn = (prop) => {
    const [surahs, setSurahs] = React.useState({data : []});

    const offset = prop.numberInSurah - 1;

    React.useEffect(() => {
        const fetchJuz = async () => {
            
            try {
                const fetchedJuz = await axios.get(`http://api.alquran.cloud/v1/surah/${prop.numberOfSurah}/en.asad`, {params: {offset: offset, limit: 1}});
                
                setSurahs({
                    data : fetchedJuz.data.data.ayahs[0].text
                });
               

            }catch (error) {
                console.log(error);
            }
        }

        fetchJuz();
    }, []);

    console.log(surahs.data)

    return (
        <Typography>{surahs.data}</Typography>
    )
}

export default DetailSurahEn;