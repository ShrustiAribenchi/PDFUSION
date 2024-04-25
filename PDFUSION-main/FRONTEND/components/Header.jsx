import { Container,Flex,Button,Text } from '@mantine/core';

function Header() {
  return (
    <>
      <Container>
      <Flex
      mih={50}
      bg="rgba(0, 0, 0, .3)"
      gap="md"
      justify="space-between"
      align="center"
      direction="row"
      wrap="wrap"
    >
      <Text fz="lg">PDF CHATBOT</Text>
    </Flex>
      </Container>
    
    </>
  );
}

export default Header;