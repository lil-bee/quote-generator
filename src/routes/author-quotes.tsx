import {
	Box,
	Button,
	Center,
	Flex,
	Heading,
	Stack,
	Skeleton,
} from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import axios from "axios";
import Quote from "../components/Quote";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router";
import Footer from "../components/Footer";

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

	const { data, isLoading } = useQuery({
		queryKey: [`author-quotes-${author}`],
		queryFn: () => fetchOrang(author),
	});

	return (
		<>
			<Box
				display="flex"
				flexDir="column"
				alignItems="center"
				gap="47px"
				p={2}
				justifyContent="center"
			>
				<Box
					w="100%"
					overflow="hidden"
					px={{ base: "20px", md: "96px" }}
					display="flex"
					textAlign="left"
				>
					<Button
						variant="outline"
						border="none"
						onClick={() => navigate("/")}
						leftIcon={<ArrowBackIcon />}
					>
						back
					</Button>
				</Box>
				<Center
					overflowY="hidden"
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					{data && !isLoading ? (
						<>
							<Box alignSelf="center" maxW={{ base: "380px", md: "714px" }}>
								<Heading mb={{ base: "50px", md: "100px" }} fontSize="36px">
									{author}
								</Heading>
								<Flex
									gap={{ base: "70px", md: "140px" }}
									direction="column"
									align="self-start"
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
						<>
							<Stack w="600px">
								<Skeleton height="200px" />

								<Skeleton height="200px" />

								<Skeleton height="200px" />
							</Stack>
						</>
					)}
				</Center>
				<Footer />
			</Box>
		</>
	);
}

export default AuthorQuotes;
