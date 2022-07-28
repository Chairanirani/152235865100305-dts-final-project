import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Box } from "@mui/system";
import JuzCard from "../components/JuzCard";

const JuzList = () => {

    const jumlahJuz = [1,2,3,4,5,6,7,8,9,10,
                        11,12,13,14,15,16,17,18,19,20,
                        21,22,23,24,25,26,27,28,29,30
                      ];

    // const [juzs, setJuzs] = useState([]);

    // useEffect(() => {
    //     const fetchJuz = async () => {
            
    //         try {
    //             const fetchedJuz = await axios.get(`http://api.alquran.cloud/v1/juz/1/en.asad`);
    //             setJuzs(fetchedJuz.data.data.ayahs);
    //             // console.log(setJuzs);

    //         }catch (error) {
    //             console.log(error);
    //         }
    //     }

    //     fetchJuz();
    // }, []);
    
    return (
        <div className="App" style={{ backgroundImage: 'url("../assets/images/background-logo.png")', backgroundSize: '10% 10%' }}>
                {/* {
                            juzs.map(jus => (
                                <h1>{jus.surah.name}</h1>
                            ))
                        } */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                mt: 5,
            }}>
                    {
                        jumlahJuz.map(jus => 
                            <JuzCard jus={jus} />
                        )
                    }
                    
            </Box>
        </div>
    );
}

export default JuzList;