import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import AppRoutes from "./routes/index.tsx";
import theme from "./theme/index.ts";
import "../src/theme/style.css";

function App() {
	const queryClient = new QueryClient();

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<ChakraProvider theme={theme}>
					<AppRoutes />
				</ChakraProvider>
			</QueryClientProvider>
		</>
	);
}

export default App;
