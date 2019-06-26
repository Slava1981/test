import React, {Component} from 'react';
import Response from './Response/Response';
import Map from '../Map/Map';
import axios from 'axios';
import moment from 'moment';

import clock from '../img/clock-regular.svg'

import './Advert.css';

class Advert extends Component {

    state = {
        advert: {},
        postId: '10001',
        showResponse: false,
        item: ''
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
        axios.get(` https://www.luckfind.me/api/v1/items/?id=${this.state.postId}`)
            .then(data => {
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
                    }
                }
            )
        // .catch(error => {
        //     throw new Error("There is an API error")
        // })
    }

    handleChangeState = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
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
                            <div className="post__content-img"><a href="#"><img
                                src={this.state.advert.data.image_uri}
                                alt=""
                                className="post-image"/></a></div>
                            <h2 className="post__content-title">{this.state.advert.data.item}</h2>
                            <p className="post__content-text">{this.state.advert.data.description}</p>
                            {!!this.state.advert.data.reward && <span
                                className="post__content-money">{this.props.langProps.advertReward} {this.state.advert.data.reward}
                                грн.</span>}
                            <span className="post__content-date"><img src={clock} alt=""
                                                                           className="post__content-dateIcon"/> {moment(this.state.advert.data.item_date).format('DD.MM.YYYY')}</span>
                            <div onClick={() => this.toggle('showResponse')}
                                 className={this.state.advert.data.type === 'lost' ? "post-inputBtnGreen" : "post-inputBtnOrange"}>{this.state.advert.data.type === 'lost' ? this.props.langProps.advertButtonFind : this.props.langProps.advertButtonLost}</div>
                        </div>
                        <Map classNameProps={'leaflet-wrapperpost'}
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