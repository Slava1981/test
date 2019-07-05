import React from 'react';

import backImage from '../img/modal-close.svg';

import './Modal.css'

export default class Modal extends React.Component {

    render() {
        if (!this.props.isShowModal) return null;

        return (
            <div className="modalImg">
                <div className="modalImg__boxImg">
                    <div className="wrapperImg">
                    <img 
                        src={this.props.advert.data.image_uri}
                        className="modalImg__img"
                        alt="" />

                    <img
                        className='modalImg__close'
                        onClick={this.props.toggleIsShowModal}
                        src={backImage}
                        alt="close modalImg"
                    />
                    </div>
                </div>
            </div>
        )
    }
}
