import {io} from 'socket.io-client'
export const socket = io("https://paintio-server2.herokuapp.com/", {transports: [ "websocket" ]});
