import { Text, Box, Divider } from "@chakra-ui/react";
interface Quote {
	quoteText?: string;
	quoteAuthor?: string | "";
	quoteGenre?: string;
}
function Quote({ quoteText }: Quote) {
	return (
		<Box gap="99px" display="flex" justifyContent="center" flexDir="row">
			<Box>
				<Divider variant="thick" orientation="vertical" />
			</Box>
			<Text fontSize="36px">"{quoteText}"</Text>
		</Box>
	);
}
export default Quote;
