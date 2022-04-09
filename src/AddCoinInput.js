import { InputWrapper, Input, Button, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useState } from "react";
import { Check, X } from "tabler-icons-react";

const AddCoinInput = () => {
	const [id, setId] = useState("");

	const handleClick = async (e) => {
    e.preventDefault();
		try {
			const response = await axios.get(
				`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`
			);

			if (response.status === 200) {
				showNotification({
					title: "Success!",
					message: "Coin was added successfully!",
					icon: <Check />,
					color: "teal"
				});
			}
		} catch (err) {
			console.error(err);
			if (err.response.status === 404) {
				showNotification({
					title: "Aw Snap!",
					message: "Coin with that ID was not found!",
					icon: <X />,
					color: "red"
				});
			} else {
				showNotification({
					title: "Aw Snap!",
					message: "Something went wrong. Try again!",
					icon: <X />,
					color: "red"
				});
			}
		}
	};

	return (
		<InputWrapper
			mb="md"
			label="Add Coin"
			description="Enter the ID of a cryptocurrency (Usually IDs are the name of the currency in all lowercase eg. bitcoin, binancecoin, bitcoin-cash etc.)"
		>
			<Input
				value={id}
				onChange={(e) => setId(e.target.value)}
				placeholder="Coin ID"
				rightSectionWidth="100px"
				rightSection={<Button onClick={handleClick}>Add Coin</Button>}
			/>
			<Text size="xs">
				You can search for all the available cryptocurrencies{" "}
				<a
					href="https://api.coingecko.com/api/v3/coins/list?include_platform=false"
					target="_blank"
					rel="noreferrer"
				>
					here
				</a>
				.
			</Text>
		</InputWrapper>
	);
};

export default AddCoinInput;
