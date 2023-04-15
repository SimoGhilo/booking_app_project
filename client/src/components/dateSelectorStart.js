import React, { useEffect } from 'react';
import '../styles/dateSelectors.css';

const DateSelectorStart = (props) => {
    
    let check_in_date = props.startDate.toLocaleDateString().split(/\//);
    check_in_date = [check_in_date[2], check_in_date[1], check_in_date[0]].join('-');

    useEffect(() => {

    }, [props.startDate, props.handleCheckInDate])
    return (
        <div className='box'>
            <input type="date" value={check_in_date} onChange={(e) => props.handleCheckInDate(e.target.value)} min={check_in_date} />
        </div>
    );
};

export default DateSelectorStart;
