import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField, Box, Card, CardHeader, 
    Button, CardContent, MenuItem, Select, FormControl, InputLabel, TableBody, TableContainer } from '@mui/material';
import { DatePicker } from '@mui/lab';
import { subDays } from 'date-fns';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {retrieveTotalShows, retrieveHighestRatedShows, retrieveLowestRatedShows,retrieveLongestShows, retrieveShortestShows, retrieveAvgRuntime, retrieveAvgRating} from "../services/ShowService.js";
import Loading from '../components/Loading.jsx';
import { useTheme } from '@emotion/react';
import { ArgumentAxis, ValueAxis, Chart, LineSeries} from '@devexpress/dx-react-chart-material-ui';

function createData(year, movie_title, minutes) {
    return { year, movie_title, minutes};
  }
  
 

const Shows = () => {

    const [dateRange, setDateRange] = useState([subDays(new Date(), 3650), new Date()]);
    const [totalShows , setTotalShows] = React.useState();
    const [bestShows, setBestShows] = useState([]);
    const [worstShows, setWorstShows] = useState([]);
    const [avgRuntimes, setAvgRuntimes] = useState([]);
    const [avgRating, setAvgRating] = useState([]);
    const [loading, setLoading] = useState(false);
    const [longestShows, setLongestShows] = useState([]);
    const [shortestShows, setShortestShows] = useState([]);

    const theme = useTheme();

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

    function formatData(data) {
        let formatted = [];
        data.forEach(d => {
            formatted.push({x: d[0], y: d[1]});
        });
        return formatted;
    }

    const fetchData = async () => {
        setLoading(true);
        const tot = await retrieveTotalShows();
        setTotalShows(tot.match('[0-9]+'));
        const best = await retrieveHighestRatedShows(dateRange);
        setBestShows(removeDuplicates(JSON.parse(best).rows));
        const worst = await retrieveLowestRatedShows(dateRange);
        setWorstShows(removeDuplicates(JSON.parse(worst).rows));
        // TODO
        //const longest = await retrieveLongestShows(dateRange);
        //setLongestShows(removeDuplicates(JSON.parse(longest).rows));
        //const shortest = await retrieveShortestShows(dateRange);
        //setShortestShows(removeDuplicates(JSON.parse(shortest).rows));
        const runtime = await retrieveAvgRuntime(dateRange);
        setAvgRuntimes(JSON.parse(runtime).rows);
        const rating = await retrieveAvgRating(dateRange);
        setAvgRating(formatData(JSON.parse(rating).rows));
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
                <Typography variant='h4'>TV Shows</Typography>
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
                         style={{backgroundColor: '#3283d2'}}>
                            <CardHeader
                                title={totalShows}
                                subheader="Total TV Shows"
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card
                        style={{backgroundColor: '#44c2b4'}}>
                            <CardHeader
                                title="IMDb"
                                subheader="Primary data source"
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
                        title="Average Runtime by Year"
                        subheader="An analysis of runtime trends over time"
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
                        title="Highest Rated Shows"
                        subheader="The best shows of each year"
                    />
                    <CardContent>
                        <TableContainer >
                            <Table>
                                <TableBody>
                                    {bestShows.map((show) => (
                                        <TableRow
                                        key={show[0]}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {show[0]}
                                            </TableCell>
                                            <TableCell align="right">{show[1]}</TableCell>
                                            <TableCell align="right" sx={{ color: `${theme.palette.primary.main}` }}>
                                                {Math.round(show[2], 1)}
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
                        title="Lowest Rated Shows"
                        subheader="The worst shows of each year"
                    />
                    <CardContent>
                        <TableContainer >
                            <Table>
                                <TableBody>
                                    {worstShows.map((show) => (
                                        <TableRow
                                        key={show[0]}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {show[0]}
                                            </TableCell>
                                            <TableCell align="right">{show[1]}</TableCell>
                                            <TableCell align="right" sx={{ color: `${theme.palette.accent1.main}` }}>
                                                {Math.round(show[2], 1)}
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
                        title="Longest Running Shows"
                        subheader="The longest shows of each year"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                        <TableContainer >
                               <Table>
                                   <TableBody>
                                    {shortestShows.map((show) => (
                                            <TableRow
                                            key={show[0]}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                            <TableCell component="th" scope="row">
                                                {show[0]}
                                            </TableCell>
                                            <TableCell align="right">{show[1]}</TableCell>
                                            <TableCell align="right" sx={{ color: `${theme.palette.accent1.main}` }}>
                                                {Math.round(show[2], 1)}
                                            </TableCell>
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
                        title="Shortest Running Shows"
                        subheader="The shortest shows of each year"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                        <TableContainer >
                               <Table>
                                   <TableBody>
                                    {shortestShows.map((show) => (
                                            <TableRow
                                            key={show[0]}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                            <TableCell component="th" scope="row">
                                                {show[0]}
                                            </TableCell>
                                            <TableCell align="right">{show[1]}</TableCell>
                                            <TableCell align="right" sx={{ color: `${theme.palette.accent1.main}` }}>
                                                {Math.round(show[2], 1)}
                                            </TableCell>
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

export default Shows;