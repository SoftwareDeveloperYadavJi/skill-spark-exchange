import { io } from "socket.io-client";

class WebSocketService {
    constructor() {
        this.socket = null;
    }

    // Initialize the WebSocket connection
    connect(token) {
        this.socket = io("ws://localhost:4000", {
            auth: {
                token,
            },
        });

        // Event handlers
        this.socket.on("connect", () => {
            console.log("WebSocket connected:", this.socket.id);
        });

        this.socket.on("disconnect", () => {
            console.log("WebSocket disconnected.");
        });

        this.socket.on("receive_message", (message) => {
            console.log("New message received:", message);
        });

        this.socket.on("user_typing", (data) => {
            console.log(`${data.userId} is typing...`);
        });
    }

    // Send a message
    sendMessage(message) {
        if (this.socket) {
            this.socket.emit("sendmessage", message);
        } else {
            console.error("WebSocket is not connected.");
        }
    }

    // Notify typing status
    notifyTyping(data) {
        if (this.socket) {
            this.socket.emit("typingstart", data);
        } else {
            console.error("WebSocket is not connected.");
        }
    }

    // Disconnect the WebSocket
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}

const websocketService = new WebSocketService();
export default websocketService;
