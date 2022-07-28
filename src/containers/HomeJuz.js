import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
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

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
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
                //  console.log(setJuzs);

            }catch (error) {
                console.log(error);
            }
        }

        fetchJuz();
    }, []);

  
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
                        {/* <AccordionDetails>
                        {
                            juzs.data
                            .filter(x => x.surah.number === 1)
                            .map(x => (
                                <Typography>{x.text}</Typography>
                            ))

                        }
                        </AccordionDetails> */}
                    </Accordion>
                ))
                
                
            }
            <Accordion expanded={expanded === 'panel10'} onChange={handleChange('panel10')} >
                <AccordionSummary aria-controls="panel10d-content" id="panel10d-header">
                <Typography key={5}>
                  {
                    //  juzs.data2.englishName
                    Object.keys(juzs.data2)[0]
                    
                  } (
                    {
                        // juzs.data2.name
                    }
                  )
                </Typography>
                </AccordionSummary>
                <AccordionDetails>
                {
                    juzs.data
                    .filter(x => x.surah.number === 1)
                    .map(x => (
                        <Typography>{x.surah.name}</Typography>
                    ))

                }
                
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel20'} onChange={handleChange('panel20')}>
                <AccordionSummary aria-controls="panel20d-content" id="panel20d-header">
                <Typography>Collapsible Group Item #2</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                    sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                <Typography>Collapsible Group Item #3</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                    sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                </Typography>
                </AccordionDetails>
            </Accordion>
      </Item>
    </Box>
  );
}

export default HomeJuz;