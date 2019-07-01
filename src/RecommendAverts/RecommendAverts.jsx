import React from 'react';

import './RecommendAverts.css';

const RecommendAverts = ({langProps, recommendAdvertsArr, getAdvertFromBase}) => {
    let i = 1
    let href = 'https://luckfind.me/upload/'
    let altHref = 'https://luckfind.me/upload/no-image-available.png'
    return (
        <div className='recommendAverts'>
            {!!recommendAdvertsArr.length && recommendAdvertsArr.map(advert => <div
                className={advert.type === 'found' ? "recommendAverts__item borderTop-green" : "recommendAverts__item borderTop-orange"}
                key={++i + 1 + 'recommendAd'}
                id={advert.id}>
                <div className="recommendAverts__item-imgBox"><img src={href + advert.image_uri} alt="Фото"
                                                                   className="recommendAverts__item-img"/></div>
                <h3 className={advert.type === 'found' ? "recommendAverts__item-title textColor-green" : "recommendAverts__item-title textColor-orange"}>{advert.item}</h3>
                <p className="recommendAverts__item-text">{advert.description}</p>
            </div>)}
        </div>
    )
}

export default RecommendAverts;