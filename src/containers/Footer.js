import { Button, Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import ReactAudioPlayer from 'react-audio-player';

const Footer = (prop) => {
    return (
        <div className="footer">
        <Box px={{ xs: 3, sm: 1 }} py={{ xs:5, sm: 1 }} bgcolor="#398486" color="white">
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Box pb={{ xs: 1, sm: 1 }}>
                            &reg; 2022 Final-Project-152235865100305 - Destryana Rahmi Chairani
                        </Box>
                        
                    </Grid>
                    
                </Grid>                
            </Container>
        </Box>
        </div>
    )
}

export default Footer;