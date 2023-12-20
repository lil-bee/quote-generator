import { useEffect, useState } from "react";
import {
	Button,
	Skeleton,
	Text,
	Stack,
	Box,
	Divider,
	calc,
	Center,
} from "@chakra-ui/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { ArrowForwardIcon, RepeatIcon } from "@chakra-ui/icons";

interface Quote {
	quoteText: string;
	quoteAuthor?: string | "";
	quoteGenre: string;
}

interface QuoteResponse {
	data: Quote[];
}

function Home() {
	const [quote, setQuote] = useState<Quote | null>(null);
	console.log(quote);

	//let slugify = require("slugify");

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
			<Box
				h="100vh"
				w="100%"
				overflowY="hidden"
				display="flex"
				flexDir="column"
				alignItems="center"
				justifyContent="flex-start"
			>
				<Box w="100%" overflow="hidden" pr="96px" textAlign="right">
					<Button
						variant="outline"
						border="0px"
						rightIcon={<RepeatIcon />}
						onClick={() => refetch()}
					>
						random
					</Button>
				</Box>
				<Center
					overflowY="hidden"
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<Box maxW="714px">
						{data && !isLoading ? (
							<>
								<Box gap="59px" display="flex" flexDir="column">
									<Box
										gap="99px"
										display="flex"
										justifyContent="center"
										flexDir="row"
									>
										<Box>
											<Divider
												borderStartWidth="8px"
												borderColor="#F7DF94"
												orientation="vertical"
											/>
										</Box>
										<Text fontSize="36px">"{data?.quoteText}"</Text>
									</Box>
									<Box
										onClick={() => navigate(`/${data.quoteAuthor}`)}
										display="flex"
										justifyContent="space-between"
										alignItems="center"
										ml="70px"
										_hover={{ color: "white", bg: "black", cursor: "pointer" }}
									>
										<Box py="50px" pl="29px">
											<Text fontSize="24px">{data?.quoteAuthor}</Text>
											<Text fontSize="14px">{data?.quoteGenre}</Text>
										</Box>
										<ArrowForwardIcon mr="29px" color="white" />
									</Box>
								</Box>
							</>
						) : (
							<Stack w="300px">
								<Skeleton height="20px" />
								<Skeleton height="20px" />
								<Skeleton height="20px" />
							</Stack>
						)}
					</Box>
				</Center>
			</Box>
		</>
	);
}

export default Home;
