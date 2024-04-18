import React from 'react';
import {useTheme} from '@mui/material/styles';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Typography
} from '@mui/material';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

function BuildingEnergyClassTable() {
    const theme = useTheme();

    return (
        <>
            <Typography variant={'body2'}
                        sx={{
                            mt: '5',
                            marginRight: 'auto',
                            alignItems: 'center',
                            color: theme.palette.primary.main
                        }}>
                <IconButton size="small" color="primary">
                    <InfoOutlinedIcon/>
                </IconButton>
                All the numbers represent heating consumption measured in kWh/m<sup>2</sup>
            </Typography>

            <TableContainer sx={{border: '1px solid #ccc'}}>
                <Table>
                    <TableHead>
                        <TableRow sx={{backgroundColor: theme.palette.primary.main}}>
                            <TableCell sx={{color: 'white', textAlign: 'center'}}>Energy Efficiency class of
                                building</TableCell>
                            <TableCell sx={{color: 'white', textAlign: 'center'}}>Heating area (50m<sup>2</sup> to
                                120m<sup>2</sup>)</TableCell>
                            <TableCell sx={{color: 'white', textAlign: 'center'}}>Heating area (120m<sup>2</sup> to 250m<sup>2</sup>)</TableCell>
                            <TableCell sx={{color: 'white', textAlign: 'center'}}>Heating area (over
                                250m<sup>2</sup>)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{textAlign: 'center'}}>A</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>&le; 60</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>&le; 50</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>&le; 40</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{textAlign: 'center'}}>B</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>&le; 75</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>&le; 65</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>&le; 60</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{textAlign: 'center'}}>C</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>&le; 95</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>&le; 90</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>&le; 80</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{textAlign: 'center'}}>D</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>&le; 150</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>&le; 130</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>&le; 100</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{textAlign: 'center'}}>E</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>&le; 180</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>&le; 150</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>&le; 125</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{textAlign: 'center'}}>F</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>&gt; 180</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>&gt; 150</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>&gt; 125</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default BuildingEnergyClassTable;
