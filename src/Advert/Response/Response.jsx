import React, {Component} from 'react';
import InputMask from 'react-input-mask';

import axios from 'axios';

import './Response.css'

class Response extends Component {

    REG_EXP = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

    AMOUNT_PHONE_NUMBERS = 17

    state = {
        answer: "",
        phoneNumber: "",
        email: "",
        noEmailValidation: false,
        noPhoneValidation: false,
        boxShadow: "",
        value: "",
        isDisabled: false,
        showForm: true,
        sendStatus: null
    };

    handleChangeState = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    };

    emailValidation = (event) => {
        if (event.target.name === 'email') {
            this.setState({
                noEmailValidation: false
            })
        } else if (this.state.email === '' || (this.state.email && this.state.email.match(this.REG_EXP))) {
            this.setState({
                noEmailValidation: false
            })
        } else {
            this.setState({
                noEmailValidation: true
            })
        }
    };

    phoneValidation = (event) => {
        if (event.target.name === 'phoneNumber') {
            this.setState({
                noPhoneValidation: false,
            })
        } else if (this.state.phoneNumber && this.state.phoneNumber.length !== this.AMOUNT_PHONE_NUMBERS) {
            this.setState({
                noPhoneValidation: true,
            })
        } else {
            this.setState({
                noPhoneValidation: false,
            })
        }
    };

    beforeMaskedValueChange = (newState, oldState, userInput) => {
        let {value} = newState;
        let selection = newState.selection;
        let cursorPosition = selection ? selection.start : null;
        // keep minus if entered by user
        if (value.endsWith('-') && userInput !== '-' && !this.state.value.endsWith('-')) {
            if (cursorPosition === value.length) {
                cursorPosition--;
                selection = {start: cursorPosition, end: cursorPosition};
            }
            value = value.slice(0, -1);
        }
        return {
            value,
            selection
        };
    };

    boxShadow = (event) => {
        this.setState({
            boxShadow: event.target.dataset.name
        })
    };

    sendResponse = () => {
        axios.post('https://www.luckfind.me/api/v1/secret/', {
            id: this.props.advert.data.id,
            answer: this.state.answer,
            email: this.state.email,
            phone: this.state.phoneNumber
        })
        .then(response => {
            this.setState({
                showForm: false,
                sendStatus: true
            });
        });

        this.setState({
            isDisabled: true
        });
    };

    render() {
        if (this.state.sendStatus) return this.props.langProps.control.response;
        
        if (!this.state.showForm || !this.props.advert.data.hasAdditional) return null;

        console.log(this.props.advert);

        return (
            <div className="response"
                 onClick={(event) => {
                     this.boxShadow(event);
                     this.emailValidation(event);
                     this.phoneValidation(event)
                 }}>

                <div className="response__question">
                    {this.props.langProps.control.title} : <span>{this.props.langProps.control[this.props.advert.data.hasAdditional] ? this.props.langProps.control[this.props.advert.data.hasAdditional] : this.props.advert.data.additionalQuestion}</span>
                </div>
                <div className="response__answer">
                    <div className="response-inputWrapper">
                        <input className={this.state.boxShadow === 'answer' ? 'response-input response-inputBoxShadow' : "response-input"}
                               onChange={event => this.handleChangeState(event)}
                               type="text"
                               name='answer'
                               data-name="answer"
                               placeholder={this.props.langProps.advert.response.text}
                        />
                    </div>
                </div>
                <div className="response__phone">
                    <div className="response-inputWrapper">
                        <InputMask mask="+38(999)999-99-99"
                            maskChar={null}
                            defaultValue={this.state.phoneNumber}
                            onChange={event => this.handleChangeState(event)}
                            beforeMaskedValueChange={this.beforeMaskedValueChange}
                            placeholder="+38 (___) ___-__-__"
                            className={this.state.boxShadow === 'phone' ? 'response-input response-inputBoxShadow' : "response-input"}
                            name='phoneNumber'
                            data-name="phone"
                        />
                    </div>
                </div>
                <div className="response__email">
                    <div className="response-inputWrapper">
                        <input
                            className={this.state.boxShadow === 'email' ? 'response-input response-inputBoxShadow' : "response-input"}
                            data-name="email" type="email"
                            name="email"
                            value={this.state.email}
                            onChange={e => this.handleChangeState(e)}
                            placeholder={this.props.langProps.step2.emailPlaceHolder}/>
                    </div>
                </div>
                    <button 
                        disabled={this.state.isDisabled || this.state.phoneNumber.length !== this.AMOUNT_PHONE_NUMBERS || !this.state.email.match(this.REG_EXP) || !this.state.answer}
                        className={this.props.advert === 'lost' ? "response-btn response-btnGreen" : "response-btn response-btnOrange"}
                        onClick={(e) => this.sendResponse(e)}>
                    
                        {this.props.langProps.advert.response.button}
                    </button>
            </div>
        )
    }
}

export default Response;