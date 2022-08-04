import { Typography } from "@mui/material";
import React from "react";
import axios from "axios";

const DetailWaktuSholat = (prop) => {

    const [times, setTimes] = React.useState([]);

    

    //https://api.myquran.com/v1/sholat/jadwal/${prop.idCity}/${eYear}/${month}/${date}
    React.useEffect(() => {
        const fetchTime = async () => {
            try {
                const fetchedTime = await axios.get(`https://api.myquran.com/v1/sholat/jadwal/${prop.idCity}/${prop.myYear}/${prop.myMonth}/${prop.myDate}`);

                setTimes(fetchedTime.data.data.jadwal);

            }catch (error) {
                console.log(error);
            }
        }

        fetchTime();
    }, [prop.idCity]);
    
    return ( prop.idCity ? (
        <>
            <Typography variant="h5" color="white">Imsak : {times.imsak}</Typography>
            <Typography variant="h5" color="white">Subuh : {times.subuh}</Typography>
            <Typography variant="h5" color="white">Terbit : {times.terbit}</Typography>
            <Typography variant="h5" color="white">Dhuha : {times.dhuha}</Typography>
            <Typography variant="h5" color="white">Dzuhur : {times.dzuhur}</Typography>
            <Typography variant="h5" color="white">Ashar : {times.ashar}</Typography>
            <Typography variant="h5" color="white">Maghrib : {times.maghrib}</Typography>
            <Typography variant="h5" color="white">Isya : {times.isya}</Typography>
        </>
        ) : (<Typography color="white">Belum ada kota yang dipilih</Typography>)
    )
}

export default DetailWaktuSholat;