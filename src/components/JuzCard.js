import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const JuzCard = (jus) => {
    let navigate = useNavigate();

    let juzs = jus.jus;

    let images = `../assets/images/juz${juzs}.png`;

    const onChoosen = (juz) => {
        navigate(`/choosenJuz/${juz}`);
    }

    return (
        <Card sx={{ display: 'grid', width: 200, margin: 5, backgroundColor: '#398486', boxShadow: '5px 10px 8px #fff' }}
        className="card-juz">
            <CardActionArea onClick={() => onChoosen(juzs)}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h6" sx={{ color: "white" }}>
                        JUZ
                    </Typography>
                    
                </CardContent>
                <CardMedia
                    component="img" 
                    sx={{ width: 80, height: 100, margin: '0 auto', paddingBottom: '20px' }}
                    image={images}
                    alt="Juz Poster"
                />
                <Box sx={{ display: 'grid', flexDirection: 'column' }}>
                    
                </Box>
            </CardActionArea>
        </Card>
    )
}

export default JuzCard;