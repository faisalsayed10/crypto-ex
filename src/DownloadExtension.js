import { Box, Center, Text, Title } from "@mantine/core";

const DownloadExtension = () => {
	return (
		<Box mt="md">
			<Title order={5} align="center">
				<a
					href="https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/faisalsayed10/crypto-ex/tree/main/build"
					target="_blank"
					rel="noreferrer"
					style={{ color: "inherit" }}
				>
					Download
				</a>{" "}
				as a chrome extension
			</Title>
			<Center>
				<Text
					component="a"
					variant="link"
					href="https://developer.chrome.com/docs/extensions/mv3/getstarted/#unpacked"
					target="_blank"
				>
					Read this to find out how to add it to your browser
				</Text>
			</Center>
		</Box>
	);
};

export default DownloadExtension;
