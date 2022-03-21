import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField, Box, Card, CardHeader, 
    Button, CardContent, MenuItem, Select, FormControl, InputLabel, Icon, CardMedia, CardActionArea, TableContainer, TableBody } from '@mui/material';
import { DateRangePicker } from '@mui/lab';
import { subDays } from 'date-fns';
import LocalMoviesOutlinedIcon from '@mui/icons-material/LocalMoviesOutlined';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {retrieveTotalMovies} from "../services/MovieService.js";


// import from 'MovieService.js'

function createData(year, movie_title, minutes) {
    return { year, movie_title, minutes};
  }
  
  const rows = [
    createData( 2000, 'The Hunger Games', 200),
    createData( 2001, 'The Hunger Games', 200),
    createData( 2002, 'The Hunger Games', 200),
    createData( 2003, 'The Hunger Games', 200),
    createData( 2004, 'The Hunger Games', 200),
  ];

const Movies = () => {

    const [dateRange, setDateRange] = useState([subDays(new Date(), 7), new Date()]);
    const [totalMovies , setTotalMovies] = React.useState();

    useEffect(
        async () => {
            console.log("test");
            const result = await retrieveTotalMovies();
            setTotalMovies(result.match('[0-9]+'));
        },
        []
      );

    return (
        <Grid container spacing={2} padding={2} sx={{ width: '100%' }} alignItems='stretch'>
            <Grid item xs={8}>
                <Typography variant='h4'>Movies</Typography>
                <Typography variant='subtitle1'>Explore the cinematic universe.</Typography>
            </Grid>
            <Grid item xs={4}>
                <DateRangePicker
                    startText="From"
                    endText="To"
                    value={dateRange}
                    onChange={(newValue) => {setDateRange(newValue);}}
                    renderInput={(startProps, endProps) => (
                    <React.Fragment>
                        <TextField {...startProps} />
                        <Box sx={{ mx: 1 }}></Box>
                        <TextField {...endProps} />
                    </React.Fragment>
                    )}
                />
            </Grid>
            <Grid item xs={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader
                                title={totalMovies}
                                subheader="Total movies"
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className='data_source'>
                            <CardHeader
                                title="IMDb"
                                subheader="Primary data source" 
                                endIcon={<LocalMoviesOutlinedIcon/>}
                            /> 
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={8}>
                <Card sx={{ height: '100%' }}>
                    <CardHeader
                        action={
                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel>Button name</InputLabel>
                                <Select label='Button name'>
                                    {[].map((option) =>
                                        <MenuItem>{option}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        }
                        title="Insert title here"
                        subheader="Insert subtitle here"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Insert charts here
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card sx={{ height: '100%' }}>
                    <CardHeader
                        action={
                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel>Button name</InputLabel>
                                <Select label='Button name'>
                                    {[].map((option) =>
                                        <MenuItem>{option}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        }
                        title="Insert title here"
                        subheader="Insert subtitle here"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Insert charts here
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card sx={{ height: '100%' }}>
                    <CardHeader
                        action={
                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel>Button name</InputLabel>
                                <Select label='Button name'>
                                    {[].map((option) =>
                                        <MenuItem>{option}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        }
                        title="Insert title here"
                        subheader="Insert subtitle here"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Insert charts here
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card sx={{ height: '100%' }}>
                    <CardHeader
                        title="Insert title here"
                        subheader="Insert subtitle here"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Insert charts here
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card sx={{ height: '100%' }}>
                    <CardHeader
                        title="Insert title here"
                        subheader="Insert subtitle here"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Insert charts here
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card sx={{ height: '100%' }}>
                    <CardHeader
                        title="Longest Movies"
                        subheader="The longest movies of each year"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                           <TableContainer >
                               <Table>
                                   <TableBody>
                                    {rows.map((row) => (
                                            <TableRow
                                            key={row.year}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.year}</TableCell>
                                            <TableCell align="right">{row.movie_title}</TableCell>
                                            <TableCell align="right">{row.minutes}</TableCell>
                                            </TableRow>
                                        ))}
                               </TableBody>
                               </Table>
                           </TableContainer>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card sx={{ height: '100%' }}>
                    <CardHeader
                        title="Shortest movies"
                        subheader="The shortest movies of each year"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                        <TableContainer >
                               <Table>
                                   <TableBody>
                                    {rows.map((row) => (
                                            <TableRow
                                            key={row.year}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.year}</TableCell>
                                            <TableCell align="right">{row.movie_title}</TableCell>
                                            <TableCell align="right">{row.minutes}</TableCell>
                                            </TableRow>
                                        ))}
                               </TableBody>
                               </Table>
                           </TableContainer>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Movies;