import React, {useState, useEffect} from 'react';
import {Link, useLocation} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";

import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import FooterContent from "./FooterContent";
import MenuButton from "./MenuButton";

import {appbarMenuButtonItems} from "../../appbarMenuButtonItems";

const drawerWidth = 240;

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    background: theme.palette.barBackground.main,
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        flexGrow: 1,
        // padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const Footer = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    background: theme.palette.barBackground.main,
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function Layout({children}) {
    const {keycloak, initialized} = useKeycloak();

    const location = useLocation()
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const menuItems = [
        {
            text: 'Homepage',
            icon:
                <HomeOutlinedIcon
                    sx={{color: theme.palette.primary.main}}/>,
            path: "/",
        },
    ]
    const [menu, setMenu] = useState(menuItems)


    useEffect(() => {
        if (initialized) {
            if (keycloak.authenticated) {
                menuItems.push(
                    {
                        text: 'Investment Planning',
                        icon:
                            <EnergySavingsLeafIcon
                                sx={{color: theme.palette.primary.main}}/>,
                        path: "/investment-planning",
                    },
                    {
                        text: 'Photovoltaic Installation',
                        icon:
                            <SolarPowerIcon
                                sx={{color: theme.palette.primary.main}}/>,
                        path: "/photovoltaic-installation",
                    },
                )
            } else {
                menuItems.push(
                    {
                        text: 'Sign Up',
                        icon:
                            <PersonAddIcon
                                sx={{color: theme.palette.primary.main}}/>,
                        path: "/signup",
                    },
                    {
                        text: 'Sign In',
                        icon:
                            <AccountCircleIcon
                                sx={{color: theme.palette.primary.main}}/>,
                        // path: "/signup",
                    },
                )
            }

            setMenu(menuItems)
        }
    }, [initialized, keycloak])

    const handleSignOut = () => {
        keycloak.logout()
        setMenu(menuItems)
    }

    return (
        <>
            <Box sx={{display: 'flex', minHeight: `calc(100vh - 60px)`}}>
                <CssBaseline/>
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && {display: 'none'}), color: 'white'
                            }}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" color={'white'}>
                            Artificial Intelligence for Energy Efficiency
                        </Typography>
                        {keycloak.authenticated === true && <>
                            <Typography
                                sx={{ml: 'auto'}}
                                style={{
                                    color: 'white'
                                }}>Welcome, {keycloak?.tokenParsed?.preferred_username}</Typography>
                            <MenuButton subLinks={appbarMenuButtonItems} signout={handleSignOut}/>
                        </>}
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        // background: '#fafafa',
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                        </IconButton>
                    </DrawerHeader>
                    <Divider/>
                    <List>
                        {menu.map(item => (
                            <Link key={item.text}
                                  style={{
                                      textDecoration: 'none',
                                      color: '#000'
                                  }}
                                  to={item.path}
                            >
                                <ListItem key={item.text} disablePadding
                                          onClick={item.text === 'Sign In' ? () => keycloak.login() : void (0)}
                                          sx={{
                                              background: location.pathname === item.path ? 'linear-gradient(to left, rgba(153,102,255,1), rgba(24,229,176,1) 100%)' : '',
                                              border: location.pathname === item.path ? '1px solid rgba(153,102,255,1)' : '',
                                              borderRadius: '10px', marginX: 1, width: '95%'
                                          }}>
                                    <ListItemButton>
                                        <ListItemIcon className={'menuIcon'}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText sx={{color: location.pathname === item.path ? 'white' : ''}}
                                                      primary={item.text}/>
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                    <Divider/>

                    {keycloak.authenticated === true && <>
                        <List>
                            <a href="http://enershare1.epu.ntua.gr:8890/overview/activity/assets"
                               style={{
                                   textDecoration: 'none',
                                   color: '#000',
                                   width: '100%'
                               }}
                               target="_blank"
                               rel="noopener noreferrer"
                            >
                                <ListItem disablePadding
                                          sx={{
                                              borderRadius: '10px', marginX: 1, width: '95%'
                                          }}>
                                    <ListItemButton>
                                        <ListItemIcon className={'menuIcon'}>
                                            <ModelTrainingIcon sx={{color: theme.palette.primary.main}}/>
                                        </ListItemIcon>
                                        <ListItemText primary="Training Playground"/>
                                    </ListItemButton>
                                </ListItem>
                            </a>
                        </List>

                        <Divider/>

                        <List>
                            <ListItem disablePadding
                                      onClick={handleSignOut}
                                      sx={{
                                          borderRadius: '10px', marginX: 1, width: '95%',
                                      }}>
                                <ListItemButton>
                                    <ListItemIcon className={'menuIcon'}>
                                        <LogoutOutlinedIcon sx={{color: theme.palette.primary.main}}/>
                                    </ListItemIcon>
                                    <ListItemText primary="Sign Out"/>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </>}

                </Drawer>
                <Box component="main" sx={{flexGrow: 1, flex: 1}}>
                    <Main open={open}>
                        <DrawerHeader/>
                        {children}
                    </Main>
                </Box>
            </Box>
            <Footer open={open} sx={{position: 'sticky', mt: 'auto', mb: '-25px'}}><FooterContent/></Footer>
        </>
    );
}
