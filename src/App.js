import React, {createRef, Component} from 'react';
import Advert from './Advert/Advert'
import './App.css';

import axios from 'axios';

class App extends Component {
    state = {
        currentLang: new URL(window.location.href).searchParams.get("lang") || 'ua',
        locale: null,
        addFind: new URL(window.location.href).searchParams.get("type") === "found",
        addLost: new URL(window.location.href).searchParams.get("type") === "lost",
        advert: true,
    }

    componentDidMount() {
        axios
            .get(`https://www.luckfind.me/api/v1/locales/?lang=${this.state.currentLang}`)
            .then(response => {
                console.log(response.data)
                    if (response.data) {
                    this.setState({
                        locale: JSON.parse(response.data)
                    });
                } else {
                    throw new Error("Locales not found");
                }
            })
        // .catch(error => {
        //     throw new Error("There is an API error");
        // })
    }
    
    handleChange = (event) => {
        let value = event.target.value
        this.setState({
            address: event.target.value,
        })

    }
    
    render() {
        if (!this.state.locale) return null;

        return (
            <div className="App">
                <Advert
                langProps={this.state.locale}/>
            </div>
        )
            ;
    }
}

export default App;
