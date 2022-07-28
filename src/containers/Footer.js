import { Button, Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import ReactAudioPlayer from 'react-audio-player';

const Footer = (prop) => {
    return (
        <div className="footer">
        <Box px={{ xs: 3, sm: 1 }} py={{ xs:5, sm: 1 }} bgcolor="black" color="white">
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={4}>
                        <Box pb={{ xs: 1, sm: 1 }}>
                            Audio and Subtitles
                        </Box>
                        
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box pb={{ xs: 1, sm: 1 }}>
                           {prop.num}
                        </Box>
                        
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <ReactAudioPlayer 
                            src="https://cdn.islamic.network/quran/audio/64/ar.alafasy/262.mp3"
                            controls 
                        />
                        
                    </Grid>
                </Grid>
                
                <Box pt={{ xs: 3, sm: 4 }}>
                    &reg; 2022 Movies, All right Reserved
                </Box>
            </Container>
        </Box>
        </div>
    )
}

export default Footer;