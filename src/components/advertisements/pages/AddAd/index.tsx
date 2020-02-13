import React, { Component } from "react";

import { Input, InputBase, InputLabel, Button, FormControl, Select, MenuItem, Container, Box, Grid } from '@material-ui/core';

import { createStyles, withStyles, Theme, WithStyles } from '@material-ui/core/styles';

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import { Advertisement } from "../../../../context/AdData";
import "./style.css";




const styles = (theme: Theme) => createStyles({
    root: {
        display: "flex",
        flexDirection: "column",


        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            // width: 200,
        },
    },
    input: {
        display: 'none',
    },
    formControl: {

        margin: theme.spacing(1),
        minWidth: 160,

    },
    button: {
        margin: theme.spacing(1),
    }
});

export interface Props extends WithStyles<typeof styles> { }

// type Props = WithStyles<typeof styles> & {}

type State = {
    selectedDate: Date
    fileName: string
    newAd: Advertisement
}



class AddAd extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            selectedDate: new Date(),
            fileName: "",
            newAd: {
                id: 0,
                title: '',
                body: '',
                ad_type: 1,        // 1: 데스크탑 메인, 2: 데스크탑 사이드, 3: 모바일 메인
                image: '',
                filename: '',
                url: '',
                start_time: (new Date()).toString(),
                end_time: (new Date()).toString(),
                state: 0,          // 0: 예약, 1: 진행
            },
        };

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);

    }



    handleStartDateChange(date: any) {
        this.setState({
            newAd: {
                ...this.state.newAd,
                start_time: date
            }
        })
    }
    handleEndDateChange(date: any) {
        this.setState({
            newAd: {
                ...this.state.newAd,
                end_time: date
            }
        })
    }

    handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        let reader = new FileReader()

        this.setState({
            fileName: e.target.value
        });
    }

    handleLocationChange(e: any) {

        this.setState({
            newAd: {
                ...this.state.newAd,
                ad_type: parseInt(e.target.value)
            }
        })

        // console.log(parseInt(e.target.value))
    }

    handleStateChange(e: any) {

        this.setState({
            newAd: {
                ...this.state.newAd,
                state: parseInt(e.target.value)
            }
        })
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(this.state.newAd)

        
        fetch('http://127.0.0.1:8000/advertisements/api', {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json"
            },
            body: JSON.stringify(this.state.newAd)
        }).then(response => response.json())
            .then((response) => {
                if (response.exitCode !== 200) {
                    throw new Error('send-message API call failed with message: ' + response.message)
                }
                alert(JSON.stringify(response))
            })
        
    }


    render() {
        const { classes } = this.props

        return (
            <div>
                광고 추가

                <form className={classes.root} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                    <TextField id="inputTitle" label="제목"/>
                    <TextField
                        id="inputBody"
                        label="설명"
                        multiline
                        rows="10"
                        variant="outlined"

                    />
                    <TextField id="inputUrl" label="연결 URL" />

                    <input id="inputImage" type="file" style={{ display: "none" }} value={this.state.fileName} onChange={this.handleFileChange} />
                    <label htmlFor="inputImage">
                        <Button className={classes.button} variant="contained" component="span">
                        {this.state.fileName === '' ? "이미지 파일 선택" : "선택 완료"}
                        </Button>
                        {this.state.fileName === '' ? "" : this.state.fileName}
                    </label>

                    <Grid container spacing={1}>
                        <Grid item >
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">위치</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="inputAdType"
                                    value={this.state.newAd.ad_type}
                                    onChange={this.handleLocationChange}
                                >
                                    <option value="1">데스크탑 메인</option>
                                    <option value="2">데스크탑 사이드</option>
                                    <option value="3">모바일 메인</option>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">상태</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="InputState"
                                    value={this.state.newAd.state}
                                    onChange={this.handleStateChange}
                                >
                                    <option value="0">예약</option>
                                    <option value="1">진행</option>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="start_date"
                                    value={this.state.newAd.start_time}
                                    onChange={date => this.handleStartDateChange(date)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="end_date"
                                    value={this.state.newAd.end_time}
                                    onChange={date => this.handleEndDateChange(date)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                
                    <Button className={classes.button} variant="contained" type="submit">저장하기</Button>

                </form>


            


            </div>
        )

    }
}

export default withStyles(styles)(AddAd);