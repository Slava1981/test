import React, {Component} from 'react';
import Response from './Response/Response';
import Map from '../Map/Map';
import axios from 'axios';
import moment from 'moment';

import clock from '../img/clock-regular.svg'

import './Advert.css';

class Advert extends Component {

    CHECKING_ADVERT_TEXT = 'Оголошення перевіряється модератором'

    state = {
        advert: {},
        postId: '10001',
        showResponse: false,
        item: '',
        lat: '',
        lng: ''
    };

    componentDidMount() {
        this.getAdvertFromBase()
    }

    toggle = (clas) => {
        this.setState(prevState => ({
            [clas]: !prevState[clas]
        }))
    }

    getAdvertFromBase = () => {
        let id = window.location.search.replace('?id=', '');
        this.setState({
            postId: id
        });
        axios.get(` https://www.luckfind.me/api/v1/items/?id=${id}`)
            .then(data => {
                console.log(data.data);
                if (Object.keys(data.data.data).length) {
                        let lat = data.data.data.coordinates.split(',')[0]
                        let lng = data.data.data.coordinates.split(',')[1]
                        let item = data.data.data.item
                    this.setState({
                            advert: {...data.data},
                            lat,
                            lng,
                            item
                        })
                    } else {
                    this.setState({
                        advert: false,
                    })
                    }
                }
            )
        // .catch(error => {
        //     throw new Error("There is an API error")
        // })
    }


    render() {

        if(!this.state.advert) return <p className="post-checkingAdvert">{this.CHECKING_ADVERT_TEXT}</p>

        const tagArr = Object.keys(this.state.advert).length ? this.state.advert.data.meta.split(', ') : []
        const textAdvert = Object.keys(this.state.advert).length ? this.state.advert.data.description.replace(/(https:\/\/[.\w/=&?]+)/gi, "") : ""
        const href = Object.keys(this.state.advert).length ? this.state.advert.data.description.match(/(https:\/\/[.\w/=&?]+)/gi)[0] : ""
        let key = 1

            return (
                <div className="post">
                    {!!Object.keys(this.state.advert).length &&
                    <div className="post__container">
                    <span
                        className={this.state.advert.data.type !== 'lost' ? "ribbonGreen" : "ribbonOrange"}>{this.state.advert.data.type !== 'lost' ? this.props.langProps.advertRibbonFind : this.props.langProps.advertRibbonLost}</span>
                        <div
                            className="post__container-number">{this.props.langProps.advertNumberText || 'Оголошення #'}
                            <span className="post-number">{this.state.postId}</span>
                        </div>
                        <div className="post__content">
                            <div className="post__contentBox">
                                <div className="post__content-img"><img
                                    src={this.state.advert.data.image_uri}
                                    alt=""
                                    className="post-image"/></div>
                                <h2 className="post__content-title">{this.state.advert.data.item}</h2>
                                <p className="post__content-text">{textAdvert}<a className='hrefInText' href={href}>{href}</a></p>
                                {!!this.state.advert.data.meta && <div className="post__content-tags">
                                    <span className='title-tags'>Теги оголошення: </span>
                                    {tagArr.map(tag => <a href="#" className='tag' key={++key + 1 + 'tag'}>{`${tag},`}</a>)}</div>}
                                {!!this.state.advert.data.reward && <span
                                    className="post__content-money">{this.props.langProps.advertReward} {this.state.advert.data.reward}
                                    грн.</span>}
                                <span className="post__content-date"><img src={clock} alt=""
                                                                          className="post__content-dateIcon"/> {moment(this.state.advert.data.item_date).format('DD.MM.YYYY')}</span>
                                <div onClick={() => this.toggle('showResponse')}
                                     className={this.state.advert.data.type === 'lost' ? "post-inputBtnGreen" : "post-inputBtnOrange"}>{this.state.advert.data.type === 'lost' ? this.props.langProps.advertButtonFind : this.props.langProps.advertButtonLost}</div>
                            </div>
                            <Map classNameProps={'leaflet-wrapperPost'}
                                 lat={this.state.lat}
                                 lng={this.state.lng}/>
                        </div>
                        {this.state.showResponse && <Response
                            langProps={this.props.langProps}/>}
                    </div>}
                </div>
            )
    }
}

export default Advert;
