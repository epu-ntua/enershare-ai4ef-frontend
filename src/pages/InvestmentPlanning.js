import React, {useEffect, useState} from 'react';
import {useTheme} from '@mui/material/styles';
import {Link} from "react-router-dom";
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
    MenuItem,
    Card,
    Box, Modal,
    IconButton,
    Alert, Stack
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DownloadIcon from '@mui/icons-material/Download';

import Breadcrumb from "../components/layout/Breadcrumb";
import Loading from "../components/layout/Loading";
import BuildingEnergyClass from "../components/investmentPlanning/BuildingEnergyClass";

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
        Investment Planning
    </Typography>,
];

function InvestmentPlanning() {
    const {keycloak, initialized} = useKeycloak();
    const [allowed, setAllowed] = useState(false)
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (initialized) {
            if (keycloak.authenticated !== true) {
                keycloak.login();
            } else {
                setAllowed(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialized]);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const theme = useTheme();

    const initialFormState = {
        building_total_area: '',
        underground_floor: '',
        reference_area: '',
        energy_consumption_before: '',
        above_ground_floors: '',
        initial_energy_class: '',
        energy_class_after: '',
    };

    const initialFormErrors = {
        building_total_area: false,
        underground_floor: false,
        reference_area: false,
        energy_consumption_before: false,
        above_ground_floors: false,
        initial_energy_class: false,
        energy_class_after: false,
    };

    const [formData, setFormData] = useState(initialFormState);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [accordionOpen, setAccordionOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState(false)

    const handleFormChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
        setFormErrors({...formErrors, [name]: false});
    };

    const handleReset = () => {
        setError(false)
        setRecommendations([])
        setFormData(initialFormState);
        setFormErrors(initialFormErrors);
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
            setError(false)
            setRecommendations([])
            setLoading(true);

            // Your save logic here
            axios.post('/service_1/inference', formData)
                .then(response => {
                    console.log(response.data)
                    setLoading(false)
                    setRecommendations(response.data)
                })
                .catch(error => {
                    setLoading(false)
                    setError(true)
                    console.log(error)
                })
        }
    };

    const calculateColumnCount = recommendationCount => {
        if (recommendationCount <= 4) {
            return 4; // For 1, 2, or 3 recommendations, use md={4}
        } else {
            return recommendationCount % 3 === 0 ? 4 : 3; // For multiples of 3, use md={4}, otherwise md={3}
        }
    };

    return (
        <>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div className="modalContainer">
                    <div className="modalContent">
                        <Typography id="modal-title" variant="h6"
                                    sx={{marginRight: 'auto', alignItems: 'center', color: theme.palette.primary.main}}>
                            Building Consumption / Energy Class information
                        </Typography>
                        <Typography id="modal-description" variant="body1" sx={{mb: 2}}>
                            Use this table to identify your building's energy class based on the consumption.
                        </Typography>
                        <BuildingEnergyClass/>
                    </div>
                </div>
            </Modal>


            <Breadcrumb breadcrumbs={breadcrumbs} welcome_msg={''}/>
            {allowed && <Container maxWidth="xl" sx={{my: 3}}>
                <Accordion
                    expanded={accordionOpen}
                    onChange={() => setAccordionOpen(!accordionOpen)}
                >
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
                                    <ExpandMoreIcon
                                        sx={{color: '#9966ff'}}/> {/* Display the chevron-up icon when open */}
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
                                    name="building_total_area"
                                    label="Building Total Area (m²)"
                                    fullWidth
                                    value={formData.building_total_area}
                                    onChange={handleFormChange}
                                    required
                                    error={formErrors.building_total_area}
                                    helperText={
                                        formErrors.building_total_area &&
                                        'This field is required'
                                    }
                                    type="number"
                                    inputProps={{
                                        inputMode: 'numeric',
                                        min: 0,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth required>
                                    <InputLabel error={formErrors.underground_floor}>Underground Floor</InputLabel>
                                    <Select
                                        name="underground_floor"
                                        label="Underground Floor"
                                        value={formData.underground_floor}
                                        onChange={handleFormChange}
                                        required
                                        error={formErrors.underground_floor}

                                    >
                                        <MenuItem value={1}>Yes</MenuItem>
                                        <MenuItem value={0}>No</MenuItem>
                                    </Select>
                                    {formErrors.underground_floor && (
                                        <Typography variant="caption" color="error" sx={{ml: 2, mt: '2px'}}>
                                            This field is required
                                        </Typography>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="reference_area"
                                    label="Reference Area (m²)"
                                    fullWidth
                                    value={formData.reference_area}
                                    onChange={handleFormChange}
                                    required
                                    error={formErrors.reference_area}
                                    helperText={
                                        formErrors.reference_area &&
                                        'This field is required'
                                    }
                                    type="number"
                                    inputProps={{
                                        inputMode: 'numeric',
                                        min: 0,
                                    }}
                                />
                            </Grid>

                            {/* Second Row */}
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="energy_consumption_before"
                                    label="Monthly Energy Consumption before (kWh/m²)"
                                    fullWidth
                                    value={formData.energy_consumption_before}
                                    onChange={handleFormChange}
                                    required
                                    error={formErrors.energy_consumption_before}
                                    helperText={
                                        formErrors.energy_consumption_before &&
                                        'This field is required'
                                    }
                                    type="number"
                                    inputProps={{
                                        inputMode: 'numeric',
                                        min: 0,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth required>
                                    <InputLabel error={formErrors.above_ground_floors}>Above-ground Floors</InputLabel>
                                    <Select
                                        name="above_ground_floors"
                                        label="AboveGroundFloors"
                                        value={formData.above_ground_floors}
                                        onChange={handleFormChange}
                                        required
                                        error={formErrors.above_ground_floors}
                                    >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                    </Select>
                                    {formErrors.above_ground_floors && (
                                        <Typography variant="caption" color="error" sx={{ml: 2, mt: '2px'}}>
                                            This field is required
                                        </Typography>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <FormControl fullWidth required>
                                    <InputLabel error={formErrors.initial_energy_class}>Initial Energy
                                        Class</InputLabel>
                                    <Select
                                        name="initial_energy_class"
                                        label="InitialEnergyClass"
                                        value={formData.initial_energy_class}
                                        onChange={handleFormChange}
                                        required
                                        error={formErrors.initial_energy_class}
                                    >
                                        {/*<MenuItem value="A+">A+</MenuItem>*/}
                                        <MenuItem value="A">A</MenuItem>
                                        <MenuItem value="B">B</MenuItem>
                                        <MenuItem value="C">C</MenuItem>
                                        <MenuItem value="D">D</MenuItem>
                                        <MenuItem value="E">E</MenuItem>
                                        <MenuItem value="F">F</MenuItem>
                                    </Select>
                                    {formErrors.initial_energy_class && (
                                        <Typography variant="caption" color="error" sx={{ml: 2, mt: '2px'}}>
                                            This field is required
                                        </Typography>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <FormControl fullWidth required>
                                    <InputLabel error={formErrors.energy_class_after}>Energy Class After</InputLabel>
                                    <Select
                                        name="energy_class_after"
                                        label="EnergyClassAfter"
                                        value={formData.energy_class_after}
                                        onChange={handleFormChange}
                                        required
                                        error={formErrors.energy_class_after}
                                    >
                                        {/*<MenuItem value="A+">A+</MenuItem>*/}
                                        <MenuItem value="A">A</MenuItem>
                                        <MenuItem value="B">B</MenuItem>
                                        <MenuItem value="C">C</MenuItem>
                                        <MenuItem value="D">D</MenuItem>
                                        <MenuItem value="E">E</MenuItem>
                                        <MenuItem value="F">F</MenuItem>
                                    </Select>
                                    {formErrors.energy_class_after && (
                                        <Typography variant="caption" color="error" sx={{ml: 2, mt: '2px'}}>
                                            This field is required
                                        </Typography>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="flex-end" alignItems="center" mt={3} mb={1}>
                            <Typography variant={'h6'}
                                        sx={{
                                            marginRight: 'auto',
                                            alignItems: 'center',
                                            color: theme.palette.primary.main
                                        }}>
                                Building Consumption / Energy Class information
                                <IconButton size="small" color="primary" onClick={handleOpenModal}>
                                    <InfoOutlinedIcon/>
                                </IconButton>
                            </Typography>
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

                {!loading && recommendations.length > 0 && (
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
                            Recommendations
                        </Typography>
                        <Grid container spacing={2} my={1}>
                            {recommendations
                                .filter(recommendation => recommendation.value === 'True')
                                .map((recommendation, index) => (
                                    <Grid
                                        item
                                        key={recommendation.id}
                                        xs={12}
                                        md={calculateColumnCount(recommendations.filter(rec => rec.value === 'True').length)}
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
                                                    {recommendation.title}
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
                                                        src={`/images/service1/id${recommendation.id}.jpg`}
                                                        alt={recommendation.title}
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
                                                        {recommendation.description}
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
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    {recommendation.value === "True" ?
                                                        <IconButton sx={{color: 'green', border: '3px solid green', borderRadius: '50%'}}>
                                                            <DoneIcon sx={{fontSize: 40}}/>
                                                        </IconButton> :
                                                        <IconButton sx={{color: 'red'}}>
                                                            <ClearIcon sx={{fontSize: 56}}/>
                                                        </IconButton>
                                                    }

                                                </div>
                                            </Box>
                                        </Card>
                                    </Grid>
                                ))
                            }
                            <Grid item xs={12}>
                                <Card
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        p: 2,
                                        boxShadow: 'none',
                                        border: '1px solid #9966ff',
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <InfoOutlinedIcon sx={{ color: 'primary.main', mr: 2 }} />
                                        <Typography
                                            variant={'body2'}
                                            color={'primary'}
                                        >
                                            Download this file to calculate the energy savings and greenhouse gas emissions reduction that can come with a renovation of your heating system.
                                        </Typography>
                                    </Box>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<DownloadIcon />}
                                        href="/Replacement of Thermal Energy Equipment.xlsx" // Path to the file in the public folder
                                        download
                                        sx={{
                                            backgroundColor: '#9966ff',
                                            borderColor: '#9966ff',
                                            color: 'white',
                                        }}
                                    >
                                        Download
                                    </Button>
                                </Card>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Container>}
        </>
    );
}

export default InvestmentPlanning;