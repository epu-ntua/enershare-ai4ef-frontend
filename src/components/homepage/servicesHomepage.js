import SolarPowerIcon from '@mui/icons-material/SolarPower';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';

export const servicesHomepage = [
    {
        'id': 'investment_planning',
        'title': 'Investment Planning',
        'description': 'Select your desired energy class and receive recommendations about the appropriate construction works.',
        'icon': <EnergySavingsLeafIcon style={{color: 'white', fontSize: '80px'}}/>,
        'image': '/images/investment_planning.jpg',
    },
    {
        'id': 'photovoltaic_installation',
        'title': 'Photovoltaic Installation',
        'description': 'Select your desired install PV power and receive future insights on energy, cost, and CO2 emissions reduction.',
        'icon': <SolarPowerIcon style={{color: 'white', fontSize: '80px'}}/>,
        'image': '/images/photovoltaic_installation.jpg',
    },
]