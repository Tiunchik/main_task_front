import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const ws = new WebSocket('ws://localhost:8080/subscribe');

ws.addEventListener('open', function open() {
    ws.send('{"tableName":"films_changed"}');
    console.log('Connection to server established')
});

class MainTable extends React.Component<{ socket: WebSocket }, { dataList: string }> {

    constructor(props: { socket: WebSocket }) {
        super(props);
        this.state = {dataList: '{"none":"text"}'}
        this.props.socket.addEventListener('message', (data) => {
            console.log("received element " + data)
            this.setState({dataList: data.data})
        } )
    }

    render() {
        return (<div>{this.state.dataList}</div>);
    }
}

// ========================================

ReactDOM.render(
    <MainTable socket={ws}/>,
    document.getElementById('root')
);
