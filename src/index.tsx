import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import  './websocket';


interface WsProps {
    socket: WebSocket
}

interface State {
    dataList: string
}

const ws = new WebSocket('ws://localhost:8080/films/subscribe');

ws.addEventListener('open', function open() {
    ws.send('establishing connection');
    console.log('Connection to server established')
});

class MainTable extends React.Component<WsProps,State> {

    constructor(props: WsProps) {
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
