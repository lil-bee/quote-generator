import { useEffect, useState } from "react";
import { Button, Skeleton, Text, Stack } from "@chakra-ui/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

interface Quote {
	quoteText: string;
	quoteAuthor: string;
	quoteGenre: string;
}

interface QuoteResponse {
	data: Quote[];
}

function Home() {
	const [quote, setQuote] = useState<Quote | null>(null);
	console.log(quote);

	const navigate = useNavigate();

	useEffect(() => {
		fetchQuote();
	}, []);

	const fetchQuote = async () => {
		try {
			const { data }: { data: QuoteResponse } = await axios.get<QuoteResponse>(
				"https://quote-garden.onrender.com/api/v3/quotes/random"
			);

			return {
				quoteAuthor: data.data[0].quoteAuthor,
				quoteGenre: data.data[0].quoteGenre,
				quoteText: data.data[0].quoteText,
			};
		} catch (error) {
			console.error("Error fetching quote: ", error);
		}
	};

	const { data, refetch, isLoading } = useQuery({
		queryKey: ["quotes-random"],
		queryFn: fetchQuote,
		staleTime: Infinity,
	});

	return (
		<>
			<div>
				{data && !isLoading ? (
					<>
						<Text>{data?.quoteText}</Text>
						{data && (
							<Text onClick={() => navigate(`/${data.quoteAuthor}`)}>
								{data?.quoteAuthor}
							</Text>
						)}
						<Text>{data?.quoteGenre}</Text>
					</>
				) : (
					<Stack>
						<Skeleton height="20px" />
						<Skeleton height="20px" />
						<Skeleton height="20px" />
					</Stack>
				)}
				<Button onClick={() => refetch()}>Get New Quote</Button>
			</div>
		</>
	);
}

export default Home;
