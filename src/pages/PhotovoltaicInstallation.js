import React, { useState } from 'react';
import {Link} from "react-router-dom";
import { useTheme } from '@mui/material/styles';

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

import Breadcrumb from "../components/layout/Breadcrumb";

const breadcrumbs = [
    <Link className={'breadcrumbLink'} key="1" to="/">
        Homepage
    </Link>,
    <Typography
        underline="hover"
        key="2"
        color="primary"
        fontSize={'20px'}
        fontWeight={600}>
        Photovoltaic Installation
    </Typography>,
];

function PhotovoltaicInstallation() {
    const theme = useTheme();

    const initialFormState = {
        ElectricityConsumption: '',
        PrimaryEnergyConsumptionBefore: '',
        InverterSetPower: '',
        InverterPowerInProject: '',
        Region: '',
    };

    const [formData, setFormData] = useState(initialFormState);
    const [accordionOpen, setAccordionOpen] = useState(true); // Set the Accordion to be expanded by default

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleReset = () => {
        setFormData(initialFormState);
    };

    const handleSave = () => {
        // Your save logic here
        console.log('Form saved:', formData);
    };

    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={''} />
            <Container maxWidth="xl" sx={{ my: 3 }}>
                <Accordion expanded={accordionOpen} onChange={() => setAccordionOpen(!accordionOpen)}>
                    <AccordionSummary>
                        <Grid container justifyContent="space-between" alignItems="center">
                            {/* Customize the accordion header as needed */}
                            <Grid item xs={12} sm={accordionOpen ? 6 : 2} style={{ textAlign: 'left' }}>
                                <Typography variant="h6" component="div" style={{ flex: '2', wordWrap: 'break-word', color: '#9966ff', fontWeight: 'bold' }}>
                                    Photovoltaic Installation Parameters
                                </Typography>
                            </Grid>
                            {accordionOpen ? (
                                <Button color="primary" onClick={() => setAccordionOpen(!accordionOpen)}>
                                    <ExpandMoreIcon sx={{ color: '#9966ff' }} /> {/* Display the chevron-up icon when open */}
                                </Button>
                            ) : (
                                <>
                                    {/* Customize the content displayed when the accordion is closed */}
                                    {Object.entries(formData).map(([key, value]) => (
                                        <Grid item xs={12} sm={1} key={key} style={{ textAlign: 'center' }}>
                                            <Typography variant="body2">
                                                <strong>{key.replace(/([A-Z])/g, ' $1').trim()}</strong>
                                                <br /> {value || '-'}
                                            </Typography>
                                        </Grid>
                                    ))}
                                    <Grid item xs={12} sm={2} style={{ textAlign: 'center' }}>
                                        <Button
                                            color="primary"
                                            size={'large'}
                                            onClick={() => setAccordionOpen(!accordionOpen)}
                                            variant="outlined" // Use outlined button
                                            sx={{ borderColor: '#9966ff', color: '#9966ff' }}
                                        >
                                            {accordionOpen ? <ExpandMoreIcon sx={{ color: '#9966ff' }} /> : 'EDIT'}
                                        </Button>
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Grid container spacing={2}>
                            {/* Customize the form fields as needed */}
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="ElectricityConsumption"
                                    label="Electricity Consumption of the Grid (mWh)"
                                    fullWidth
                                    value={formData.ElectricityConsumption}
                                    onChange={handleFormChange}
                                    required
                                    type="number"
                                    inputProps={{ inputMode: 'numeric', min: 0 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="PrimaryEnergyConsumptionBefore"
                                    label="Primary Energy Consumption Before (kW)"
                                    fullWidth
                                    value={formData.PrimaryEnergyConsumptionBefore}
                                    onChange={handleFormChange}
                                    required
                                    type="number"
                                    inputProps={{ inputMode: 'numeric', min: 0 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="InverterSetPower"
                                    label="Current Inverter Set Power (kW)"
                                    fullWidth
                                    value={formData.InverterSetPower}
                                    onChange={handleFormChange}
                                    required
                                    type="number"
                                    inputProps={{ inputMode: 'numeric', min: 0 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="InverterPowerInProject"
                                    label="Inverter Power in Project (kW)"
                                    fullWidth
                                    value={formData.InverterPowerInProject}
                                    onChange={handleFormChange}
                                    required
                                    type="number"
                                    inputProps={{ inputMode: 'numeric', min: 0 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth required>
                                    <InputLabel>Region</InputLabel>
                                    <Select
                                        name="Region"
                                        label="Region"
                                        value={formData.Region}
                                        onChange={handleFormChange}
                                        required
                                    >
                                        {/* Customize the region options as needed */}
                                        <MenuItem value="Kurzeme">Kurzeme</MenuItem>
                                        <MenuItem value="Latgale">Latgale</MenuItem>
                                        <MenuItem value="Riga">Riga</MenuItem>
                                        <MenuItem value="Vidzene">Vidzene</MenuItem>
                                        <MenuItem value="Regale">Regale</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        {/* Customize additional content below the form as needed */}
                        <Grid container justifyContent="flex-end" mt={3} mb={1}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleReset}
                                sx={{ borderColor: '#9966ff', color: '#9966ff', mx: 2 }}
                            >
                                RESET
                            </Button>
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
        </>
    );
}

export default PhotovoltaicInstallation;
