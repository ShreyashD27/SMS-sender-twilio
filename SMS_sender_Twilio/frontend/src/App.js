import React, { useState } from "react";
import axios from "axios";

function App() {
    const [to, setTo] = useState("");
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/send-message", {
                to,
                message,
            });

            if (res.data.success) {
                setResponse("Message sent successfully!");
            } else {
                setResponse("Failed to send message.");
            }
        } catch (error) {
            setResponse(`Error: ${error.message}`);
        }
    };

    return (
        <div className="App">
            <h1>Send SMS</h1>
            <form onSubmit={sendMessage}>
                <div>
                    <label>To:</label>
                    <input
                        type="text"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        placeholder="+1234567890"
                        required
                    />
                </div>
                <div>
                    <label>Message:</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Your message here"
                        required
                    />
                </div>
                <button type="submit">Send</button>
            </form>
            {response && <p>{response}</p>}
        </div>
    );
}

export default App;
