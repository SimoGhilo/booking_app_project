import React, { useEffect } from 'react';
import { useState } from 'react';

const DateSelectorStart = (props) => {

    useEffect(() => {

    }, [props.startDate, props.handleCheckInDate])
    return (
        <div>
            <input type="date" onChange={(e) => props.handleCheckInDate(e.target.value)} min={props.todaysDate.toISOString().slice(0, 10)} />
        </div>
    );
};

export default DateSelectorStart;