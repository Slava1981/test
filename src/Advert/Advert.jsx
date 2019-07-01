import React, {Component} from 'react';
import Response from './Response/Response';
import Map from '../Map/Map';
import axios from 'axios';
import moment from 'moment';

import clock from '../img/clock-regular.svg'

import './Advert.css';

class Advert extends Component {

    CHECKING_ADVERT_TEXT = 'Оголошення перевіряється модератором'
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

        if (!this.props.advert) return <p className="post-checkingAdvert">{this.CHECKING_ADVERT_TEXT}</p>

        const tagArr = Object.keys(this.props.advert).length ? this.props.advert.data.meta.split(', ') : []
        const textAdvert = Object.keys(this.props.advert).length ? this.props.advert.data.description.replace(/(https:\/\/[.\w/=&?]+)/gi, "") : ""
        const href = Object.keys(this.props.advert).length && this.props.advert.data.description.match(/(https:\/\/[.\w/=&?]+)/gi) ? this.props.advert.data.description.match(/(https:\/\/[.\w/=&?]+)/gi)[0] : ""
        let key = 1

        return (
            <div className="post">
                {!!Object.keys(this.props.advert).length &&
                <div className="post__container">
                    <span
                        className={this.props.advert.data.type !== 'lost' ? "ribbonGreen" : "ribbonOrange"}>{this.props.advert.data.type !== 'lost' ? this.props.langProps.advertRibbonFind : this.props.langProps.advertRibbonLost}</span>
                    <div
                        className="post__container-number">{this.props.langProps.advertNumberText || 'Оголошення #'}
                        <span className="post-number">{this.props.postId}</span>
                    </div>
                    <div className="post__content">
                        <div className="post__contentBox">
                            <div className="post__content-img"><img
                                src={this.props.advert.data.image_uri}
                                alt=""
                                onClick={this.props.toggleIsShowModal}
                                className="post-image"/></div>
                            <h2 className="post__content-title">{this.props.advert.data.item}</h2>
                            <p className="post__content-text">{textAdvert}<a className='hrefInText'
                                                                             href={href}>{href}</a></p>
                            {!!this.props.advert.data.meta && <div className="post__content-tags">
                                <span className='title-tags'>Теги оголошення: </span>
                                {tagArr.map(tag => <a href={`${this.KEYWORD_URL}/${this.props.language}/search.php?q=${tag}`} className='tag' key={++key + 1 + 'tag'}>{`${tag},`}</a>)}
                            </div>}
                            {!!this.props.advert.data.reward && <span
                                className="post__content-money">{this.props.langProps.advertReward} {this.props.advert.data.reward}
                                грн.</span>}
                            <span className="post__content-date"><img src={clock} alt=""
                                                                      className="post__content-dateIcon"/> {moment(this.props.advert.data.item_date).format('DD.MM.YYYY')}</span>
                            <div onClick={() => this.toggle('showResponse')}
                                 className={this.props.advert.data.type === 'lost' ? "post-inputBtnGreen" : "post-inputBtnOrange"}>{this.props.advert.data.type === 'lost' ? this.props.langProps.advertButtonFind : this.props.langProps.advertButtonLost}</div>
                        </div>
                        <Map classNameProps={'leaflet-wrapperPost'}
                             lat={this.props.lat}
                             lng={this.props.lng}/>
                    </div>
                    {this.state.showResponse && <Response
                        langProps={this.props.langProps}/>}
                </div>}
            </div>
        )
    }
}

export default Advert;
