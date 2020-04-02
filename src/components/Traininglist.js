import React, { useState, useEffect, forwardRef } from 'react';
import MaterialTable from "material-table";
import { Search, ChevronRight, ChevronLeft, FirstPage, LastPage, Clear, ArrowDownward } from '@material-ui/icons/';
import moment from 'moment';

export default function Traininglist() {
    const tableIcons = {
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />)
    }

    const [trainings, setTrainings] = useState([]);
    
    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
    }

    const columns = [
        {
            title: 'Activity',
            field: 'activity'
        },
        {
            title: 'Date',
            field: 'date'
        },
        {
            title: 'Duration (min)',
            field: 'duration'
        },
        {
            title: 'Customer',
            field: 'customer.firstname'
        },
    ]

    return (
        <div>
            <MaterialTable data={trainings} columns={columns} icons={tableIcons} title="Trainings" />
        </div>
    );
}