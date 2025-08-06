import { Box, Heading, Text } from '@chakra-ui/react';

export default function Home() {
  return (
    <Box p={12}>
      <Heading>Welcome to AutoFund+</Heading>
      <Text mt={4}>AI-powered platform for unclaimed benefits & tax credits.</Text>
    </Box>
  );
}