import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField, Box, Card, CardHeader, 
    Button, CardContent, MenuItem, Select, FormControl, InputLabel, TableBody, TableContainer } from '@mui/material';
import { DatePicker } from '@mui/lab';
import { subDays } from 'date-fns';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {retrieveTotalShows, retrieveHighestRatedShows, retrieveLowestRatedShows,
    retrieveLongestShows, retrieveShortestShows, retrieveAvgRuntime, retrieveAvgRating,
    retrieveAltLang} from "../services/ShowService.js";
import Loading from '../components/Loading.jsx';
import { useTheme } from '@emotion/react';
import { ArgumentAxis, ValueAxis, Chart, LineSeries, AreaSeries} from '@devexpress/dx-react-chart-material-ui';
import {ValueScale, ArgumentScale, Palette, Label} from '@devexpress/dx-react-chart';
import { scaleBand } from '@devexpress/dx-chart-core';

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
    const [altLang, setAltLang] = useState([]);

    const theme = useTheme();

    const scheme = [theme.palette.accent2.main];

    const removeDuplicates = (list) => {
        let years = [];
        let unique = [];
        if (list)
            list.forEach((el) => {
                if (!years.includes(el[0])) {
                    years.push(el[0]);
                    unique.push(el);
                }
            })
        return unique;
    }

    function formatData(data) {
        let formatted = [];
        if (data) {
            if (data.length > 11) {
                data.forEach((d, i) => {
                    if (i % 2 == 0)
                        formatted.push({x: d[0], y: d[1]});
                });
            }
            else {
                data.forEach(d => {
                    formatted.push({x: d[0], y: d[1]});
                });
            }
        }
        return formatted;
    }

    const fetchData = async () => {
        setLoading(true);
        const tot = await retrieveTotalShows();
        setTotalShows(tot.match('[0-9]+') 
        ? tot.match('[0-9]+').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
        : 0);
        const best = await retrieveHighestRatedShows(dateRange);
        setBestShows(removeDuplicates(JSON.parse(best).rows));
        console.log(best)
        const worst = await retrieveLowestRatedShows(dateRange);
        setWorstShows(removeDuplicates(JSON.parse(worst).rows));
        const longest = await retrieveLongestShows(dateRange);
        setLongestShows(removeDuplicates(JSON.parse(longest).rows));
        const shortest = await retrieveShortestShows(dateRange);
        setShortestShows(removeDuplicates(JSON.parse(shortest).rows));
        const runtime = await retrieveAvgRuntime(dateRange);
        setAvgRuntimes(formatData(JSON.parse(runtime).rows));
        const rating = await retrieveAvgRating(dateRange);
        setAvgRating(formatData(JSON.parse(rating).rows));
        const lang = await retrieveAltLang(dateRange);
        setAltLang(formatData(JSON.parse(lang).rows));
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
                    minDate={new Date('2001')}
                    maxDate={new Date('2023')}
                    value={dateRange[0]}
                    onChange={(newValue) => changeDate(newValue, "from")}
                    renderInput={(params) => <TextField {...params} helperText={null} />}
                />
                <DatePicker
                    views={['year']}
                    label="To"
                    minDate={new Date('2001')}
                    maxDate={new Date('2023')}
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
                         style={{backgroundColor: '#3283d2', height: 120}}>
                            <CardHeader
                                title={totalShows}
                                subheader="Total TV Shows"
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card
                        style={{backgroundColor: '#44c2b4', height: 120}}>
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
                        title="Alternative Language Availability"
                        subheader="An analysis of language translations over time."
                    />
                    <CardContent sx={{ 
                        paddingBottom: 0, paddingBottom: 0, paddingTop: 0,
                        "&:last-child": {
                        paddingBottom: 0
                        }}}>
                        {altLang.length ?
                        <Chart data={altLang} sx={{ maxHeight: 170 }}>
                            <Palette scheme={scheme} />
                            <ArgumentScale factory={scaleBand} />
                            <ArgumentAxis />
                            <ValueAxis showGrid={false} sx={{color: `${theme.palette.accent2.main}`}}/>
                            <AreaSeries valueField="y" argumentField="x" />
                        </Chart>
                        : <Typography>No results found.</Typography>}
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card sx={{ height: '100%' }}>
                    <CardHeader
                        title="Average Runtime by Year"
                        subheader="An analysis of runtime trends over time"
                    />
                    <CardContent sx={{ 
                        paddingBottom: 0, paddingBottom: 0, paddingTop: 0,
                        "&:last-child": {
                        paddingBottom: 0
                        }}}>
                        {avgRuntimes.length ?
                        <Chart data={avgRuntimes} sx={{ maxHeight: 350 }}>
                            <ArgumentAxis />
                            <ArgumentScale factory={scaleBand} />
                            <ValueAxis />
                            <LineSeries valueField="y" argumentField="x" />
                        </Chart>
                        : <Typography>No results found.</Typography>}
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card sx={{ height: '100%' }}>
                    <CardHeader
                        title="Average Rating by Year"
                        subheader="An analysis of rating trends over time (out of 10)"
                    />
                    <CardContent sx={{ 
                        paddingBottom: 0, paddingBottom: 0, paddingTop: 0,
                        "&:last-child": {
                        paddingBottom: 0
                        }}}>
                        {avgRating.length ?
                        <Chart data={avgRating} sx={{ maxHeight: 350 }}>
                            <ArgumentAxis />
                            <ArgumentScale factory={scaleBand} />
                            <ValueAxis />
                            <LineSeries valueField="y" argumentField="x" />
                        </Chart>
                        : <Typography>No results found.</Typography>}
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
                                    {bestShows.length ?
                                    bestShows.map((show) => (
                                        <TableRow
                                        key={show[0]}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {show[0]}
                                            </TableCell>
                                            <TableCell align="right">{show[1]}</TableCell>
                                            <TableCell align="right" sx={{ color: `${theme.palette.primary.main}` }}>
                                                {Math.round(show[2] * 100) / 100}
                                            </TableCell>
                                        </TableRow>
                                    )) : <Typography>No results found.</Typography>}
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
                                    {worstShows.length ?
                                    worstShows.map((show) => (
                                        <TableRow
                                        key={show[0]}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {show[0]}
                                            </TableCell>
                                            <TableCell align="right">{show[1]}</TableCell>
                                            <TableCell align="right" sx={{ color: `${theme.palette.accent1.main}` }}>
                                                {Math.round(show[2] * 100) / 100}
                                            </TableCell>
                                        </TableRow>
                                    )) : <Typography>No results found.</Typography>}
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
                                    {longestShows.length ?
                                    longestShows.map((show) => (
                                            <TableRow
                                            key={show[0]}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                            <TableCell component="th" scope="row">
                                                {show[0]}
                                            </TableCell>
                                            <TableCell align="right">{show[1]}</TableCell>
                                            <TableCell align="right" sx={{ color: `${theme.palette.accent1.main}` }}>
                                                {Math.round(show[2] * 100) / 100}
                                            </TableCell>
                                            </TableRow>
                                        )) : <Typography>No results found.</Typography>}
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
                                    {shortestShows.length ?
                                    shortestShows.map((show) => (
                                            <TableRow
                                            key={show[0]}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                            <TableCell component="th" scope="row">
                                                {show[0]}
                                            </TableCell>
                                            <TableCell align="right">{show[1]}</TableCell>
                                            <TableCell align="right" sx={{ color: `${theme.palette.accent1.main}` }}>
                                                {Math.round(show[2] * 100) / 100}
                                            </TableCell>
                                            </TableRow>
                                        )) : <Typography>No results found.</Typography>}
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