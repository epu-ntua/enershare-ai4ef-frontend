import React, {useState} from 'react';
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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function InvestmentPlanning() {
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

    const handleFormChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleSave = () => {
        // Check if all fields are filled before executing the save function
        const isFormValid = Object.values(formData).every((value) => value.trim() !== '');
        if (isFormValid) {
            // Your save logic here
            console.log('Form saved:', formData);
        }
    };

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
                                    <MenuItem value="Yes">Yes</MenuItem>
                                    <MenuItem value="No">No</MenuItem>
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
                                    {/* Add other options here */}
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
                                    {/* Add other options here */}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="flex-end" mt={3} mb={1}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                            sx={{ backgroundColor: '#9966ff', borderColor: '#9966ff', color: 'white' }}
                        >
                            CALCULATE
                        </Button>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Container>
    );
}

export default InvestmentPlanning;
