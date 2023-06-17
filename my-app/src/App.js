import React, { useState } from 'react';
import { ChakraProvider, Box, Text, Center, Spinner, Input, Button, extendTheme, useColorMode, Stack } from '@chakra-ui/react';

const customTheme = extendTheme({
  colors: {
    brand: {
      50: '#F6F5FF',
      100: '#E9E6FE',
      200: '#C9C4FC',
      300: '#ABA8FA',
      400: '#8D8BFA',
      500: '#706EFA',
      600: '#5554F9',
      700: '#3B39F7',
      800: '#231FF6',
      900: '#0C0AEE',
    },
  },
  fonts: {
    body: "'Montserrat', sans-serif",
    heading: "'Poppins', sans-serif",
  },
});

const MyComponent = () => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [responseData, setResponseData] = useState('');
  const [isGenerated, setIsGenerated] = useState(false)

  const fetchData = () => {
    setLoading(true);
    fetch("http://127.0.0.1:5000/generate", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: text })
    })
      .then(response => response.json())
      .then(result => {
        setLoading(false);
        const data = result.data;
        setResponseData(data);
        isGenerated = true
      })
      .catch(error => {
        setLoading(false);
        console.error('Error:', error);
      });
  }

  const handleChange = (event) => {
    setText(event.target.value);
  }



  return (
    <Center height="50vh">
      <Stack direction='column' spaceing='40px'>
        <Box alignself='center' display='inline-block' width='110vh 'height='35vh' p={4} bg="charcoal" borderRadius="xl"  mt={8}>
        <Text bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize='6xl' fontWeight='extrabold'> Generate Your Recipe!</Text>
          <Input type="text" value={text} onChange={handleChange} mb={4} placeholder="Enter ingredients" />
          <Button textColor='white' size='lg' bgGradient='linear(to-l, #7928CA, #FF0080)' onClick={fetchData} mb={4} isDisabled={loading || !text}>
            {loading ? (
              <Spinner size="lg" color="white" />
            ) : (
              'Generate Recipe'
            )}
          </Button>

        {responseData && (
          <Box height='350vh' alignSelf='center' width='110vh' p={10} bg="white" borderRadius="xl" mt={4} minWidth='100'>
            <Text fontSize="lg" fontWeight="bold" mb={2}>Generated Recipe:</Text>
            <div dangerouslySetInnerHTML={{ __html: responseData }} />
          </Box>
          )}
        </Box>
      </Stack>
    </Center>
  );
}

const App = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: 'gray.50', dark: 'gray.800' };
  const color = { light: 'black', dark: 'white' };

  return (
    <ChakraProvider theme={customTheme}>
      <Box bg={bgColor[colorMode]} color={color[colorMode]} minH="100vh" py={8}>
        <MyComponent />
      </Box>
    </ChakraProvider>
  );
}

export default App;
