import { extendTheme } from "@chakra-ui/react";
import { buttonTheme } from "./button";
import { dividerTheme } from "./divider";

const theme = extendTheme({
	fonts: {
		heading: '"Plus Jakarta Sans", sans-serif',
		body: '"Plus Jakarta Sans", sans-serif',
	},
	components: { Button: buttonTheme, Divider: dividerTheme },
});

export default theme;
