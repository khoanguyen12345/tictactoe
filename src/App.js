import React, { Component } from 'react'
import Board from './components/Board'
import './App.css'
import FacebookLogin from 'react-facebook-login'
import 'bootstrap/dist/css/bootstrap.min.css';

//1. know score
//2. post data
//3. show classmate's data

export default class App extends Component {
  constructor(props){
    super(props)
    this.state={
      username: "Khoa",
      nextPlayer: "X",
      squareList:[
        ['', '', ''],
        ['', '' , ''],
        ['', '', '']
      ], 
      winner: "",
      historyArea:[[
        ['', '', ''],
        ['', '' , ''],
        ['', '', '']
      ]], 
      account: {},
      inHistory: false,
      loggedIn: false,
      timePassed: 0,
      classHighScores: []
    }
  }

  setParentsState=(obj)=>{
    this.setState(obj)
  }

postData = async()=>{
  let data = new URLSearchParams();
    data.append("player", this.state.account.name);
    data.append("score", this.state.timePassed);
    const url = "`http://ftw-highscores.herokuapp.com/tictactoe-dev;`"
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data.toString(),
      json: true,
    });

}

getData = async() =>{
  let url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
  let data = await fetch (url)
  let result = await data.json()
  console.log("result?", result)
  this.setState({classHighScores: result})
}

compare_item(a, b){
  if(a.score < b.score){
          return 1;
  }else if(a.score > b.score){
          return -1;
  }else{
          return 0;
  }
}

otherPeopleArray = (array)=>{
  let resultArray = []
  
  let mapArray = array.items.sort(this.compare_item)
  mapArray.map(item=>{
    resultArray.push(<li>{item.player}: {item.score}</li>)
  })
  return resultArray;
}

componentDidMount = ()=>{
  this.getData();
}

  render() {
    let responseFacebook = (response) => {
      console.log(response);
      this.setState({account:response});
      this.setState({loggedIn:true})
    }
    if (this.state.loggedIn === false){
    return (
      <div className = "login">   
        <FacebookLogin
        appId="589075275135738"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook}
        />
       </div>
      )
      }else if (this.state.loggedIn === true){
      return (
      <div className = "body">
        <div>
        <h1>Tic Tac Toe</h1>
        <h3>Name: {this.state.account.name}</h3>
        <h3>In history? {this.state.inHistory + false ? "yes (board disabled)":"no"}</h3>
        <h3>Time passed: {this.state.timePassed}</h3>
        <Board nextPlayer = {this.state.nextPlayer} timePassed = {0} winner = {this.state.winner} historyArea = {this.state.historyArea} squareList = {this.state.squareList} setParentsState={this.setParentsState} postData = {this.postData} inHistory = {this.state.inHistory}/>
        </div>
        <div>
        <h3>Other People</h3>
        <ol>{this.otherPeopleArray(this.state.classHighScores)}</ol>
        </div>
      </div>
    )
    }
  }
}
