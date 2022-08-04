import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import IsiAccordionJuz from '../components/IsiAccordionJuz';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));


const HomeJuz = ()=> {
  const [expanded, setExpanded] = React.useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  let params = useParams();

    const parameterJuz = params?.plan;

    const [juzs, setJuzs] = React.useState({data : [], data2 : []});

    React.useEffect(() => {
        const fetchJuz = async () => {
            
            try {
                const fetchedJuz = await axios.get(`http://api.alquran.cloud/v1/juz/${parameterJuz}`);

                setJuzs({
                    data : fetchedJuz.data.data.ayahs,
                    data2 : fetchedJuz.data.data.surahs
                });

            }catch (error) {
                console.log(error);
                alert("Please check your chronme setting-->site setting--> Insecure content--> change it to 'Allow' to show API data")
            }
        }

        fetchJuz();
    }, [parameterJuz]);

  
  return (
    <Box sx={{ flexGrow: 1, padding: '100px' }} >
        <Item key={1}>
            <Typography key={parameterJuz}>JUZ {parameterJuz}</Typography>
        </Item>
        <Item key={2}>
            {
                Object.keys(juzs.data2).map(x => (
                    <Accordion 
                        expanded={expanded === `panel${x}`} 
                        onChange={handleChange(`panel${x}`)} 
                        key={x}
                    >
                        <AccordionSummary 
                            aria-controls={`panel${x}d-content`} 
                            id={`panel${x}d-header`}
                            key={`a${juzs.data2[x].number}`}
                        >
                        <Typography key={`judul${juzs.data2[x].number}`}>
                        {
                            
                            juzs.data2[x].englishName
                            
                        } (
                            {
                                
                                juzs.data2[x].name
                            }
                        )
                        </Typography>
                        </AccordionSummary>
                        <IsiAccordionJuz numberSurah = {juzs.data2[x].number} parameterJuz={parameterJuz} />
                        
                    </Accordion>
                ))
                
                
            }
            
      </Item>
    </Box>
  );
}

export default HomeJuz;