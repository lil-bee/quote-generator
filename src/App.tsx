import { useEffect, useState } from "react";
import { Button, Text } from "@chakra-ui/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Quote {
	quoteText: string;
	quoteAuthor: string;
	quoteGenre: string;
}

interface QuoteResponse {
	data: Quote[];
}

interface OrangResponse {
	data: Orang[];
}

interface Orang {
	nama: string;
}

function App() {
	const [quote, setQuote] = useState<Quote | null>(null);
	console.log(quote);

	useEffect(() => {
		fetchQuote();
	}, []);

	const fetchQuote = async () => {
		try {
			const { data }: { data: QuoteResponse } = await axios.get<QuoteResponse>(
				"https://quote-garden.onrender.com/api/v3/quotes/random"
			);
			console.log(data);
			return {
				quoteAuthor: data.data[0].quoteAuthor,
				quoteGenre: data.data[0].quoteGenre,
				quoteText: data.data[0].quoteText,
			};
		} catch (error) {
			console.error("Error fetching quote: ", error);
		}
	};

	const fetchOrang = async (orang: string) => {
		try {
			const { data }: { data: OrangResponse } = await axios.get(
				"https://quote-garden.onrender.com/api/v3/quotes",
				{
					params: {
						author: orang,
					},
				}
			);

			console.log(data);
		} catch (error) {
			console.error("error fectch orang");
		}
	};

	const { data, refetch } = useQuery({
		queryKey: ["quotes-random"],
		queryFn: fetchQuote,
	});

	console.log(data);

	return (
		<>
			<div>
				{data ? (
					<>
						<Text>{data?.quoteText}</Text>
						{data && (
							<Text onClick={() => fetchOrang(data.quoteAuthor)}>
								{data?.quoteAuthor}
							</Text>
						)}
						<Text>{data?.quoteGenre}</Text>
					</>
				) : (
					<Text>Loading...</Text>
				)}
				<Button onClick={() => refetch()}>Get New Quote</Button>
			</div>
		</>
	);
}

export default App;
