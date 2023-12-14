import { useEffect, useState } from "react";
import { Button, Text } from "@chakra-ui/react";

import axios from "axios";
interface Quote {
	quoteText: string;
	quoteAuthor: string;
	quoteGenre: string;
}

function App() {
	const [quote, setQuote] = useState<Quote | null>(null);
	console.log(quote);

	useEffect(() => {
		fetchQuote();
	}, []);

	const fetchQuote = async () => {
		console.log("hayu");
		try {
			const response = await axios.get<Quote>(
				"https://quote-garden.onrender.com/api/v3/quotes/random"
			);
			setQuote(response.data.data[0]);
		} catch (error) {
			console.error("Error fetching quote: ", error);
		}
	};

	return (
		<>
			<div>
				{quote ? (
					<>
						<Text>{quote.quoteText}</Text>
						<Text>{quote.quoteAuthor}</Text>
						<Text>{quote.quoteGenre}</Text>
					</>
				) : (
					<Text>Loading...</Text>
				)}
				<Button onClick={fetchQuote}>Get New Quote</Button>
			</div>
		</>
	);
}

export default App;
