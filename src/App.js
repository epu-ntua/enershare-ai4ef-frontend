import React from "react";
import './App.css';
import axios from 'axios'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Layout from "./components/layout/Layout";
import Homepage from "./pages/Homepage";
import InvestmentPlanning from "./pages/InvestmentPlanning";
import PhotovoltaicInstallation from "./pages/PhotovoltaicInstallation";
import SignUp from "./pages/SignUp";

import UserProfile from "./pages/UserProfile";

// Set axios default base url
axios.defaults.baseURL = 'http://enershare1.epu.ntua.gr:8888/';

// Set primary color here
let green_primary = '#18e5b0';

// Set secondary color here
let purple_primary = '#9966ff';

// Dashboard theme setup here
const theme = createTheme({
    palette: {
        primary: {
            main: purple_primary,
        },
        secondary: {
            main: green_primary,
        },
        barBackground: {
            main: `linear-gradient(to right, ${green_primary}, ${purple_primary})`,
        },
    },
    typography: {
        fontFamily: ['Poppins', 'Roboto'].join(','),
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/"
                               element={<Homepage/>}/>
                        <Route path="/user/profile"
                               element={<UserProfile/>}/>
                        <Route path="/signup"
                               element={<SignUp/>}/>
                        <Route path="/investment-planning"
                               element={<InvestmentPlanning/>}/>
                        <Route path="/photovoltaic-installation"
                               element={<PhotovoltaicInstallation/>}/>
                    </Routes>
                </Layout>
            </Router>
        </ThemeProvider>
    );
}

export default App;
