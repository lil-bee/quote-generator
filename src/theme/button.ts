import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const outline = defineStyle({
	border: "none",
	fontWeight: "semibold",
});

export const buttonTheme = defineStyleConfig({
	variants: { outline },
});
