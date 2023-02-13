import React, { useEffect } from 'react';
import '../styles/dateSelectors.css';

const DateSelectorEnd = (props) => {


    useEffect(() => {

    }, [props.endDate, props.handleCheckOutDate])
    return (
        <div className='box'>
            <input type="date" value={props.endDate.toISOString().slice(0, 10)} onChange={(e) => props.handleCheckOutDate(e.target.value)} min={props.tomorrow.toISOString().slice(0, 10)} />
        </div>
    );
};

export default DateSelectorEnd;