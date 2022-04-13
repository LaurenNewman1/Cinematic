import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField, Box, Card, CardHeader, 
    Button, CardContent, MenuItem, Select, FormControl, InputLabel,
    Table, TableContainer, TableBody, TableRow, TableCell} from '@mui/material';
import { DatePicker } from '@mui/lab';
import { subDays } from 'date-fns';
// import from 'CastCrewService.js'
import { retrieveTotalActors, retrieveHighestActor, retrieveHighestDirector, retrieveStars,
    retrieveHighestWriter, retrieveAvgRating, retrieveRoleGenreActor, retrieveRoleGenreDirector} from '../services/CastCrewService';
import { useTheme } from '@emotion/react';
import Loading from '../components/Loading.jsx';
import { ArgumentAxis, ValueAxis, Chart, LineSeries, AreaSeries, BarSeries, Legend } from '@devexpress/dx-react-chart-material-ui';
import {ValueScale, ArgumentScale, Palette, Stack} from '@devexpress/dx-react-chart';
import { scaleBand } from '@devexpress/dx-chart-core';


const CastCrew = () => {

    const theme = useTheme();

    const scheme = [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.accent1.main];

    function formatData(data) {
        let formatted = [];
        data.forEach(d => {
            formatted.push({x: d[0], y: Math.round(d[1], 2)});
        });
        return formatted;
    }

    function getCol(matrix){
        var column = [];
        for(var i=0; i<matrix.length; i++){
           column.push(matrix[i][0]);
        }
        return column;
     }

    function formatBarChart(data1, data2, data3) {
        let formatted = [];
        const start = dateRange[0].getYear() + 1900;
        const end = dateRange[1].getYear() + 1900;
        for (var d = start; d <= end; d++) {
            const i1 = getCol(data1).indexOf(d);
            const i2 = getCol(data2).indexOf(d);
            const i3 = getCol(data3).indexOf(d);
            formatted.push({
                x: d, 
                y1: i1 === -1 ? 0 : data1.at(i1)[1], 
                y2: i2 === -1 ? 0 : data2.at(i2)[1], 
                y3: i3 === -1 ? 0 : data3.at(i3)[1]
            });
        }
        return formatted;
    }

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

    const [dateRange, setDateRange] = useState([subDays(new Date(), 3650), new Date()]);
    const [actorSearch, setActorSearch] = useState("Dwayne Johnson");
    const [sendSearch, setSendSearch] = useState("Dwayne Johnson");
    const [actorSearch2, setActorSearch2] = useState("Dwayne Johnson");
    const [sendSearch2, setSendSearch2] = useState("Dwayne Johnson");
    const [directorSearch, setDirectorSearch] = useState("Quentin Tarantino");
    const [sendDirectorSearch, setSendDirectorSearch] = useState("Quentin Tarantino");
    const [totalActors , setTotalActors] = useState();
    const [loading, setLoading] = useState(false);
    const [highestActor, setHighestActor] = useState([]);
    const [highestDirector, setHighestDirector] = useState([]);
    const [highestWriter, setHighestWriter] = useState([]);
    const [actorGenres, setActorGenres] = useState([]);
    const [directorGenres, setDirectorGenres] = useState([]);
    const [avgRating, setAvgRating] = useState([]);
    const [stars, setStars] = useState([]);

    const fetchData = async () => {
        setLoading(true);
        const total = await retrieveTotalActors();
        setTotalActors(total.match('[0-9]+'));
        const actor = await retrieveHighestActor(dateRange);
        setHighestActor(removeDuplicates(JSON.parse(actor).rows));
        console.log(actor);
        const director = await retrieveHighestDirector(dateRange);
        setHighestDirector(removeDuplicates(JSON.parse(director).rows));
        console.log(director);
        const writer = await retrieveHighestWriter(dateRange);
        setHighestWriter(removeDuplicates(JSON.parse(writer).rows));
        const rating = await retrieveAvgRating(dateRange, actorSearch);
        setAvgRating(formatData(JSON.parse(rating).rows));
        const st = await retrieveStars(dateRange);
        setStars(removeDuplicates(JSON.parse(st).rows));
        const aGenres1 = await retrieveRoleGenreActor(dateRange, actorSearch, "Comedy");
        const aGenres2 = await retrieveRoleGenreActor(dateRange, actorSearch, "Drama");
        const aGenres3 = await retrieveRoleGenreActor(dateRange, actorSearch, "Action");
        setActorGenres(
            formatBarChart(JSON.parse(aGenres1).rows, JSON.parse(aGenres2).rows, JSON.parse(aGenres3).rows)
        );
        const dGenres1 = await retrieveRoleGenreDirector(dateRange, directorSearch, "Comedy");
        const dGenres2 = await retrieveRoleGenreDirector(dateRange, directorSearch, "Drama");
        const dGenres3 = await retrieveRoleGenreDirector(dateRange, directorSearch, "Action");
        setDirectorGenres(
            formatBarChart(JSON.parse(dGenres1).rows, JSON.parse(dGenres2).rows, JSON.parse(dGenres3).rows)
        );
        setLoading(false);
    }

    useEffect(async () => fetchData(), [dateRange, sendSearch, sendSearch2, sendDirectorSearch]);

    const changeDate = (newDate, fromto) => {
        if (fromto == "from")
            setDateRange([newDate, dateRange[1]]);
        else
            setDateRange([dateRange[0], newDate]);
    }

    return (
        <Grid container spacing={2} padding={2} sx={{ width: '100%' }} alignItems='stretch'>
            <Grid item xs={8}>
                <Typography variant='h4'>Cast and Crew</Typography>
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
                        style={{backgroundColor: '#44c2b4', height: 100}}>
                            <CardHeader
                                title={totalActors}
                                subheader="Total actors and directors"
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card
                        style={{backgroundColor: '#f4738a', height: 100}}>
                            <CardHeader
                                title="IMDb"
                                subheader="primary data source"
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
                                <TextField
                                    label="Enter Actor"
                                    value={actorSearch}
                                    onChange={(e) => setActorSearch(e.target.value)}
                                    onKeyPress={(e) => { if (e.key === "Enter") { setSendSearch(e.target.value); }}}
                                />
                            </FormControl>
                        }
                        title="Average Rating Over Time"
                        subheader="Average rating of total productions starred in."
                    />
                    <CardContent sx={{ 
                        paddingBottom: 0, paddingBottom: 0, paddingTop: 0,
                        "&:last-child": {
                        paddingBottom: 0
                        }}}>
                        <Chart data={avgRating} sx={{ maxHeight: 130 }}>
                            <ArgumentScale factory={scaleBand} />
                            <ArgumentAxis />
                            <ValueAxis showGrid={false}/>
                            <AreaSeries valueField="y" argumentField="x" />
                        </Chart>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card sx={{ height: '100%' }}>
                    <CardHeader
                        title="Roles by Genre Over Time"
                        subheader="How many roles an actor had by genre"
                        action={
                            <FormControl sx={{ width: '100%' }}>
                                <TextField
                                    label="Enter Actor"
                                    value={actorSearch2}
                                    onChange={(e) => setActorSearch2(e.target.value)}
                                    onKeyPress={(e) => { if (e.key === "Enter") { setSendSearch2(e.target.value); }}}
                                />
                            </FormControl>
                        }
                    />
                    <CardContent sx={{ 
                        paddingBottom: 0, paddingBottom: 0, paddingTop: 0,
                        "&:last-child": {
                        paddingBottom: 0
                        }}}>
                        <Chart data={actorGenres} sx={{ maxHeight: 350 }}>
                            <Palette scheme={scheme} />
                            <ArgumentScale factory={scaleBand} />
                            <ArgumentAxis />
                            <ValueAxis showGrid={false}/>
                            <BarSeries valueField="y1" argumentField="x" name="Comedy" />
                            <BarSeries valueField="y2" argumentField="x" name="Drama" />
                            <BarSeries valueField="y3" argumentField="x" name="Action" />
                            <Legend position='bottom' sx={{ maxHeight: 50}}/>
                            <Stack />
                        </Chart>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card sx={{ height: '100%' }}>
                    <CardHeader
                        action={
                            <FormControl sx={{ width: '100%' }}>
                                <TextField
                                    label="Enter Director"
                                    value={directorSearch}
                                    onChange={(e) => setDirectorSearch(e.target.value)}
                                    onKeyPress={(e) => { if (e.key === "Enter") { setSendDirectorSearch(e.target.value); }}}
                                />
                            </FormControl>
                        }
                        title="Directors by Genre Over Time"
                        subheader="How many films directed by genre"
                    />
                    <CardContent sx={{ 
                        paddingBottom: 0, paddingBottom: 0, paddingTop: 0,
                        "&:last-child": {
                        paddingBottom: 0
                        }}}>
                        <Chart data={directorGenres} sx={{ maxHeight: 350 }}>
                            <Palette scheme={scheme} />
                            <ArgumentScale factory={scaleBand} />
                            <ArgumentAxis />
                            <ValueAxis showGrid={false}/>
                            <BarSeries valueField="y1" argumentField="x" name="Comedy" />
                            <BarSeries valueField="y2" argumentField="x" name="Drama" />
                            <BarSeries valueField="y3" argumentField="x" name="Action" />
                            <Legend position='bottom' sx={{ maxHeight: 50}}/>
                            <Stack />
                        </Chart>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card sx={{ height: '100%' }}>
                    <CardHeader
                        title="Highest Premiered Actor"
                        subheader="Actors that have been in the most."
                    />
                    <CardContent>
                        <TableContainer >
                            <Table>
                                <TableBody>
                                    {highestActor.map((actor) => (
                                        <TableRow
                                        key={actor[0]}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {actor[0]}
                                            </TableCell>
                                            <TableCell align="right">{actor[1]}</TableCell>
                                            <TableCell align="right" sx={{ color: `${theme.palette.primary.main}` }}>
                                                {Math.round(actor[2], 1)}
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
                        title="Highest Premiered Director"
                        subheader="Directors that have been in the most."
                    />
                    <CardContent>
                        <TableContainer >
                            <Table>
                                <TableBody>
                                    {highestDirector.map((director) => (
                                        <TableRow
                                        key={director[0]}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {director[0]}
                                            </TableCell>
                                            <TableCell align="right">{director[1]}</TableCell>
                                            <TableCell align="right" sx={{ color: `${theme.palette.accent1.main}` }}>
                                                {Math.round(director[2], 1)}
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
                        title="Highest Premiered Writer"
                        subheader="Writers that have been in the most."
                    />
                    <CardContent>
                        <TableContainer >
                            <Table>
                                <TableBody>
                                    {highestWriter.map((writer) => (
                                        <TableRow
                                        key={writer[0]}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {writer[0]}
                                            </TableCell>
                                            <TableCell align="right">{writer[1]}</TableCell>
                                            <TableCell align="right" sx={{ color: `${theme.palette.accent2.main}` }}>
                                                {Math.round(writer[2], 1)}
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
                        title="Stars of the Best Movies"
                        subheader="The star of the highest rated movie over time."
                    />
                    <CardContent>
                        <TableContainer >
                            <Table>
                                <TableBody>
                                    {stars.map((star) => (
                                        <TableRow
                                        key={star[0]}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {star[0]}
                                            </TableCell>
                                            <TableCell align="right">{star[1]}</TableCell>
                                            <TableCell align="right" sx={{ color: `${theme.palette.secondary.main}` }}>
                                                {Math.round(star[2], 1)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Grid>
            </>
            }
        </Grid>
    );
};

export default CastCrew;