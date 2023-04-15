import React, { useEffect } from 'react';
import '../styles/dateSelectors.css';

const DateSelectorEnd = (props) => {
    
    let check_out_date = props.endDate.toLocaleDateString().split(/\//);
    check_out_date = [check_out_date[2], check_out_date[1], check_out_date[0]].join('-');


    useEffect(() => {

    }, [props.endDate, props.handleCheckOutDate])
    return (
        <div className='box'>
            <input type="date" value={check_out_date} onChange={(e) => props.handleCheckOutDate(e.target.value)} min={check_out_date} />
        </div>
    );
};

export default DateSelectorEnd;
