import { Button, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemSecondaryAction, ListItemText, Paper, Typography } from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import React from "react";
import { useNavigate } from 'react-router-dom';


const SurahCard = (prop) => {

    let navigate = useNavigate();

    const onClickDetail = (plan) => {
        navigate(`/detailSurah/${plan}`);
    }
    
    return (
        <ListItem disablePadding>
            <ListItemButton onClick={() => onClickDetail(prop.number)}>
            <ListItemIcon>
                <InboxIcon />
            </ListItemIcon>
            <ListItemText 
                primary={`${prop.enName} (${prop.name})`}
                secondary={
                    <React.Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        {`${prop.jlh} ayahs, ${prop.place}`}
                    </Typography>
                    {` — ${prop.meaning}`}
                    </React.Fragment>
                }
            />
            </ListItemButton>
        </ListItem>
    )
}

export default SurahCard;