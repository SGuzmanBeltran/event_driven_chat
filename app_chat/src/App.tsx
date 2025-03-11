import Chat from "./Chat";
import { ThemeProvider } from "./components/ThemeProvider";
import io from "socket.io-client";
import useChatStore from "./stores/chat.store";
// App.js
import { useEffect } from "react";

const App = () => {
	const { addMessage, setSocket } = useChatStore();

	useEffect(() => {
		// Connect to the Socket.IO server (adjust URL as necessary)
		const socket = io("http://localhost:3000");

		// Optionally, store the socket instance in Zustand
		setSocket(socket);

		// Listen for incoming messages
		socket.on("message", (data) => {
			addMessage(data);
		});

		// Clean up on component unmount
		return () => {
			socket.off("message");
			socket.disconnect();
		};
	}, [addMessage, setSocket]);

	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Chat />
		</ThemeProvider>
	);
};

export default App;
