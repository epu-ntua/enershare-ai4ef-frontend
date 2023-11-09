import React, {useState} from 'react';
import {Link} from 'react-router-dom';
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
    MenuItem, Card, Box, IconButton,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import Breadcrumb from '../components/layout/Breadcrumb';
import Loading from "../components/layout/Loading";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";

const forecastsTemp = [
    {
        "title": "Electricity produced by solar panels",
        "description": "The amount of electricity produced by the solar panels, which are installed in the project",
        "type": "float",
        "unit": "[MWh per year]",
        "minimum": "0",
        "maximum": "-",
        "id": "1"
    },
    {
        "title": "Primary energy consumption after",
        "description": "Primary energy consumption after installing the solar panel system",
        "type": "float",
        "unit": "[MWh per year]",
        "minimum": "0",
        "maximum": "-",
        "id": "2"
    },
    {
        "title": "Reduction of primary energy consumption",
        "description": "Reduction of primary energy consumption: Difference between primary energy consumption before and after",
        "type": "float",
        "unit": "[MWh per year]",
        "minimum": "0",
        "maximum": "-",
        "id": "3"
    },
    {
        "title": "CO2 emissions reduction",
        "description": "The amount of CO2 emissions reduction in the project",
        "type": "float",
        "unit": "[t CO2 per year]",
        "minimum": "0",
        "maximum": "-",
        "id": "4"
    }
]

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

    const [formErrors, setFormErrors] = useState({
        ElectricityConsumption: false,
        PrimaryEnergyConsumptionBefore: false,
        InverterSetPower: false,
        InverterPowerInProject: false,
        Region: false,
    });

    const [formData, setFormData] = useState(initialFormState);
    const [accordionOpen, setAccordionOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const [forecasts, setForecasts] = useState([]);

    const handleFormChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
        setFormErrors({...formErrors, [name]: false});
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
            setLoading(true);

            // Your save logic here
            console.log('Form saved:', formData);
            setTimeout(() => {
                setForecasts([...forecastsTemp]);
                setLoading(false);
            }, 2000);
        }
    };

    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={''}/>
            <Container maxWidth="xl" sx={{my: 3}}>
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
                            <Grid item xs={12} sm={accordionOpen ? 6 : 2} style={{textAlign: 'left'}}>
                                <Typography variant="h6" component="div" style={{
                                    flex: '2',
                                    wordWrap: 'break-word',
                                    color: '#9966ff',
                                    fontWeight: 'bold'
                                }}>
                                    Photovoltaic Installation Parameters
                                </Typography>
                            </Grid>
                            {accordionOpen ? (
                                <Button color="primary" onClick={() => setAccordionOpen(!accordionOpen)}>
                                    <ExpandMoreIcon sx={{color: '#9966ff'}}/>
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
                                            variant="outlined"
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
                                    inputProps={{inputMode: 'numeric', min: 0}}
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
                                    inputProps={{inputMode: 'numeric', min: 0}}
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
                                    inputProps={{inputMode: 'numeric', min: 0}}
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
                                    inputProps={{inputMode: 'numeric', min: 0}}
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
                                sx={{borderColor: '#9966ff', color: '#9966ff', mx: 2}}
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

                {loading && <Loading/>}

                {!loading && forecasts.length > 0 && (
                    <>
                        <Typography
                            variant={'h4'}
                            sx={{
                                color: theme.palette.primary.main,
                                mt: 5,
                                fontWeight: 'bold',
                                borderBottom: '1px solid #9966ff',
                            }}
                        >
                            Forecasts
                        </Typography>
                        <Grid container spacing={2} my={1}>
                            {forecasts.map((forecast) => (
                                <Grid
                                    item
                                    key={forecast.id}
                                    xs={12}
                                    md={3}
                                >
                                    <Card
                                        sx={{
                                            backgroundColor: 'white',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <div
                                            style={{
                                                flex: 1,
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                align={'center'}
                                                component="div"
                                                fontWeight={'bold'}
                                                sx={{
                                                    marginTop: 0,
                                                    alignSelf: 'flex-start',
                                                    padding: '8px',
                                                    mx: 'auto',
                                                    color: theme.palette.primary.main,
                                                }}
                                            >
                                                {forecast.title}
                                            </Typography>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <img
                                                    src={`/images/service2/id${forecast.id}.jpg`}
                                                    alt={forecast.title}
                                                    style={{
                                                        marginTop: '20px',
                                                        maxHeight: '140px',
                                                        width: 'auto',
                                                    }}
                                                />
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{p: 2}}
                                                >
                                                    {forecast.description}
                                                </Typography>
                                            </div>
                                        </div>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                flexDirection: 'column',
                                                marginBottom: '8px',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Typography variant={'h3'} fontWeight={'bold'} color={theme.palette.primary.main}>0.21</Typography>
                                                <Typography variant={'body2'}>{forecast.unit}</Typography>
                                            </div>
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}
            </Container>
        </>
    );
}

export default PhotovoltaicInstallation;
