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
        adElementId: '10001',
        showResponse: false,
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
        axios.get(`http://api.luckfind.me/v1/adverts/?id=${this.state.adElementId}`)
            .then(data => {
                    if (Object.keys(data.data.data).length) {
                        console.log(data);
                        let lat = data.data.data.coordinates.split(',')[0]
                        let lng = data.data.data.coordinates.split(',')[1]
                        this.setState({
                            advert: {...data.data},
                            lat,
                            lng
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
            <div className="adElement">
                {!!Object.keys(this.state.advert).length &&
                <div className="adElement__container">
                    <span
                        className={this.state.advert.data.type !== 'lost' ? "ribbonGreen" : "ribbonOrange"}>{this.state.advert.data.type !== 'lost' ? this.props.langProps.advertRibbonFind : this.props.langProps.advertRibbonLost}</span>
                    <div
                        className="adElement__container-number">{this.props.langProps.advertNumberText || 'Оголошення #'}
                        <form onSubmit={(event) => {
                            event.preventDefault();
                            this.getAdvertFromBase()
                        }}><input className="adElement-number" name="adElementId"
                                  value={this.state.adElementId}
                                  onChange={event => this.handleChangeState(event)}/>
                        </form>
                    </div>
                    <div className="adElement__content">
                        <div className="adElement__contentBox">
                            <div className="adElement__content-img"><a href="#"><img
                                src={this.state.advert.data.image_uri}
                                alt=""
                                className="adElement-image"/></a></div>
                            <h2 className="adElement__content-title">{this.state.advert.data.item}</h2>
                            <p className="adElement__content-text">{this.state.advert.data.description}</p>
                            {!!this.state.advert.data.reward && <span
                                className="adElement__content-money">{this.props.langProps.advertReward} {this.state.advert.data.reward}
                                грн.</span>}
                            <span className="adElement__content-date"><img src={clock} alt=""
                                                                           className="adElement__content-dateIcon"/> {moment(this.state.advert.data.item_date).format('DD.MM.YYYY')}</span>
                            <div onClick={() => this.toggle('showResponse')}
                                 className={this.state.advert.data.type === 'lost' ? "adElement-inputBtnGreen" : "adElement-inputBtnOrange"}>{this.state.advert.data.type === 'lost' ? this.props.langProps.advertButtonFind : this.props.langProps.advertButtonLost}</div>
                        </div>
                        <Map classNameProps={'leaflet-wrapperAdElement'}
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