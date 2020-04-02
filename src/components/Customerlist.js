import React, { useState, useEffect, forwardRef } from 'react';
import MaterialTable from "material-table";
import { Search, ChevronRight, ChevronLeft, FirstPage, LastPage, Clear, ArrowDownward, } from '@material-ui/icons/';
import AddBoxIcon from '@material-ui/icons/AddBox';

export default function Customerlist() {
    const tableIcons = {
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        AddBox: forwardRef((props, ref) => <AddBoxIcon {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />)
    }

    const [customers, setCustomers] = useState([]);
    
    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }

    const columns = [
        {
            title: 'First name',
            field: 'firstname'
        },
        {
            title: 'Last name',
            field: 'lastname'
        },
        {
            title: 'Email',
            field: 'email'
        },
        {
            title: 'Phone',
            field: 'phone'
        },
        {
            title: 'Address',
            field: 'streetaddress'
        },
        {
            title: 'Postcode',
            field: 'postcode'
        },
        {
            title: 'City',
            field: 'city'
        },
    ]

    return (
        <div>
            <MaterialTable 
                data={customers}
                columns={columns}
                icons={tableIcons}
                title="Customers"
                actions={[
                    {
                        icon: 'AddBoxIcon',
                        tooltip: 'Add a customer',
                        isFreeAction: true,
                        onClick: (event) => alert("You want to add a customer")
                    }
                ]}
            />
        </div>
    );
}