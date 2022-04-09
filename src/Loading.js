import { Box, Loader } from '@mantine/core';
import React from 'react'

const Loading = () => {
  return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				minHeight: "100vh"
			}}
		>
			<Loader color="red" size="xl" variant="bars" />
		</Box>
	);
}

export default Loading