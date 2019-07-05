import React, { Component } from 'react'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'

export default class Somemap extends Component {
    state = {
        center: {
            lat: this.props.lat || 50.45466,
            lng: this.props.lng || 30.5238,
        },
        marker: {
            lat: this.props.lat || 50.45466,
            lng: this.props.lng || 30.5238,
        },
        zoom: 13,
    }

    render() {

        if(!this.props.lat && !this.props.lng) return null

        return (

            <div className={this.props.classNameProps}>
                <div className="leafletBox">
                    <Map center={[this.state.center.lat, this.state.center.lng]} zoom={this.state.zoom}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker
                            position={[this.state.marker.lat, this.state.marker.lng]}>
                            <Popup minWidth={90}>
                                <span>Перетащите маркер на нужную точку</span>
                            </Popup>
                        </Marker>
                    </Map>
                </div>
            </div>
    )
    }
    }
