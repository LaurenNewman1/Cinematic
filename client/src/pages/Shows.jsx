import React, { useState } from 'react';
import { Grid, Typography, TextField, Box, Card, CardHeader, 
    Button, CardContent, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { DateRangePicker } from '@mui/lab';
import { subDays } from 'date-fns';
// import from 'ShowService.js'

const Shows = () => {

    const [dateRange, setDateRange] = useState([subDays(new Date(), 7), new Date()]);

    return (
        <Grid container spacing={2} padding={2} sx={{ width: '100%' }} alignItems='stretch'>
            <Grid item xs={8}>
                <Typography variant='h4'>TV Shows</Typography>
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
                                title="placeholder"
                                subheader="placeholder"
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader
                                title="placeholder"
                                subheader="placeholder"
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
        </Grid>
    );
};

export default Shows;