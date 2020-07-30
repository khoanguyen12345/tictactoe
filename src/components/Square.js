import React, { Component } from 'react'

export default class Square extends Component {
    setSquareClass = ()=>{
        console.log(this.props.disabled)
        let nameClass = "square";
        if (this.props.disabled === true ||this.props.win === true){
            nameClass = "square disabled"
        }

        return nameClass;
    }
    render() {
        return (
            <div className = {this.setSquareClass()} onClick = {()=>{this.props.selectSquare(this.props.idY,this.props.idX);}}>
                {this.props.value}
            </div>
        )
    }
}
