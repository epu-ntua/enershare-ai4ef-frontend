import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

import Breadcrumb from '../components/layout/Breadcrumb';
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const breadcrumbs = [
    <Link className={'breadcrumbLink'} key="1" to="/">
        Homepage
    </Link>,
    <Typography
        underline="hover"
        key="2"
        color="primary"
        fontSize={'20px'}
        fontWeight={600}
    >
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
    const [accordionOpen, setAccordionOpen] = useState(true);

    const [formErrors, setFormErrors] = useState({
        ElectricityConsumption: false,
        PrimaryEnergyConsumptionBefore: false,
        InverterSetPower: false,
        InverterPowerInProject: false,
        Region: false,
    });

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: false });
    };

    const handleReset = () => {
        setFormData(initialFormState);
        setFormErrors({
            ElectricityConsumption: false,
            PrimaryEnergyConsumptionBefore: false,
            InverterSetPower: false,
            InverterPowerInProject: false,
            Region: false,
        });
    };

    const handleSave = () => {
        const isFormValid = Object.entries(formData).reduce(
            (isValid, [name, value]) => {
                if (typeof value === 'string') {
                    const isEmpty = value.trim() === '';
                    setFormErrors((prevErrors) => ({
                        ...prevErrors,
                        [name]: isEmpty,
                    }));
                    return isValid && !isEmpty;
                }
                return isValid;
            },
            true
        );

        if (isFormValid) {
            // Your save logic here
            console.log('Form saved:', formData);
        }
    };

    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={''} />
            <Container maxWidth="xl" sx={{ my: 3 }}>
                <Accordion
                    expanded={accordionOpen}
                    onChange={() => setAccordionOpen(!accordionOpen)}
                >
                    <AccordionSummary>
                        <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Grid item xs={12} sm={accordionOpen ? 6 : 2} style={{ textAlign: 'left' }}>
                                <Typography variant="h6" component="div" style={{ flex: '2', wordWrap: 'break-word', color: '#9966ff', fontWeight: 'bold' }}>
                                    Photovoltaic Installation Parameters
                                </Typography>
                            </Grid>
                            {accordionOpen ? (
                                <Button color="primary" onClick={() => setAccordionOpen(!accordionOpen)}>
                                    <ExpandMoreIcon sx={{ color: '#9966ff' }} />
                                </Button>
                            ) : (
                                <>
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
                                            variant="outlined"
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
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="ElectricityConsumption"
                                    label="Electricity Consumption of the Grid (mWh)"
                                    fullWidth
                                    value={formData.ElectricityConsumption}
                                    onChange={handleFormChange}
                                    required
                                    error={formErrors.ElectricityConsumption}
                                    helperText={
                                        formErrors.ElectricityConsumption &&
                                        'This field is required'
                                    }
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
                                    error={formErrors.PrimaryEnergyConsumptionBefore}
                                    helperText={
                                        formErrors.PrimaryEnergyConsumptionBefore &&
                                        'This field is required'
                                    }
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
                                    error={formErrors.InverterSetPower}
                                    helperText={
                                        formErrors.InverterSetPower &&
                                        'This field is required'
                                    }
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
                                    error={formErrors.InverterPowerInProject}
                                    helperText={
                                        formErrors.InverterPowerInProject &&
                                        'This field is required'
                                    }
                                    type="number"
                                    inputProps={{ inputMode: 'numeric', min: 0 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth required>
                                    <InputLabel error={formErrors.Region}>Region</InputLabel>
                                    <Select
                                        name="Region"
                                        label="Region"
                                        value={formData.Region}
                                        onChange={handleFormChange}
                                        required
                                        error={formErrors.Region}
                                    >
                                        <MenuItem value="Kurzeme">Kurzeme</MenuItem>
                                        <MenuItem value="Latgale">Latgale</MenuItem>
                                        <MenuItem value="Riga">Riga</MenuItem>
                                        <MenuItem value="Vidzene">Vidzene</MenuItem>
                                        <MenuItem value="Regale">Regale</MenuItem>
                                    </Select>
                                    {formErrors.Region && (
                                        <Typography variant="caption" color="error" sx={{ml: 2, mt: '2px'}}>
                                            This field is required
                                        </Typography>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="flex-end" mt={3} mb={1}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleReset}
                                sx={{ borderColor: '#9966ff', color: '#9966ff', mx: 2 }}
                            >
                                <RestartAltIcon/>
                                RESET
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSave}
                                sx={{
                                    backgroundColor: '#9966ff',
                                    borderColor: '#9966ff',
                                    color: 'white',
                                }}
                            >
                                <InfoOutlinedIcon sx={{mr: '4px'}}/>
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
