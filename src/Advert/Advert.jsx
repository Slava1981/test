import React, {Component} from 'react';
import Response from './Response/Response';
import ResponseForAnimal from './Response/ResponseForAnimal';
import Map from '../Map/Map';
import moment from 'moment';

import clock from '../img/clock-regular.svg';
import eye from '../img/eye.svg';
import money from '../img/money.svg';

import './Advert.css';

class Advert extends Component {

    KEYWORD_URL = 'https://www.luckfind.me'

    state = {
        showResponse: false,
    };


    toggle = (clas) => {
        this.setState(prevState => ({
            [clas]: !prevState[clas]
        }))
    }

    render() {

        if (!this.props.advert) return <p className="post-checkingAdvert">
            {this.props.langProps.advert.noresults}
        </p>

        if (!this.props.advert.data) return null

        let type = this.props.advert.data.hasAdditional

        const tagArr = Object.keys(this.props.advert).length ? this.props.advert.data.meta.split(',') : []
        const textAdvert = Object.keys(this.props.advert).length ? this.props.advert.data.description.replace(/(https:\/\/[.\w/=&?]+)/gi, "") : ""
        const href = Object.keys(this.props.advert).length && this.props.advert.data.description.match(/(https:\/\/[.\w/=&?]+)/gi) ? this.props.advert.data.description.match(/(https:\/\/[.\w/=&?]+)/gi)[0] : ""
        let key = 1

        return (
            <div className="post">
                {!!Object.keys(this.props.advert).length &&
                <div className="post__container">
                    <div
                        className="post__container-number">
                        <span
                            className={this.props.advert.data.type !== 'lost' ? "ribbonGreen" : "ribbonOrange"}>{this.props.advert.data.type !== 'lost' ? this.props.langProps.advertRibbonFind : this.props.langProps.advertRibbonLost}</span>
                        <span className="post_number">
                            {this.props.langProps.advert.title}
                            &nbsp;
                            {this.props.postId}
                        </span>
                    </div>
                    <div className="post__content">
                        <div className="post__contentBox">
                            <div className="post__content-img"><img
                                src={this.props.advert.data.image_uri}
                                alt=""
                                onClick={this.props.toggleIsShowModal}
                                className="post-image"/></div>
                            <h2 className="post__content-title">{this.props.advert.data.item || this.props.advert.data.user_item}</h2>
                            <p className="post__content-text">{textAdvert}<a className='hrefInText'
                                                                             href={href}>{href}</a></p>
                            {!!this.props.advert.data.meta && <div className="post__content-tags">
                                {tagArr.map(tag => <a
                                    href={`${this.KEYWORD_URL}/${this.props.language}/search.php?q=${tag}`}
                                    className='tag' key={++key + 1 + 'tag'}>{`${tag},`}</a>)}
                            </div>}
                            {!!this.props.advert.data.reward && <span
                                className="post__content-money">
                                <img
                                    src={money}
                                    alt=""
                                    className="post__content-moneyIcon"
                                />
                                {this.props.advert.data.reward}
                                &nbsp;{this.props.langProps.advert.currency}</span>}
                            {!!this.props.advert.data.views && <span
                                title={this.props.langProps.advert.views}
                                className="post__content-money">
                                    <img
                                        className='viewImg'
                                        src={eye}
                                        alt=""
                                    />
                                {this.props.advert.data.views}
                                </span>
                            }
                            <span className="post__content-date">
                                <img
                                    src={clock}
                                    alt=""
                                    className="post__content-dateIcon"
                                />
                                {moment(this.props.advert.data.item_date).format('DD.MM.YYYY')}
                            </span>
                            {this.props.advert.data.hasAdditional !== null &&
                            <div onClick={() => this.toggle('showResponse')}
                                 className={this.props.advert.data.type === 'lost' ? "post-inputBtnGreen" : "post-inputBtnOrange"}>{this.props.advert.data.type === 'lost' ? this.props.langProps.advertButtonFind : this.props.langProps.advertButtonLost}</div>
                            }
                        </div>
                        <Map classNameProps={'leaflet-wrapperPost'}
                             lat={this.props.lat}
                             lng={this.props.lng}/>
                    </div>
                    {
                        this.state.showResponse && type !== 'animal' &&
                        <Response
                            langProps={this.props.langProps}
                            advert={this.props.advert}
                        />
                    }
                    {
                        this.state.showResponse && type === 'animal' &&
                            <ResponseForAnimal
                                langProps={this.props.langProps}
                                advert={this.props.advert}/>
                    }
                </div>}
            </div>
        )
    }
}

export default Advert;
