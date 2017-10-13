import React from 'react';
import { ChevronLeft, ChevronRight } from 'icons/chevron-icons';

export function NextArrow(props) {
    const { onClick, className } = props;
    return(
        <div className={className} onClick={onClick}>
            <ChevronRight/>
        </div>
    );
}

export function PrevArrow(props) {
    const { onClick, className } = props;
    return(
        <div className={className} onClick={onClick}>
            <ChevronLeft />
        </div>
    );
}