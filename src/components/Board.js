import React, { Component } from 'react'
import Square from './Square'
import Button from 'react-bootstrap/Button';

export default class Board extends Component {
    constructor(props){
        super(props)
        this.state={
          winner: "",
          timeStart: 1,
          firstClick: true,
        }
      }
      
      selectSquare = (y,x)=>{
        if (this.state.firstClick === true){
            this.setState({timeStart: Date.now()})
            this.setState({firstClick: false})
        }
        let boardArray = this.props.squareList.slice().map(row => row.slice())
        if (boardArray[x][y]===""){
        if (this.props.nextPlayer === "X"){    
            boardArray[x][y] = "X"
            this.props.setParentsState({squareList:boardArray});
            this.props.setParentsState({nextPlayer: "O"})
        }else if (this.props.nextPlayer === "O"){    
            boardArray[x][y] = "O"
            this.props.setParentsState({squareList:boardArray});
            this.props.setParentsState({nextPlayer: "X"})
        } 
           let history = this.props.historyArea.slice();
            console.log(history)
            this.props.setParentsState({historyArea: [...history, boardArray]})    
    }
    }
    
    checkWin = (x,y)=>{
        let array = this.props.squareList;
        for (let i = 0;i<3;i++){ 
            if(array[i].every(item => item === array[i][0] && item !== "")){
                this.setState({winner:array[i][0]})
                this.props.postData()
                this.props.setParentsState({timePassed: (Date.now() - this.state.timeStart)/1000})
            }else if (array[0][i] === array[1][i] && array[0][i]===array[2][i] && array[0][i] !== "") {
                this.setState({winner:array[0][i]})
                this.props.postData()
                this.props.setParentsState({timePassed:(Date.now() - this.state.timeStart)/1000})
            }
            else if (array[0][0]===array[1][1] && array[2][2]===array[0][0] && array[0][0] !== "") {
                this.setState({winner:array[0][0]})
                this.props.postData()
                this.props.setParentsState({timePassed: (Date.now() - this.state.timeStart)/1000})
            }
            else if (array[0][2] === array[1][1] && array[0][2]===array[2][0] && array[0][2] !== "") {
                this.setState({winner:array[0][2]})
                this.props.setParentsState({timePassed: (Date.now() - this.state.timeStart)/1000})
                this.props.postData()
            }
            else if(array[0][0] !==""&&array[1][0] !==""&&array[2][0] !==""&&array[0][1] !==""&&array[1][1] !==""&&array[2][1] !==""&&array[0][2] !==""&&array[1][2] !==""&&array[2][2] !==""){
                this.setState({winner:"Game Over"})
                this.props.postData()
                this.props.setParentsState({timePassed: (Date.now() - this.state.timeStart)/1000})
                this.props.postData()
            }
        
    }}

    recoverHistory = (turnNumber) =>{
        let resultArray = this.props.historyArea[turnNumber]
        this.props.setParentsState({squareList:resultArray})
    }

    historyAreaButtons = ()=>{
        let resultButtons=[];
        for(let i = 0;i<this.props.historyArea.length;i++) {
            resultButtons.push(<Button variant="primary" onClick = {()=>{console.log(i);this.recoverHistory(i);this.props.setParentsState({inHistory: true})}}>Go to {i}</Button>)
        }
        return resultButtons;
    }

    backToCurrent = ()=>{
        let resultArray = this.props.historyArea[this.props.historyArea.length-1]
        this.props.setParentsState({squareList:resultArray})
        this.props.setParentsState({inHistory: false})
    }

    render() {
        if (this.state.winner === ""){
            this.checkWin (0,0)
            this.checkWin (0,2)
            this.checkWin (2,0)
            this.checkWin (2,2)
        return (
            <div>
            <h3>next player {this.props.nextPlayer}</h3>
                <div style={{display:"flex"}}>
                <Square idX = {0}
                idY = {0} 
                disabled = {this.props.inHistory}
                selectSquare = {this.selectSquare}
                checkWin = {this.checkWin}
                value = {this.props.squareList[0][0]}
                win = {false}
                />
                <Square id = {1} 
                idX = {0}
                idY = {1} 
                disabled = {this.props.inHistory}
                selectSquare = {this.selectSquare}
                checkWin = {this.checkWin}
                value = {this.props.squareList[0][1]}
                win = {false}/>
                <Square id = {2} 
                idX = {0}
                idY = {2} 
                disabled = {this.props.inHistory}
                selectSquare = {this.selectSquare}
                checkWin = {this.checkWin}
                value = {this.props.squareList[0][2]}
                win = {false}/>
                </div>
                <div style={{display:"flex"}}>
                <Square id = {3} 
                idX = {1}
                idY = {0} 
                disabled = {this.props.inHistory}
                selectSquare = {this.selectSquare}
                checkWin = {this.checkWin}
                value = {this.props.squareList[1][0]}
                win = {false}/>
                <Square id = {4} 
                idX = {1}
                idY = {1} 
                disabled = {this.props.inHistory}
                selectSquare = {this.selectSquare}
                checkWin = {this.checkWin}
                value = {this.props.squareList[1][1]}
                win = {false}/>
                <Square id = {5} 
                idX = {1}
                idY = {2} 
                disabled = {this.props.inHistory}
                selectSquare = {this.selectSquare}
                checkWin = {this.checkWin}
                value = {this.props.squareList[1][2]}
                win = {false}/>
                </div>
                <div style={{display:"flex"}}>
                <Square id = {6} 
                idX = {2}
                idY = {0} 
                disabled = {this.props.inHistory}
                selectSquare = {this.selectSquare}
                checkWin = {this.checkWin}
                value = {this.props.squareList[2][0]}
                win = {false}/>
                <Square id = {7} 
                idX = {2}
                idY = {1} 
                disabled = {this.props.inHistory}
                selectSquare = {this.selectSquare}
                checkWin = {this.checkWin}
                value = {this.props.squareList[2][1]}
                win = {false}/>
                <Square id = {8} 
                idX = {2}
                idY = {2} 
                disabled = {this.props.inHistory}
                selectSquare = {this.selectSquare}
                checkWin = {this.checkWin}
                value = {this.props.squareList[2][2]}
                win = {false}/>
                </div>
                {this.historyAreaButtons()}
                <Button variant="success" onClick = {()=>{this.backToCurrent();}}>Back To Current</Button>
            </div>
            
        )
        }else if (this.state.winner === "Game Over"){
            return(
            <div>
            <h3>{this.state.winner}</h3>
                <div style={{display:"flex"}}>
                <Square idX = {0}
                idY = {0} 
                selectSquare = {this.selectSquare}
                checkWin = {this.checkWin}
                value = {this.props.squareList[0][0]}
                win = {true}
                />
                <Square id = {1} 
                idX = {0}
                idY = {1} 
                selectSquare = {this.selectSquare}
                checkWin = {this.checkWin}
                value = {this.props.squareList[0][1]}
                win = {true}/>
                <Square id = {2} 
                idX = {0}
                idY = {2} 
                selectSquare = {this.selectSquare}
                checkWin = {this.checkWin}
                value = {this.props.squareList[0][2]}
                win = {true}/>
                </div>
                <div style={{display:"flex"}}>
                <Square id = {3} 
                idX = {1}
                idY = {0} 
                selectSquare = {this.selectSquare}
                checkWin = {this.checkWin}
                value = {this.props.squareList[1][0]}
                win = {true}/>
                <Square id = {4} 
                idX = {1}
                idY = {1} 
                selectSquare = {this.selectSquare}
                checkWin = {this.checkWin}
                value = {this.props.squareList[1][1]}
                win = {true}/>
                <Square id = {5} 
                idX = {1}
                idY = {2} 
                selectSquare = {this.selectSquare}
                checkWin = {this.checkWin}
                value = {this.props.squareList[1][2]}
                win = {true}/>
                </div>
                <div style={{display:"flex"}}>
                <Square id = {6} 
                idX = {2}
                idY = {0} selectSquare = {this.selectSquare}
                checkWin = {this.checkWin}
                value = {this.props.squareList[2][0]}
                win = {true}/>
                <Square id = {7} 
                idX = {2}
                idY = {1} selectSquare = {this.selectSquare}
                checkWin = {this.checkWin}
                value = {this.props.squareList[2][1]}
                win = {true}/>
                <Square id = {8} 
                idX = {2}
                idY = {2} selectSquare = {this.selectSquare}
                checkWin = {this.checkWin}
                value = {this.props.squareList[2][2]}
                win = {true}/>
                </div>
                {this.historyAreaButtons()}
                <Button variant="success" onClick = {()=>{this.backToCurrent();}}>Back To Current</Button>
            </div>
            );    
    }else if (this.state.winner === "X" || this.state.winner === "O"){
        return(
        <div>
        <h3>winner {this.state.winner}</h3>
            <div style={{display:"flex"}}>
            <Square idX = {0}
            idY = {0} 
            selectSquare = {this.selectSquare}
            checkWin = {this.checkWin}
            value = {this.props.squareList[0][0]}
            win = {true}
            />
            <Square id = {1} 
            idX = {0}
            idY = {1} 
            selectSquare = {this.selectSquare}
            checkWin = {this.checkWin}
            value = {this.props.squareList[0][1]}
            win = {true}/>
            <Square id = {2} 
            idX = {0}
            idY = {2} 
            selectSquare = {this.selectSquare}
            checkWin = {this.checkWin}
            value = {this.props.squareList[0][2]}
            win = {true}/>
            </div>
            <div style={{display:"flex"}}>
            <Square id = {3} 
            idX = {1}
            idY = {0} 
            selectSquare = {this.selectSquare}
            checkWin = {this.checkWin}
            value = {this.props.squareList[1][0]}
            win = {true}/>
            <Square id = {4} 
            idX = {1}
            idY = {1} 
            selectSquare = {this.selectSquare}
            checkWin = {this.checkWin}
            value = {this.props.squareList[1][1]}
            win = {true}/>
            <Square id = {5} 
            idX = {1}
            idY = {2} 
            selectSquare = {this.selectSquare}
            checkWin = {this.checkWin}
            value = {this.props.squareList[1][2]}
            win = {true}/>
            </div>
            <div style={{display:"flex"}}>
            <Square id = {6} 
            idX = {2}
            idY = {0} selectSquare = {this.selectSquare}
            checkWin = {this.checkWin}
            value = {this.props.squareList[2][0]}
            win = {true}/>
            <Square id = {7} 
            idX = {2}
            idY = {1} selectSquare = {this.selectSquare}
            checkWin = {this.checkWin}
            value = {this.props.squareList[2][1]}
            win = {true}/>
            <Square id = {8} 
            idX = {2}
            idY = {2} selectSquare = {this.selectSquare}
            checkWin = {this.checkWin}
            value = {this.props.squareList[2][2]}
            win = {true}/>
            </div>
            {this.historyAreaButtons()}
            <Button variant="success" onClick = {()=>{this.backToCurrent();}}>Back To Current</Button>
        </div>
        );    
}
    }
}
