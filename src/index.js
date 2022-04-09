import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
	<React.StrictMode>
		<MantineProvider>
			<NotificationsProvider>
				<App />
			</NotificationsProvider>
		</MantineProvider>
	</React.StrictMode>
);
