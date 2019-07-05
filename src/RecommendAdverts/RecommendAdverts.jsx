import React from 'react';
import moment from 'moment';

import './RecommendAdverts.css';

import clock from '../img/clock-regular.svg';
import eye from '../img/eye.svg';

const RecommendAdverts = ({ langProps, recommendAdvertsArr, getAdvertFromBase, language }) => {
    const DOMAIN = 'https://www.luckfind.me'

    return (
        <div className='recommendAdverts'>
            <h2 className="recommendAdverts__title">
                {langProps.advert.recommend.title}
            </h2>

            <div className="recommendAdverts-box">
                {!!recommendAdvertsArr.length && recommendAdvertsArr.map(advert => <div
                    className={advert.type === 'found' ? "recommendAdverts__item borderTop-green" : "recommendAdverts__item borderTop-orange"}
                    key={advert.id}>
                    <div>
                        <div className="recommendAdverts__item-imgBox">
                            <img src={`${DOMAIN}/upload/${advert.image_uri}`}
                                alt=""
                                className="recommendAdverts__item-img"
                            />
                        </div>
                        <h3 className="recommendAdverts__item-title">
                            <a
                                className={advert.type === 'found' ? "advertTitleHref textColor-green" : "advertTitleHref textColor-orange"}
                                href={`${DOMAIN}/${language}/advert.php?id=${advert.id}`}>
                                    {advert.item}
                            </a>
                        </h3>
                        <p className="recommendAdverts__item-text">
                            {advert.description}
                        </p>
                    </div>
                    <div className='recommendAdverts__additionalBox'>
                        {!!advert.meta && <div className="content-tags">
                            {(Object.keys(advert.meta).length ? advert.meta.split(',') : []).map(tag => <a
                                href={`${DOMAIN}/${language}/search.php?q=${tag}`} className='recAdtag'
                                key={`tag ${advert.id} ${tag}`}>{`${tag},`}</a>)}
                        </div>}
                        <span
                            className="recommendAdverts__item-view">
                            <img className='viewImg' src={eye} alt=""/>
                            {advert.views}
                        </span>
                        <span className="recommendAdverts__item-date">
                            <img src={clock} alt="" className="dateIcon"/> 
                            {moment(advert.item_date).format('DD.MM.YYYY')}
                        </span>
                    </div>
                </div>)}
            </div>
        </div>
    )
}

export default RecommendAdverts;