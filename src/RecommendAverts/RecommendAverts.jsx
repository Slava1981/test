import React from 'react';
import moment from 'moment';

import './RecommendAverts.css';

import clock from '../img/clock-regular.svg';
import eye from '../img/eye.svg';

const RecommendAverts = ({langProps, recommendAdvertsArr, getAdvertFromBase, language}) => {
    const KEYWORD_URL = 'https://www.luckfind.me'
    let key = 1
    let i = 1
    let hrefUpload = 'https://luckfind.me/upload/'

    return (
        <div className='recommendAverts'>
            <h2 className="recommendAverts__title">Схожi повiдомлення</h2>
            <div className="recommendAverts-box">
                {!!recommendAdvertsArr.length && recommendAdvertsArr.map(advert => <div
                    className={advert.type === 'found' ? "recommendAverts__item borderTop-green" : "recommendAverts__item borderTop-orange"}
                    key={++i + 1 + 'recommendAd'}
                    id={advert.id}>
                    <div>
                        <div className="recommendAverts__item-imgBox"><img src={hrefUpload + advert.image_uri}
                                                                           alt="Фото"
                                                                           className="recommendAverts__item-img"/></div>
                        <h3 className="recommendAverts__item-title"><a
                            className={advert.type === 'found' ? "advertTitleHref textColor-green" : "advertTitleHref textColor-orange"}
                            href={`${KEYWORD_URL}/${language}/search.php?q=${advert.item}`}>{advert.item}</a></h3>
                        <p className="recommendAverts__item-text">{[...advert.description].length > 110 ? [...advert.description].slice(0, 90).join('') + ' ...' : advert.description}</p>
                    </div>
                    <div className='recommendAverts__additionalBox'>
                        {!!advert.meta && <div className="content-tags">
                            {(Object.keys(advert.meta).length ? advert.meta.split(',') : []).map(tag => <a
                                href={`${KEYWORD_URL}/${language}/search.php?q=${tag}`} className='recAdtag'
                                key={++key + 1 + 'tagRecAd'}>{`${tag},`}</a>)}
                        </div>}
                        <span
                            className="recommendAverts__item-view"><img className='viewImg' src={eye}
                                                                        alt=""/>{advert.views}</span>
                        <span className="recommendAverts__item-date"><img src={clock} alt=""
                                                                          className="dateIcon"/> {moment(advert.item_date).format('DD.MM.YYYY')}</span>
                    </div>
                </div>)}
            </div>
        </div>
    )
}

export default RecommendAverts;