import React, { Component } from 'react';
import Advert from './Advert/Advert'
import Modal from './Modal/Modal'
import Preloader from './Preloader/Preloader'
import RecommendAdverts from './RecommendAdverts/RecommendAdverts'
import './App.css';

import axios from 'axios';

class App extends Component {
    API_URL = 'https://www.luckfind.me/api/v1';

    state = {
        currentLang: window.lang || new URL(window.location.href).searchParams.get("lang") || 'ua',
        locale: null,
        advert: {},
        recommendAdvertsArr: [],
        postId: new URL(window.location.href).searchParams.get("id") || '10001',
        showResponse: false,
        item: '',
        lat: '',
        lng: '',
        isShowModal: false
    }

    componentDidMount() {
        this.getLangFromBase()
        this.getAdvertFromBase()
        this.getRecommendAdvertsFromBase()
    }

    getLangFromBase = () => {
        axios
            .get(`${this.API_URL}/locales/?lang=${this.state.currentLang}`)
            .then(response => {
                if (response.data) {
                    this.setState({
                        locale: JSON.parse(response.data)
                    });
                } else {
                    console.warn("There is an API error");
                }
            })
            .catch(error => {
                console.warn("There is an API error");
            })
    }

    getRecommendAdvertsFromBase = () => {
        axios.get(`${this.API_URL}/related/?id=${this.state.postId}`)
            .then(data => {
                if (data.data.data && Object.keys(data.data.data).length) {
                    this.setState({
                        recommendAdvertsArr: [...data.data.data],
                    })
                }
            })

    }

    getAdvertFromBase = (event) => {
        axios.get(`${this.API_URL}/items/?id=${this.state.postId}`)
            .then(data => {
                if (data.data.data && Object.keys(data.data.data).length) {
                    let lat = '', lng = ''
                    if (data.data.data.coordinates) {
                        lat = data.data.data.coordinates.split(',')[0]
                        lng = data.data.data.coordinates.split(',')[1]
                    }
                
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
            })
            .catch(error => {
                console.warn("There is an API error")
            })
    }

    toggleIsShowModal = () => {
        this.setState(prevState => ({
            isShowModal: !prevState.isShowModal
        }))
    }

    render() {
        if (!this.state.locale || !this.state.postId) return <Preloader/>;

        return (
            <div className="App">
                <Advert
                    langProps={this.state.locale}
                    language={this.state.currentLang}
                    advert={this.state.advert}
                    postId={this.state.postId}
                    someItem={this.state.someItem}
                    showResponse={this.state.showResponse}
                    item={this.state.item}
                    lat={this.state.lat}
                    lng={this.state.lng}
                    toggleIsShowModal={this.toggleIsShowModal}
                />
                {
                    this.state.recommendAdvertsArr.length ? 
                    <RecommendAdverts
                        langProps={this.state.locale}
                        recommendAdvertsArr={this.state.recommendAdvertsArr}
                        language={this.state.currentLang}
                    /> : 
                    null
                }

                <Modal
                    advert={this.state.advert}
                    isShowModal={this.state.isShowModal}
                    toggleIsShowModal={this.toggleIsShowModal}
                />
            </div>
        )
            ;
    }
}

export default App;
