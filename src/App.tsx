import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import AppRoutes from "./routes/index.tsx";

function App() {
	const queryClient = new QueryClient();

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<ChakraProvider>
					<AppRoutes />
				</ChakraProvider>
			</QueryClientProvider>
		</>
	);
}

export default App;
