import { List, Paper } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import SurahCard from "../components/SurahCard";
import { styled, alpha } from '@mui/material/styles';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Navbar from "./Navbar";
import { auth, db } from "../configs/Firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  

const SurahList = () => {
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
    
    const [surahs, setSurahs] = React.useState({data: []});

    React.useEffect(() => {
        const fetchSurah = async () => {
            try {
                const fetchedSurah = await axios.get("http://api.alquran.cloud/v1/surah");

                setSurahs({
                    data : fetchedSurah.data.data
                });

            }catch (error) {
                console.log(error);
            }
        }

        fetchSurah();
    }, []);

    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');

   
    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = surahs.data.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(surahs.data)
        }
    }
 
    
    return (
        <div className="surahList" sx={{ display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
             }}  style={{ backgroundImage: 'url("../assets/images/back-logo-surah.jpg")', backgroundSize: 'contain' }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 5,
                flexGrow: 1, 
                padding: '100px',
                margin: '0 auto'
                }}
                key={'2'}
            >
                
                <Item key={'ab'}>
                    <nav aria-label="main mailbox folders">
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(e) => searchItems(e.target.value)}
                        />
                    </Search>
                        <List>
                            {
                                searchInput.length > 1 ? (
                                    filteredResults.map((x) => (
                                        <SurahCard number={x.number} name={x.name} enName={x.englishName} place={x.revelationType} meaning={x.englishNameTranslation} jlh={x.numberOfAyahs} key={x.number}/>
                                    ))
                                ):(
                                    surahs.data.map(x=> (
                                        <SurahCard number={x.number} name={x.name} enName={x.englishName} place={x.revelationType} meaning={x.englishNameTranslation} jlh={x.numberOfAyahs} key={x.number} />
                                        
                                    ))
                                )
                            }
                           
                        </List>
                    </nav>
                </Item>
                
            </Box>
            <Navbar userName={name} userEmail={user?.email} />
        </div>
    );
}

export default SurahList;