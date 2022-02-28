import React from 'react';
import { createTheme, ThemeProvider, Box, CssBaseline, Drawer, Toolbar, Divider, List,
ListItem, ListItemText, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import DateFnsAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const Page = ({children}) => {

    const navigate = useNavigate();

    const changePage = (page) => {
        switch(page) {
            case 'Movies':
                navigate('/');
                break;
            case 'TV Shows':
                navigate('/shows');
                break;
            case 'Cast & Crew':
                navigate('/castandcrew');
                break;
        }
    }
  
    const theme = createTheme({
        palette: {
            primary: {
                main: '#3283d2',
                light: '#c1d9f1'
            },
            secondary: {
                main: '#44c2b4',
                light: '#c6ede8'
            },
            accent1: {
                main: '#f4738a',
                light: '#fcd5dc'
            },
            accent2: {
                main: '#9f66e9',
                light: '#d8c2f6'
            },
            background: {
                default: '#F5F5F5'
            }
        },
        typography: {
            fontSize: 12
        },
        components: {
            MuiCardHeader: {
                styleOverrides: {
                    action: {
                        minWidth: '150px'
                    }
                }
            }
        }
    });

    return (
        <div style={{ minHeight: '100vh' }} >
            <LocalizationProvider dateAdapter={DateFnsAdapter}>
                <ThemeProvider theme={theme}>
                    <Box sx={{ display: 'flex'}}>
                        <CssBaseline />
                        <Drawer
                            sx={{
                            width: 240,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: 240,
                                backgroundColor: theme.palette.primary.main,
                                color: 'white'
                            },
                            }}
                            variant="permanent"
                            anchor="left"
                        >
                            <Toolbar>
                                <Typography sx={{ margin: 'auto', fontFamily: 'fantasy', fontSize: '120%' }}>CINEMATIC</Typography>
                            </Toolbar>
                            <Divider />
                            <List>
                            {['Movies', 'TV Shows', 'Cast & Crew'].map((text) => (
                                <ListItem button key={text} onClick={() => changePage(text)}>
                                    <ListItemText primary={text} sx={{ paddingLeft: 2 }}/>
                                </ListItem>
                            ))}
                            </List>
                        </Drawer>
                        <Box component='main' sx={{ flexgrow: 1, bgcolor: 'background.default', width: '100%' }} >
                            {children}
                        </Box>
                    </Box>
                </ThemeProvider>
            </LocalizationProvider>
        </div>
    )
}

Page.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired
  };

export default Page