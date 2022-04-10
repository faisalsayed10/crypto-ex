import { ActionIcon, Card, Container, Grid, Text } from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { X } from "tabler-icons-react";
import AddCoinInput from "./AddCoinInput";
import "./App.css";
import DownloadExtension from "./DownloadExtension";
import GithubCorner from "./GithubCorner";
import Loading from "./Loading";
import Price from "./Price";

const DEFAULT_COINS = ["bitcoin", "ethereum", "dogecoin", "ripple", "binancecoin"];

function App() {
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!localStorage.getItem("coins")) {
			localStorage.setItem("coins", JSON.stringify(DEFAULT_COINS));
		}

		fetchData();
		setIsLoading(false);
		const interval = setInterval(fetchData, 1000 * 60);
		return () => {
			clearInterval(interval);
		};
	}, []);

	const fetchData = async () => {
		console.log("fetchData called");
		const coins = localStorage.getItem("coins")
			? JSON.parse(localStorage.getItem("coins"))
			: DEFAULT_COINS;

		const response = await axios.get(
			`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coins.join(
				"%2C"
			)}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`
		);

		for (let i = 0; i < coins.length; i++) {
			if (!coins[i]) return;
			let chart = { index: [], price: [], market: {} };
			let { data: result } = await axios.get(
				`https://api.coingecko.com/api/v3/coins/${coins[i]}/market_chart?vs_currency=usd&days=1&interval=minutely`
			);

			for (const item of result.prices.slice(-100)) {
				chart.index.push(item[0]);
				chart.price.push(item[1]);
			}

			chart.market = response.data.filter((e) => e.id === coins[i])[0];
			setData((prev) => ({ ...prev, [coins[i]]: chart }));
		}
	};

	const removeCoin = (coin) => {
		const coins = JSON.parse(localStorage.getItem("coins"));
		localStorage.setItem("coins", JSON.stringify(coins.filter((e) => e !== coin)));

		setData((prevState) => {
			const state = { ...prevState };
			state[coin] = undefined;
			return state;
		});
	};

	const addCoin = (coin) => {
		const coins = JSON.parse(localStorage.getItem("coins"));
		if (coins.includes(coin)) return;
		localStorage.setItem("coins", JSON.stringify([...coins, coin]));

		fetchData();
	};

	return (
		<Container mt="md">
			<GithubCorner />
			{isLoading || !data ? (
				<Loading />
			) : (
				<>
					<AddCoinInput addCoin={addCoin} />
					<Grid align="center" justify="center">
						{Object.keys(data).map((coin) => {
							if (!data[coin]) return null;
							const increased = data[coin].market.price_change_percentage_24h > 0 ? true : false;
							return (
								<Grid.Col xs={6} key={coin}>
									<Card
										shadow="sm"
										py="md"
										sx={{
											display: "flex",
											position: "relative",
											flexDirection: "column",
											alignItems: "center",
											border: "0.5px solid #E2E8F0"
										}}
									>
										<ActionIcon
											variant="hover"
											sx={{ position: "absolute", right: 10 }}
											onClick={() => removeCoin(coin)}
										>
											<X size={16} />
										</ActionIcon>
										<Price coin={data[coin].market} increased={increased} />
										<Plot
											data={[
												{
													name: "Price ($)",
													x: data[coin].index.map((t) => new Date(t)),
													y: data[coin].price,
													xaxis: "x",
													yaxis: "y1",
													type: "scatter",
													mode: "lines+markers",
													marker: { color: "red", size: 2 }
												}
											]}
											config={{ responsive: true, displayModeBar: false }}
											layout={{
												autosize: true,
												height: 150,
												width: 350,
												margin: { l: 50, r: 0, t: 0, pad: 0, b: 0 },
												showlegend: false,
												xaxis: { domain: [1, 1], anchor: "y2" },
												yaxis: { domain: [0.1, 1], anchor: "x" },
												yaxis2: { showticklabels: false, domain: [0, 0.1], anchor: "x" }
											}}
										/>
									</Card>
								</Grid.Col>
							);
						})}
					</Grid>
				</>
			)}
			{process.env.REACT_APP_ENVIRONMENT === "web" && <DownloadExtension />}
			<Text size="xs" mt="md" align="center">
				Powered by{" "}
				<a href="https://www.coingecko.com/" target="_blank" rel="noreferrer">
					CoinGecko
				</a>
			</Text>
		</Container>
	);
}

export default App;
