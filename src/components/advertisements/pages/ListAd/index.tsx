import React, { Component } from "react";

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import IconButton from '@material-ui/core/IconButton';

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import { Advertisement } from "../../../../context/AdData"
import { datePickerDefaultProps } from "@material-ui/pickers/constants/prop-types";
import { Box, Container } from "@material-ui/core";


type Props = {

}


type State = {
    advertisements: Array<Advertisement>,
    date: Date,
}

class ListAd extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            advertisements: [],
            date: new Date(),

        };

        console.log(this.state.date)
    }



    async componentDidMount() {
        try {
            const date = this.state.date
            console.log('http://127.0.0.1:8000/advertisements/api?str_date=' + date.getFullYear() + (date.getMonth() + 1) + '&end_date=' + date.getFullYear() + (date.getMonth() + 2))

            const res = await fetch('http://127.0.0.1:8000/advertisements/api?str_date=' + date.getFullYear() + (date.getMonth() + 1) + '&end_date=' + date.getFullYear() + (date.getMonth() + 2));
            const ads = await res.json();
            console.log(ads)
            this.setState({
                advertisements: ads
            });
        } catch (e) {
            console.log(e);
        }
    }



    async clickedBeforeIcon() {

        this.state.date.setMonth(this.state.date.getMonth() - 1)


        console.log(this.state.date)
        try {
            const date = this.state.date
            console.log('http://127.0.0.1:8000/advertisements/api?str_date=' + date.getFullYear() + (date.getMonth()) + '&end_date=' + date.getFullYear() + (date.getMonth() + 2))

            const res = await fetch('http://127.0.0.1:8000/advertisements/api?str_date=' + date.getFullYear() + (date.getMonth() + 1) + '&end_date=' + date.getFullYear() + (date.getMonth() + 2));
            const ads = await res.json();
            console.log(ads)
            this.setState({
                advertisements: ads
            });

            console.log(this.state.advertisements)
        } catch (e) {
            console.log(e);
        }

    }

    async clickedNextIcon() {

        this.state.date.setMonth(this.state.date.getMonth() + 1)

        try {
            const date = this.state.date
            console.log('http://127.0.0.1:8000/advertisements/api?str_date=' + date.getFullYear() + (date.getMonth() + 2) + '&end_date=' + date.getFullYear() + (date.getMonth() + 2))

            const res = await fetch('http://127.0.0.1:8000/advertisements/api?str_date=' + date.getFullYear() + (date.getMonth() + 1) + '&end_date=' + date.getFullYear() + (date.getMonth() + 2));
            const ads = await res.json();
            console.log(ads)
            this.setState({
                advertisements: ads
            });

            console.log(this.state.advertisements)
        } catch (e) {
            console.log(e);
        }


    }



    render() {

        const StyledTableCell = withStyles(theme => ({
            head: {
                backgroundColor: theme.palette.common.black,
                color: theme.palette.common.white,
            },
            body: {
                fontSize: 14,
            },
        }))(TableCell);

        const StyledTableRow = withStyles(theme => ({
            root: {
                '&:nth-of-type(odd)': {
                    backgroundColor: theme.palette.background.default,
                },
            },
        }))(TableRow);

        return (
            <div>

                <TableContainer>

                    <IconButton onClick={this.clickedBeforeIcon.bind(this)}>
                        <NavigateBeforeIcon></NavigateBeforeIcon>
                    </IconButton>
                    {this.state.date.getFullYear()}년 {this.state.date.getMonth() + 1}월
                <IconButton onClick={this.clickedNextIcon.bind(this)}>
                        <NavigateNextIcon></NavigateNextIcon>
                    </IconButton>

                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell>위치</StyledTableCell>
                                <StyledTableCell align="right">제목</StyledTableCell>
                                <StyledTableCell align="right">시작일</StyledTableCell>
                                <StyledTableCell align="right">종료일</StyledTableCell>
                                <StyledTableCell align="right">상태</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.advertisements.map(ad => (
                                <StyledTableRow key={ad.id}>
                                    <StyledTableCell component="th" scope="ad">
                                        {ad.id}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="ad">
                                        {ad.ad_type}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{ad.title}</StyledTableCell>
                                    <StyledTableCell align="right">{ad.start_time}</StyledTableCell>
                                    <StyledTableCell align="right">{ad.end_time}</StyledTableCell>
                                    <StyledTableCell align="right">{ad.state}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }

}

export default ListAd;