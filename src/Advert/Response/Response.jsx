import React, {Component} from 'react';
import InputMask from 'react-input-mask';

import './Response.css'

class Response extends Component {

    state = {
        answer: "",
        phoneNumber: "",
        email: "",
        noEmailValidation: false,
        noPhoneValidation: false,
        boxShadow: "",
        value: ""
    };

    handleChangeState = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    };

    emailValidation = (event) => {
        const regExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
        if (event.target.name === 'email') {
            this.setState({
                noEmailValidation: false
            })
        } else if (this.state.email === '' || (this.state.email && this.state.email.match(regExp))) {
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
        } else if (this.state.phoneNumber && this.state.phoneNumber.length !== 17) {
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


    render() {
        const regExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

        return (
            <div className="response"
                 onClick={(event) => {
                     this.boxShadow(event);
                     this.emailValidation(event);
                     this.phoneValidation(event)
                 }}>
                <div className="response__question">На цьому місці будет контрольне запитання</div>
                <div className="response__answer">
                    <div className="response-inputWrapper">
                        <input className={this.state.boxShadow === 'answer' ? 'response-input response-inputBoxShadow' : "response-input"}
                               onChange={event => this.handleChangeState(event)}
                               type="text"
                               name='answer'
                               data-name="answer"
                               placeholder="Введіть вашу відповідь"
                        />
                    </div>
                    <span className="response-item__text">Ваша відповідь</span>
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
                                   data-name="phone"/>
                    </div>
                    <span
                        className={this.state.noPhoneValidation ? 'response-item__text response-item__textBackGroundRed' : 'response-item__text'}>{this.props.langProps.step2.phoneNumberComment}</span>
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
                    <span
                        className={this.state.noEmailValidation ? "response-item__text response-item__textBackGroundRed" : "response-item__text"}>{this.props.langProps.step2.emailComment}</span>
                </div>
                {
                    (this.state.phoneNumber.length === 17 ||
                    this.state.email.match(regExp)) &&
                    this.state.answer ?

                        <button className="response-btn"
                                onClick={(e) => this.sendResponse(e)}>{this.props.langProps.sendButton}
                        </button> :
                        <button className="response-btnOpacity">Надіслати</button>}
            </div>
        )
    }
}

export default Response;