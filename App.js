import React, { Fragment } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

function Square(props) {
  return (
    <TouchableOpacity style={styles.square} onPress={props.onPress}>
      <Text style={styles.jogadas}>{props.value}</Text>
    </TouchableOpacity>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      contEmpate: 0,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      contEmpate: this.state.contEmpate + 1
    });

  }

  reiniciar = () => {
    this.setState({
      squares: Array(9).fill(null),
      contEmpate: 0,
    });
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} onPress={() => this.handleClick(i)} />
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = <Text style={styles.status}>Vencedor {winner}</Text>;
    }else{
      status = <Text style={styles.status}>Vez do : {this.state.xIsNext ? 'X' : 'O'}</Text>;
      if(this.state.contEmpate > 8){
        status = <Text style={styles.status}>Empate</Text>;
      }
    }

    return (
      <View>
        <View style={styles.reiniciarView}>
          <TouchableOpacity style={styles.reiniciar} onPress={this.reiniciar}>
            <Text style={styles.reiniciarText}>reiniciar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.boardRow}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </View>
        <View style={styles.boardRow}>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </View>
        <View style={styles.boardRow}>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </View>
        <View style={styles.statusView}>
          {status}
        </View>
        
      </View>
    );
  }

}

const App = () => {
  return (
    <Fragment>
      <View style={styles.main}>
        <Board />
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({

  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 850,
    backgroundColor: '#e67e22',
  },
  square: {
    borderColor: '#fff',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    width: 110,
    height: 120,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boardRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  jogadas: {
    fontSize: 55,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'sans-serif'
  },
  status: {
    color: '#fff',
    fontSize: 40,
    fontFamily: 'monospace'
  },
  statusView: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: 80,
    alignItems: 'center',

  },
  reiniciar: {
    borderColor: '#fff',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    width: 350,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reiniciarView: {
    width: 330,
    height: 110,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reiniciarText: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'monospace'
  },
});

export default App;
