import React, { useEffect } from 'react';
import { useState } from 'react';

const DateSelectorEnd = (props) => {


    useEffect(() => {

    }, [props.endDate, props.handleCheckOutDate])
    return (
        <div>
            <input type="date" onChange={(e) => props.handleCheckOutDate(e.target.value)} min={props.tomorrow.toISOString().slice(0, 10)} />
        </div>
    );
};

export default DateSelectorEnd;