import React from 'react'
import './CardResponsive.css'
export interface Card {
    ten: string;
    anh: string;
    mota: string;
}
const CardResponsive: React.FC<Card> = ({ ten, anh, mota }) => {

    return (
        <div className='card'>
            <img src={anh} alt={ten} className='avatar' />
            <div className='info'>
                <h2>{ten}</h2>
                <p>{mota}</p>
            </div>
        </div>
    )
}

export default CardResponsive