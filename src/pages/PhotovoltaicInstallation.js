import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useTheme} from '@mui/material/styles';
import axios from 'axios'
import {transformToHumanReadable} from "../utils";
import {useKeycloak} from "@react-keycloak/web";

import {
    Container, Accordion, AccordionSummary, AccordionDetails,
    Button, Typography, Grid, TextField, FormControl,
    InputLabel, Select, Divider, MenuItem, Card, Box, Stack, Alert, IconButton,
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
    const [allowed, setAllowed] = useState(false)

    useEffect(() => {
        if (initialized) {
            if (keycloak.authenticated !== true) {
                keycloak.login()
            } else {
                setAllowed(true)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialized])

    const initialFormState = {
        average_monthly_electricity_consumption_before: '',
        average_electricity_price: '',
        renewable_installation_cost: '',
        renewable_energy_generated: '',

        current_inverter_set_power: '',
        planned_inverter_set_power: '',
        region: '',
    };

    const [formErrors, setFormErrors] = useState({
        average_monthly_electricity_consumption_before: false,
        average_electricity_price: false,
        renewable_installation_cost: false,
        renewable_energy_generated: false,

        current_inverter_set_power: false,
        planned_inverter_set_power: false,
        region: false,
    });

    const [formData, setFormData] = useState(initialFormState);
    const [error, setError] = useState(false)
    const [accordionOpen, setAccordionOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const [forecasts, setForecasts] = useState([]);

    const handleFormChange = (event) => {
        const {name, value, type} = event.target;
        setFormData({...formData, [name]: type === 'number' ? Number(value) : value});
        setFormErrors({...formErrors, [name]: false});
    };

    const handleReset = () => {
        setForecasts([])
        setError(false)
        setFormData(initialFormState);
        setFormErrors({
            average_monthly_electricity_consumption_before: false,
            average_electricity_price: false,
            renewable_installation_cost: false,
            renewable_energy_generated: false,

            current_inverter_set_power: false,
            planned_inverter_set_power: false,
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

            console.log(formData)

            // axios.post('/service_2/inference', formData)
            //     .then(response => {
            //         setLoading(false)
            //         setForecasts(response.data)
            //     })
            //     .catch(error => {
            //         setLoading(false)
            //         setError(true)
            //         console.log(error)
            //     })
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
                                    name="average_monthly_electricity_consumption_before"
                                    label="Average monthly consumption before (kWh/month)"
                                    fullWidth
                                    value={formData.average_monthly_electricity_consumption_before}
                                    onChange={handleFormChange}
                                    required
                                    error={formErrors.average_monthly_electricity_consumption_before}
                                    helperText={
                                        formErrors.average_monthly_electricity_consumption_before &&
                                        'This field is required'
                                    }
                                    type="number"
                                    inputProps={{inputMode: 'numeric', min: 0}}
                                />
                            </Grid>


                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="average_electricity_price"
                                    label="Average electricity price (€/kwh)"
                                    fullWidth
                                    value={formData.average_electricity_price}
                                    onChange={handleFormChange}
                                    required
                                    error={formErrors.average_electricity_price}
                                    helperText={
                                        formErrors.average_electricity_price &&
                                        'This field is required'
                                    }
                                    type="number"
                                    inputProps={{inputMode: 'numeric', min: 0}}
                                />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="renewable_installation_cost"
                                    label="Installation costs of the renewable production equipment (€)"
                                    fullWidth
                                    value={formData.renewable_installation_cost}
                                    onChange={handleFormChange}
                                    required
                                    error={formErrors.renewable_installation_cost}
                                    helperText={
                                        formErrors.renewable_installation_cost &&
                                        'This field is required'
                                    }
                                    type="number"
                                    inputProps={{inputMode: 'numeric', min: 0}}
                                />
                            </Grid>

                            <Divider style={{width: '90%'}} sx={{mt: 3, mb: 2, mx: 'auto'}}/>

                            <Grid item xs={12}>
                                <TextField
                                    name="renewable_energy_generated"
                                    label="Average amount of energy generated by the renewable equipment (MWh/year)"
                                    fullWidth
                                    value={formData.renewable_energy_generated}
                                    onChange={handleFormChange}
                                    // required
                                    type="number"
                                    error={formErrors.renewable_energy_generated}
                                    helperText={
                                        formErrors.renewable_energy_generated &&
                                        'This field is required'
                                    }
                                    inputProps={{inputMode: 'numeric', min: 0}}
                                />

                                <Typography variant={'body2'}
                                            sx={{
                                                marginRight: 'auto',
                                                alignItems: 'center',
                                                color: theme.palette.primary.main,
                                            }}>
                                    <IconButton size="small" color="primary">
                                        <InfoOutlinedIcon/>
                                    </IconButton>
                                    Leave this blank if you don’t know the value and the AI algorithm will make an
                                    estimation based on your input.
                                </Typography>
                            </Grid>


                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="current_inverter_set_power"
                                    label="Current Inverter Set Power (kW)"
                                    fullWidth
                                    value={formData.current_inverter_set_power}
                                    onChange={handleFormChange}
                                    required={formData.renewable_energy_generated === '' || formData.renewable_energy_generated === 0}
                                    disabled={formData.renewable_energy_generated !== '' || formData.renewable_energy_generated !== 0}
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
                                    name="planned_inverter_set_power"
                                    label="Planned Inverter Set Power (kW)"
                                    fullWidth
                                    value={formData.planned_inverter_set_power}
                                    onChange={handleFormChange}
                                    required={formData.renewable_energy_generated === '' || formData.renewable_energy_generated === 0}
                                    disabled={formData.renewable_energy_generated !== '' || formData.renewable_energy_generated !== 0}
                                    error={formErrors.planned_inverter_set_power}
                                    helperText={
                                        formErrors.planned_inverter_set_power &&
                                        'This field is required'
                                    }
                                    type="number"
                                    inputProps={{inputMode: 'numeric', min: 0}}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth
                                             required={formData.renewable_energy_generated === '' || formData.renewable_energy_generated === 0}
                                             disabled={formData.renewable_energy_generated !== '' || formData.renewable_energy_generated !== 0}>
                                    <InputLabel error={formErrors.region}>Region</InputLabel>
                                    <Select
                                        name="region"
                                        label="region"
                                        value={formData.region}
                                        onChange={handleFormChange}
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
