import React, {createRef, Component} from 'react';
import Advert from './Advert/Advert'
import Modal from './Modal/Modal'
import Preloader from './Preloader/Preloader'
import './App.css';

import axios from 'axios';

class App extends Component {
    state = {
        currentLang: window.lang || new URL(window.location.href).searchParams.get("lang") || 'ua',
        locale: null,
        advert: {},
        postId: '10001',
        showResponse: false,
        item: '',
        lat: '',
        lng: '',
        isShowModal: false
    }

    componentDidMount() {
        this.getLangFromBase()
        this.getAdvertFromBase()
    }

    getLangFromBase = () => {
        axios
            .get(`https://www.luckfind.me/api/v1/locales/?lang=${this.state.currentLang}`)
            .then(response => {
                if (response.data) {
                    this.setState({
                        locale: JSON.parse(response.data)
                    });
                } else {
                    throw new Error("Locales not found");
                }
            })
        .catch(error => {
            console.warn("There is an API error");
        })
    }

    getAdvertFromBase = () => {
        let id = new URL(window.location.href).searchParams.get("id");
        this.setState({
            postId: id,
        });
        axios.get(`https://www.luckfind.me/api/v1/items/?id=${id}`)
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
                }
            )
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

        if (!this.state.locale) return <Preloader/>;
        if (!this.state.locale && !this.state.postId) return <Preloader/>;

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
