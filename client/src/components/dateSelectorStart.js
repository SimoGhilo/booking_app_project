import React, { useEffect } from 'react';
import { useState } from 'react';
import '../styles/dateSelectors.css';

const DateSelectorStart = (props) => {

    useEffect(() => {

    }, [props.startDate, props.handleCheckInDate])
    return (
        <div className='box'>
            <input type="date" value={props.startDate.toISOString().slice(0, 10)} onChange={(e) => props.handleCheckInDate(e.target.value)} min={props.todaysDate.toISOString().slice(0, 10)} />
        </div>
    );
};

export default DateSelectorStart;