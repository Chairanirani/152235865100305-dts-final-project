import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import './App.css';
import { auth, db } from "./configs/Firebase.js";
import { query, collection, getDocs, where } from "firebase/firestore";
import Box from '@mui/material/Box';
import Navbar from './containers/Navbar';
import { Autocomplete, Grid, Paper, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import axios from "axios";
import DetailWaktuSholat from "./containers/DetailWaktuSholat";
import { Container } from "@mui/system";

function App() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#398486',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const [cities, setCities] = React.useState([]);

    React.useEffect(() => {
        const fetchCity = async () => {
            try {
                const fetchedCity = await axios.get("https://api.myquran.com/v1/sholat/kota/semua");

                setCities(fetchedCity.data);

            }catch (error) {
                console.log(error);
            }
        }

        fetchCity();
    }, []);

    console.log(cities)

    const [city, setCity] = useState("");
    
    const myDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    const newDate = new Date()
    const eDate = newDate.getDate();
    const eMonth = newDate.getMonth() + 1;
    const eYear = newDate.getFullYear();
    const thisDay = newDate.getDay();

    const month = `${eMonth < 10 ? `0${eMonth}` : `${eMonth}`}`;
    const date = `${eDate < 10 ? `0${eDate}` : `${eDate}`}`;

    const currentDate = `${myDays[thisDay]}, ${date}/${month}/${eYear}`;

  return (
    <div className="App"> 
      <Navbar userName={name} userEmail={user?.email} />
      <Grid container style={{ 
            minHeight: "100vh", 
            backgroundImage: "url(../../assets/images/78824.jpg)", 
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
             }}>
              <Container component="main" maxWidth="xs"
      sx={{ 
        backgroundColor: "white", 
        height: "20%" , 
        marginTop: "90px", 
        marginBottom: "90px",
        boxShadow: "5px 10px 18px #888888" 
    }}>
      <Box >
        
          <Typography variant="h4">WAKTU SHOLAT </Typography>
          <Typography variant="h6">{currentDate}</Typography>
        
        
          <Autocomplete 
            id="waktu_sholat_demo"
            getOptionLabel={(cities) => `${cities.lokasi}`}
            options={cities}
            fullWidth
            isOptionEqualToValue={(option, value) =>
            option.lokasi === value.lokasi}
            noOptionsText={"NO LOCATION"}
            renderOption={(props, cities) => (
              <Box component="li" {...props} key={cities.id}>
                {cities.lokasi}
              </Box>
            )}
            renderInput={(params) => 
            <TextField {...params} label="choose city .." />}
            value={city}
            onChange={(event, newValue) => setCity(newValue)}
          />
          
        
        
        <Item>
              <DetailWaktuSholat idCity={city.id} myDate={date} myMonth={month} myYear={eYear} />
        </Item>
      </Box>
      </Container>
      </Grid>
    </div>
  );
}


export default App;
