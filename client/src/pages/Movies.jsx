import React, { useState, useEffect } from 'react';
import { Grid, Typography,  Card, CardHeader, TextField,
    CardContent, MenuItem, Select, FormControl, InputLabel, TableContainer, TableBody } from '@mui/material';
import { DatePicker } from '@mui/lab';
import { subDays } from 'date-fns';
import LocalMoviesOutlinedIcon from '@mui/icons-material/LocalMoviesOutlined';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {retrieveAvgRuntime, retrieveHighestRatedMovies, retrieveLongestMovies, retrieveLowestRatedMovies, retrieveTotalMovies} from "../services/MovieService.js";
import Loading from '../components/Loading.jsx';
import { useTheme } from '@emotion/react';
import { retrieveAvgRating } from '../services/ShowService.js';
import { ArgumentAxis, ValueAxis, Chart, LineSeries} from '@devexpress/dx-react-chart-material-ui';

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

    const [dateRange, setDateRange] = useState([subDays(new Date(), 365), new Date()]);
    const [totalMovies , setTotalMovies] = useState();
    const [longestMovies, setLongestMovies] = useState([]);
    const [bestMovies, setBestMovies] = useState([]);
    const [worstMovies, setWorstMovies] = useState([]);
    const [avgRuntimes, setAvgRuntimes] = useState([]);
    const [avgRating, setAvgRating] = useState([]);
    const [loading, setLoading] = useState(false);
    const theme = useTheme();

    function formatData(data) {
        let formatted = [];
        data.forEach(d => {
            formatted.push({x: d[0], y: d[1]});
        });
        return formatted;
    }

    const removeDuplicates = (list) => {
        let years = [];
        let unique = [];
        list.forEach((el) => {
            if (!years.includes(el[0])) {
                years.push(el[0]);
                unique.push(el);
            }
        })
        console.log(unique);
        return unique;
    }

    const fetchData = async () => {
        setLoading(true);
        const tot = await retrieveTotalMovies();
        setTotalMovies(tot.match('[0-9]+'));
        const longest = await retrieveLongestMovies();
        console.log(longest);
        const best = await retrieveHighestRatedMovies(dateRange);
        setBestMovies(removeDuplicates(JSON.parse(best).rows));
        const worst = await retrieveLowestRatedMovies(dateRange);
        setWorstMovies(removeDuplicates(JSON.parse(worst).rows));
        const runtime = await retrieveAvgRuntime(dateRange);
        setAvgRuntimes(JSON.parse(runtime).rows);
        const rating = await retrieveAvgRating(dateRange);
        setAvgRating(formatData(JSON.parse(rating).rows));
        console.log(rating);
        setLoading(false);
    }

    useEffect(async () => fetchData(), [dateRange]);

    const changeDate = (newDate, fromto) => {
        if (fromto == "from")
            setDateRange([newDate, dateRange[1]]);
        else
            setDateRange([dateRange[0], newDate]);
    }

    return (
        <Grid container spacing={2} padding={2} sx={{ width: '100%' }} alignItems='stretch'>
            <Grid item xs={8}>
                <Typography variant='h4'>Movies</Typography>
                <Typography variant='subtitle1'>Explore the cinematic universe.</Typography>
            </Grid>
            <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <DatePicker
                    views={['year']}
                    label="From"
                    value={dateRange[0]}
                    onChange={(newValue) => changeDate(newValue, "from")}
                    renderInput={(params) => <TextField {...params} helperText={null} />}
                />
                <DatePicker
                    views={['year']}
                    label="To"
                    value={dateRange[1]}
                    onChange={(newValue) => changeDate(newValue, "to")}
                    renderInput={(params) => <TextField {...params} helperText={null} />}
                />
            </Grid>
            {loading ?
            <div sx={{ height: '100%', width: '100%', alignItems: 'center' }}>
                <Loading />
            </div> :
            <>
            <Grid item xs={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Card
                        style={{backgroundColor: '#9f66e9'}}>
                            <CardHeader
                                title={totalMovies}
                                subheader="Total movies"
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className='data_source'
                        style={{backgroundColor: '#f4738a'}}>
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
                        title="Average Rating by Year"
                        subheader="An analysis of rating trends over time (out of 10)"
                    />
                    <CardContent>
                        <Chart data={avgRating}>
                            <ArgumentAxis />
                            <ValueAxis />
                            <LineSeries valueField="y" argumentField="x" />
                        </Chart>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card sx={{ height: '100%' }}>
                    <CardHeader
                        title="Highest Rated Movies"
                        subheader="The best movies of each year"
                    />
                    <CardContent>
                        <TableContainer >
                            <Table>
                                <TableBody>
                                    {bestMovies.map((movie) => (
                                        <TableRow
                                        key={movie[0]}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {movie[0]}
                                            </TableCell>
                                            <TableCell align="right">{movie[1]}</TableCell>
                                            <TableCell align="right" sx={{ color: `${theme.palette.primary.main}` }}>
                                                {Math.round(movie[2], 1)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card sx={{ height: '100%' }}>
                    <CardHeader
                        title="Lowest Rated Movies"
                        subheader="The worst movies of each year"
                    />
                    <CardContent>
                        <TableContainer >
                            <Table>
                                <TableBody>
                                    {worstMovies.map((movie) => (
                                        <TableRow
                                        key={movie[0]}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {movie[0]}
                                            </TableCell>
                                            <TableCell align="right">{movie[1]}</TableCell>
                                            <TableCell align="right" sx={{ color: `${theme.palette.accent1.main}` }}>
                                                {Math.round(movie[2], 1)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
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
            </>
            }
        </Grid>
    );
};

export default Movies;