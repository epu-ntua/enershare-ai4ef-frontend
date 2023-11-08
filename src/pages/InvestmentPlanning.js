import React, {useState} from 'react';
import {useTheme} from '@mui/material/styles';

import {
    Container,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    Typography,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Card,
    Box,
    IconButton,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

import Loading from "../components/layout/Loading";

const recommendationsTemp = [
    {
        "title": "Carrying out construction works",
        "description": "Carrying out construction works in the enclosing structures during the project (to increase the energy efficiency of the house)",
        "type": "int",
        "unit": "-",
        "minimum": "0",
        "maximum": "1",
        "id": "1"
    },
    {
        "title": "Reconstruction of engineering systems",
        "description": "Reconstruction of engineering systems (ventilation, recuperation) to increase the energy efficiency of the house (during the project)",
        "type": "int",
        "unit": "-",
        "minimum": "0",
        "maximum": "2",
        "id": "2"
    },
    {
        "title": "Water heating system",
        "description": "Installation of a new water heating system (during the project)",
        "type": "int",
        "unit": "-",
        "minimum": "0",
        "maximum": "3",
        "id": "3"
    },
    {
        "title": "Heat installation",
        "description": "Installation of heat installations to ensure the production of heat from renewable energy sources",
        "type": "int",
        "unit": "-",
        "minimum": "0",
        "maximum": "4",
        "id": "4"
    }
];

function InvestmentPlanning() {
    const theme = useTheme();

    const initialFormState = {
        BuildingTotalArea: '',
        UndergroundFloor: '',
        ReferenceArea: '',
        EnergyConsumptionBefore: '',
        AboveGroundFloors: '',
        InitialEnergyClass: '',
        EnergyClassAfter: '',
    };

    const [formData, setFormData] = useState(initialFormState);
    const [accordionOpen, setAccordionOpen] = useState(true); // Set the Accordion to be expanded by default
    const [loading, setLoading] = useState(false)
    const [recommendations, setRecommendations] = useState([])

    const handleFormChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleSave = () => {
        // Check if all fields are filled before executing the save function
        const isFormValid = Object.values(formData).every((value) => {
            if (typeof value === 'string') {
                return value.trim() !== '';
            }
            return true; // Treat non-strings as valid
        });

        if (isFormValid) {
            setLoading(true)

            // Your save logic here
            console.log('Form saved:', formData);
            setTimeout(() => {
                setRecommendations([...recommendationsTemp])
                setLoading(false)
            }, 2000)
        }
    }

    return (
        <Container maxWidth="xl" sx={{my: 3}}>
            <Accordion expanded={accordionOpen} onChange={() => setAccordionOpen(!accordionOpen)}>
                <AccordionSummary>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item xs={12} sm={accordionOpen ? 6 : 2} style={{textAlign: 'left'}}>
                            <Typography variant="h6" component="div" style={{
                                flex: '2',
                                wordWrap: 'break-word',
                                color: '#9966ff',
                                fontWeight: 'bold'
                            }}>
                                Building Parameters
                            </Typography>
                        </Grid>
                        {accordionOpen ? (
                            <Button color="primary" onClick={() => setAccordionOpen(!accordionOpen)}>
                                <ExpandMoreIcon sx={{color: '#9966ff'}}/> {/* Display the chevron-up icon when open */}
                            </Button>
                        ) : (
                            <>
                                {Object.entries(formData).map(([key, value]) => (
                                    <Grid item xs={12} sm={1} key={key} style={{textAlign: 'center'}}>
                                        <Typography variant="body2">
                                            <strong>{key.replace(/([A-Z])/g, ' $1').trim()}</strong>
                                            <br/> {value || '-'}
                                        </Typography>
                                    </Grid>
                                ))}
                                <Grid item xs={12} sm={2} style={{textAlign: 'center'}}>
                                    <Button
                                        color="primary"
                                        size={'large'}
                                        onClick={() => setAccordionOpen(!accordionOpen)}
                                        variant="outlined" // Use outlined button
                                        sx={{borderColor: '#9966ff', color: '#9966ff'}}
                                    >
                                        {accordionOpen ? <ExpandMoreIcon sx={{color: '#9966ff'}}/> : 'EDIT'}
                                    </Button>
                                </Grid>
                            </>
                        )}
                    </Grid>
                </AccordionSummary>

                <AccordionDetails>
                    <Grid container spacing={2}>
                        {/* First Row */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="BuildingTotalArea"
                                label="Building Total Area"
                                fullWidth
                                value={formData.BuildingTotalArea}
                                onChange={handleFormChange}
                                required
                                type="number"
                                inputProps={{inputMode: 'numeric'}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth required>
                                <InputLabel>Underground Floor</InputLabel>
                                <Select
                                    name="UndergroundFloor"
                                    label="Underground Floor"
                                    value={formData.UndergroundFloor}
                                    onChange={handleFormChange}
                                    required
                                >
                                    <MenuItem value={1}>Yes</MenuItem>
                                    <MenuItem value={0}>No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="ReferenceArea"
                                label="Reference Area"
                                fullWidth
                                value={formData.ReferenceArea}
                                onChange={handleFormChange}
                                required
                                type="number"
                                inputProps={{inputMode: 'numeric'}}
                            />
                        </Grid>

                        {/* Second Row */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="EnergyConsumptionBefore"
                                label="Energy Consumption before"
                                fullWidth
                                value={formData.EnergyConsumptionBefore}
                                onChange={handleFormChange}
                                required
                                type="number"
                                inputProps={{inputMode: 'numeric'}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth required>
                                <InputLabel>Above-ground Floors</InputLabel>
                                <Select
                                    name="AboveGroundFloors"
                                    label="AboveGroundFloors"
                                    value={formData.AboveGroundFloors}
                                    onChange={handleFormChange}
                                    required
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <FormControl fullWidth required>
                                <InputLabel>Initial Energy Class</InputLabel>
                                <Select
                                    name="InitialEnergyClass"
                                    label="InitialEnergyClass"
                                    value={formData.InitialEnergyClass}
                                    onChange={handleFormChange}
                                    required
                                >
                                    <MenuItem value="A+">A+</MenuItem>
                                    <MenuItem value="A">A</MenuItem>
                                    <MenuItem value="B">B</MenuItem>
                                    <MenuItem value="C">C</MenuItem>
                                    <MenuItem value="D">D</MenuItem>
                                    <MenuItem value="E">E</MenuItem>
                                    <MenuItem value="F">F</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <FormControl fullWidth required>
                                <InputLabel>Energy Class After</InputLabel>
                                <Select
                                    name="EnergyClassAfter"
                                    label="EnergyClassAfter"
                                    value={formData.EnergyClassAfter}
                                    onChange={handleFormChange}
                                    required
                                >
                                    <MenuItem value="A+">A+</MenuItem>
                                    <MenuItem value="A">A</MenuItem>
                                    <MenuItem value="B">B</MenuItem>
                                    <MenuItem value="C">C</MenuItem>
                                    <MenuItem value="D">D</MenuItem>
                                    <MenuItem value="E">E</MenuItem>
                                    <MenuItem value="F">F</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="flex-end" mt={3} mb={1}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                            sx={{backgroundColor: '#9966ff', borderColor: '#9966ff', color: 'white'}}
                        >
                            CALCULATE
                        </Button>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {loading && <Loading/>}

            {!loading && recommendations.length > 0 &&
                <>
                    <Typography variant={'h4'} sx={{
                        color: theme.palette.primary.main,
                        mt: 5,
                        fontWeight: 'bold',
                        borderBottom: '1px solid #9966ff'
                    }}>Recommendations</Typography>
                    <Grid container spacing={2} my={1}>
                        {recommendations.map((recommendation) => (
                            <Grid item key={recommendation.id} xs={12} md={3}>
                                <Card sx={{
                                    backgroundColor: 'white',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}>
                                    <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                                        <Typography variant="h6" align={'center'} component="div" fontWeight={'bold'}
                                                    sx={{
                                                        marginTop: 0,
                                                        alignSelf: 'flex-start',
                                                        padding: '8px',
                                                        mx: 'auto',
                                                        color: theme.palette.primary.main
                                                    }}>
                                            {recommendation.title}
                                        </Typography>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <img
                                                src={`/images/id${recommendation.id}.jpg`}
                                                alt={recommendation.title}
                                                style={{marginTop: '20px', maxHeight: '140px', width: 'auto'}}
                                            />
                                            <Typography variant="body2" color="text.secondary" sx={{p: 2}}>
                                                {recommendation.description}
                                            </Typography>
                                        </div>
                                    </div>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                        marginBottom: '8px'
                                    }}>
                                        <div style={{display: 'flex', justifyContent: 'center'}}>
                                            <IconButton sx={{color: 'green'}}>
                                                <DoneIcon sx={{fontSize: 56}}/>
                                            </IconButton>
                                            <IconButton sx={{color: 'red'}}>
                                                <ClearIcon sx={{fontSize: 56}}/>
                                            </IconButton>
                                        </div>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </>
            }

        </Container>
    );
}

export default InvestmentPlanning;
