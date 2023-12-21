import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import axios from "axios";
import Quote from "../components/Quote";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router";

interface OrangResponse {
	data: Orang[];
}

interface Orang {
	nama: string;
	quoteText: string;
	quoteAuthor: string;
}

type AuthorParam = {
	author: string | "";
};

function AuthorQuotes() {
	const { author } = useParams<AuthorParam>();
	const navigate = useNavigate();
	const fetchOrang = async (orang: string | undefined) => {
		try {
			const { data }: { data: OrangResponse } = await axios.get<OrangResponse>(
				`https://quote-garden.onrender.com/api/v3/quotes`,
				{
					params: {
						author: orang,
						limit: 3,
					},
				}
			);
			return data.data.map(quote => ({
				text: quote.quoteText,
				author: quote.quoteAuthor,
			}));
		} catch (error) {
			console.error("error fectch orang");
		}
	};

	const { data } = useQuery({
		queryKey: [`author-quotes-${author}`],
		queryFn: () => fetchOrang(author),
	});

	return (
		<>
			{data ? (
				<>
					<Button
						variant="outline"
						border="none"
						onClick={() => navigate("/")}
						leftIcon={<ArrowBackIcon />}
					>
						back
					</Button>
					<Box alignSelf="center" maxW="714px">
						<Heading>{author}</Heading>
						<Flex
							gap="140px"
							direction="column"
							align="center"
							justify="center"
						>
							{data?.map((x, i) => (
								<>
									<Quote quoteText={x.text} key={i} />
								</>
							))}
						</Flex>
					</Box>
				</>
			) : (
				<Text>is loading...</Text>
			)}
		</>
	);
}

export default AuthorQuotes;
