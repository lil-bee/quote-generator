import { Divider, Heading, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import axios from "axios";

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
		queryKey: ["author-quotes"],
		queryFn: () => fetchOrang(author),
	});
	return (
		<>
			{data ? (
				<>
					<Heading>{author}</Heading>
					{data?.map((x, i) => (
						<>
							<Text>{x.text}</Text>
							<Divider />
						</>
					))}
				</>
			) : (
				<Text>is loading...</Text>
			)}
		</>
	);
}

export default AuthorQuotes;
