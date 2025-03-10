import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import useChatStore from "./stores/chat.store";

const Chat = () => {
	const { messages, socket } = useChatStore();
	const [input, setInput] = useState("");

	const sendMessage = () => {
		if (socket && input.trim()) {
			socket.emit("message", input);
			setInput("");
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			sendMessage();
		}
	};

	return (
		<div className="flex flex-col h-screen">
			<div className="p-4 flex-1 max-w-2xl mx-auto w-full flex flex-col">
				<h2 className="text-2xl font-bold mb-4">Messages</h2>
				<div className="flex-1 overflow-y-auto space-y-4 mb-4">
					<ul className="space-y-2">
						{messages.map((msg, idx) => (
							<li key={idx} className="p-2 bg-secondary rounded-lg">
								{msg}
							</li>
						))}
					</ul>
				</div>
				<div className="flex gap-2">
					<Input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={handleKeyPress}
						placeholder="Type your message..."
						className="flex-1"
					/>
					<Button onClick={sendMessage} size="icon">
						<Send className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Chat;
