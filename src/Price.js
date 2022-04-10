import { Image, Text, Box } from "@mantine/core";
import React from "react";
import { TrendingDown, TrendingUp } from "tabler-icons-react";

const Price = ({ coin, increased }) => {
	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Image src={coin.image} alt={coin.name} width="32px" mr="5px" />
			<Text weight="bold" size="xl" mr="xs">
				{coin.symbol.toUpperCase()} - ${parseFloat(coin.current_price.toFixed(3))}
			</Text>
			<Box
				sx={{ display: "flex", alignItems: "center" }}
				className={increased ? "increased" : "decreased"}
			>
				{increased ? <TrendingUp /> : <TrendingDown />}
				<Text size="sm" ml="5px">
					{coin.price_change_percentage_24h.toFixed(2)}%
				</Text>
			</Box>
		</Box>
	);
};

export default Price;
