import React from 'react';
import ReactDOM from 'react-dom';

interface Props {
    value: string,
    onClick: () => void
}

interface State {
    value: string
}

interface ArrayProps {
    squares: Array<any>,
    onClick: (x: number) => void
}

interface History {
    squares: Array<{ square: Array<string> }>,
    stepNumber: number,
    xIsNext: boolean
}

function Square(props: Props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props?.value}
        </button>
    )
}

class Board extends React.Component<ArrayProps, { xIsNext: boolean }> {

    constructor(props: ArrayProps) {
        super(props);
        this.state = {
            xIsNext: true
        }
    }

    renderSquare(i: number) {
        return <Square value={this.props.squares[i]}
                       onClick={() => this.props.onClick(i)}/>;
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component<{}, History> {
    constructor(props: History) {
        super(props);
        this.state = {
            squares: [{square: Array(9).fill(null)}],
            stepNumber: 0,
            xIsNext: true
        }
    }

    render() {
        const history = this.state.squares;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.square);

        const moves = history.map((step, move) => {
            const desc = move ? 'Перейти к ходу #' + move : 'К началу игры'
            return (
                <li>
                    <button key={move} onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        })

        let status;
        if (winner) {
            status = 'Выиграл ' + winner;
        } else {
            status = 'Следующий ход: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.square}
                           onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }

    jumpTo(step: number) {
        this.setState(
            {
                stepNumber: step,
                xIsNext: (step % 2) === 0
            }
        )
    }

    handleClick(i: number) {
        const history = this.state.squares.slice(0, this.state.stepNumber + 1)
        const current = history[this.state.stepNumber]
        const new_squares = current.square.slice()
        if (this.calculateWinner(new_squares) || new_squares[i]) {
            return;
        }
        new_squares[i] = this.state.xIsNext ? 'X' : 'O'
        this.setState(
            {
                squares: history.concat({square: new_squares}),
                stepNumber: history.length,
                xIsNext: !this.state.xIsNext
            })
    }

    calculateWinner(squares: Array<any>) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }
}

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);
