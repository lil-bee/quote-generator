import { Box, Link, Text } from "@chakra-ui/react";
function Footer() {
	return (
		<Box
			position="unset"
			bottom={0}
			display="flex"
			justifyContent="center"
			alignItems="center"
		>
			<Text fontSize="sm" color="gray.500">
				created by{" "}
				<Link
					fontWeight="semibold"
					href="https://github.com/lil-bee"
					target="_blank"
				>
					lilbee
				</Link>{" "}
				- devChallenges.io
			</Text>
		</Box>
	);
}

export default Footer;
