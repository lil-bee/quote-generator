import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const thick = defineStyle({
	borderWidth: "8px", // change the width of the border
	borderStyle: "solid", // change the style of the border
	borderRadius: 10,
	borderColor: "#F7DF94", // set border radius to 10
});

export const dividerTheme = defineStyleConfig({
	variants: { thick },
});
