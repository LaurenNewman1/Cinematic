import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField, Box, Card, CardHeader, 
    Button, CardContent, MenuItem, Select, FormControl, InputLabel,
    Table, TableContainer, TableBody, TableRow, TableCell} from '@mui/material';
import { DatePicker } from '@mui/lab';
import { subDays } from 'date-fns';
// import from 'CastCrewService.js'
import { retrieveTotalActors, retrieveHighestActor, retrieveHighestDirector, retrieveHighestWriter } from '../services/CastCrewService';
import { useTheme } from '@emotion/react';
import Loading from '../components/Loading.jsx';


const CastCrew = () => {

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

    const [dateRange, setDateRange] = useState([subDays(new Date(), 3650), new Date()]);
    const [totalActors , setTotalActors] = useState();
    const [loading, setLoading] = useState(false);
    const [highestActor, setHighestActor] = useState([]);
    const [highestDirector, setHighestDirector] = useState([]);
    const [highestWriter, setHighestWriter] = useState([]);

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
        console.log(writer);
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
                <Typography variant='h4'>Cast and Crew</Typography>
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
                        style={{backgroundColor: '#44c2b4'}}>
                            <CardHeader
                                title={totalActors}
                                subheader="Total actors and directors"
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card
                        style={{backgroundColor: '#f4738a'}}>
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
                                    {highestActor.map((actor) => (
                                        <TableRow
                                        key={actor[0]}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {actor[0]}
                                            </TableCell>
                                            <TableCell align="right">{actor[1]}</TableCell>
                                            <TableCell align="right" sx={{ color: `${theme.palette.accent1.main}` }}>
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
                        title="Highest Premiered Writer"
                        subheader="Writers that have been in the most."
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
                                            <TableCell align="right" sx={{ color: `${theme.palette.accent2.main}` }}>
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
                        title="Insert title here"
                        subheader="Insert subtitle here"
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
                                            <TableCell align="right" sx={{ color: `${theme.palette.secondary.main}` }}>
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
            </>
            }
        </Grid>
    );
};

export default CastCrew;