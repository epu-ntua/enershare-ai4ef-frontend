import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useTheme} from '@mui/material/styles';
import axios from 'axios'
import {transformToHumanReadable} from "../utils";
import {useKeycloak} from "@react-keycloak/web";

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
    MenuItem, Card, Box, Stack, Alert,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import Breadcrumb from '../components/layout/Breadcrumb';
import Loading from "../components/layout/Loading";

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
    const {keycloak, initialized} = useKeycloak();
    const [allowed,setAllowed] = useState(false)

    useEffect(() => {
        console.log(initialized, keycloak)

        if (initialized) {
            if (keycloak.authenticated !== true) {
                keycloak.login()
            } else {
                setAllowed(true)
            }
        }
    }, [initialized])

    const initialFormState = {
        electricity_consumption_of_the_grid: '',
        primary_energy_consumption_before: '',
        current_inverter_set_power: '',
        inverter_power_in_project: '',
        region: '',
    };

    const [formErrors, setFormErrors] = useState({
        electricity_consumption_of_the_grid: false,
        primary_energy_consumption_before: false,
        current_inverter_set_power: false,
        inverter_power_in_project: false,
        region: false,
    });

    const [formData, setFormData] = useState(initialFormState);
    const [error, setError] = useState(false)
    const [accordionOpen, setAccordionOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const [forecasts, setForecasts] = useState([]);

    const handleFormChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
        setFormErrors({...formErrors, [name]: false});
    };

    const handleReset = () => {
        setForecasts([])
        setError(false)
        setFormData(initialFormState);
        setFormErrors({
            electricity_consumption_of_the_grid: false,
            primary_energy_consumption_before: false,
            current_inverter_set_power: false,
            inverter_power_in_project: false,
            region: false,
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
            setError(false)
            setForecasts([])

            // Your save logic here
            axios.post('/service_2/inference', formData)
                .then(response => {
                    setLoading(false)
                    setForecasts(response.data)
                })
                .catch(error => {
                    setLoading(false)
                    setError(true)
                    console.log(error)
                })
        }
    };

    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={''}/>
            {allowed && <Container maxWidth="xl" sx={{my: 3}}>
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
                                                <strong>{transformToHumanReadable(key)}</strong>
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
                                    name="electricity_consumption_of_the_grid"
                                    label="Electricity Consumption of the Grid (mWh)"
                                    fullWidth
                                    value={formData.electricity_consumption_of_the_grid}
                                    onChange={handleFormChange}
                                    required
                                    error={formErrors.electricity_consumption_of_the_grid}
                                    helperText={
                                        formErrors.electricity_consumption_of_the_grid &&
                                        'This field is required'
                                    }
                                    type="number"
                                    inputProps={{inputMode: 'numeric', min: 0}}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="primary_energy_consumption_before"
                                    label="Primary Energy Consumption Before (kW)"
                                    fullWidth
                                    value={formData.primary_energy_consumption_before}
                                    onChange={handleFormChange}
                                    required
                                    error={formErrors.primary_energy_consumption_before}
                                    helperText={
                                        formErrors.primary_energy_consumption_before &&
                                        'This field is required'
                                    }
                                    type="number"
                                    inputProps={{inputMode: 'numeric', min: 0}}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="current_inverter_set_power"
                                    label="Current Inverter Set Power (kW)"
                                    fullWidth
                                    value={formData.current_inverter_set_power}
                                    onChange={handleFormChange}
                                    required
                                    error={formErrors.current_inverter_set_power}
                                    helperText={
                                        formErrors.current_inverter_set_power &&
                                        'This field is required'
                                    }
                                    type="number"
                                    inputProps={{inputMode: 'numeric', min: 0}}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="inverter_power_in_project"
                                    label="Inverter Power in Project (kW)"
                                    fullWidth
                                    value={formData.inverter_power_in_project}
                                    onChange={handleFormChange}
                                    required
                                    error={formErrors.inverter_power_in_project}
                                    helperText={
                                        formErrors.inverter_power_in_project &&
                                        'This field is required'
                                    }
                                    type="number"
                                    inputProps={{inputMode: 'numeric', min: 0}}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth required>
                                    <InputLabel error={formErrors.region}>Region</InputLabel>
                                    <Select
                                        name="region"
                                        label="region"
                                        value={formData.region}
                                        onChange={handleFormChange}
                                        required
                                        error={formErrors.region}
                                    >
                                        <MenuItem value="Kurzeme">Kurzeme</MenuItem>
                                        <MenuItem value="Rīga">Riga</MenuItem>
                                        <MenuItem value="Zemgale">Zemgale</MenuItem>
                                        <MenuItem value="Latgale">Latgale</MenuItem>
                                        <MenuItem value="Vidzeme">Vidzeme</MenuItem>
                                    </Select>
                                    {formErrors.region && (
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

                {error &&
                    <Stack sx={{width: '100%'}} spacing={2}>
                        <Alert severity="error">Something went wrong! Please check your input because it may have some
                            inconsistencies! Otherwise, please try again in a bit!</Alert>
                    </Stack>
                }

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
                                                <Typography variant={'h3'} fontWeight={'bold'}
                                                            color={theme.palette.primary.main}>{forecast.value}</Typography>
                                                <Typography variant={'body2'}>{forecast.unit}</Typography>
                                            </div>
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}
            </Container>}
        </>
    );
}

export default PhotovoltaicInstallation;
