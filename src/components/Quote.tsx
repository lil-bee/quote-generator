import { Text, Box, Divider } from "@chakra-ui/react";
interface Quote {
	quoteText?: string;
}
function Quote({ quoteText }: Quote) {
	return (
		<Box
			gap={{ base: "25px", sm: "50px", md: "99px" }}
			display="flex"
			justifyContent="center"
			flexDir="row"
		>
			<Box>
				<Divider variant="thick" orientation="vertical" />
			</Box>
			<Text fontWeight="500" fontSize={{ base: "24px", md: "36px" }}>
				"{quoteText}"
			</Text>
		</Box>
	);
}
export default Quote;
