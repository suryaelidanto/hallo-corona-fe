import { Badge, Box, Image, Text } from '@chakra-ui/react';
import NavbarComponent from '../components/NavbarComponent';
import { useQuery } from 'react-query';
import { API } from '../config/api';
import { useParams } from 'react-router-dom';
import LoadingComponent from '../components/LoadingComponent';
import { golangDateConvert } from '../helpers/converter';

function Artikel() {
  const params = useParams();
  const { id } = params;

  const { data: dataArticle, isLoading } = useQuery(
    'articleCache',
    async () => {
      const response = await API.get(`/article/${id}`);
      console.log(response);
      return response.data.data;
    }
  );

  document.title = `${
    dataArticle.title ? dataArticle.title : ''
  } | Hallo Corona`;

  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <NavbarComponent />
          <Box
            w={'100wh'}
            display={'flex'}
            flexDirection="column"
            pt={'80px'}
            alignItems="center"
          >
            <Box w={'80%'} display="flex" flexDirection={'column'} my={10}>
              <Text fontWeight="bold" fontSize={'30px'} color="black" mt="5px">
                {dataArticle?.title}
              </Text>
              <Text fontSize={'15px'} color="#6C6C6C" mt="5px">
                {golangDateConvert(dataArticle?.createdAt)}
              </Text>
              <Box
                display="flex"
                w="100%"
                flexDirection="row"
                alignItems={'center'}
                mt="5px"
              >
                <Text fontSize={'15px'} color="#6C6C6C" mr={2}>
                  Author :
                </Text>
                <Text fontSize={'15px'} color="#FF6185">
                  {dataArticle?.user?.fullName}
                </Text>
              </Box>
              <Box w={'100%'} boxShadow="md" mt={5} p={10}>
                <Image
                  src={
                    dataArticle?.image
                      ? dataArticle.image
                      : `/assets/images/image-placeholder.png`
                  }
                  w="100%"
                  h="400px"
                  objectFit="cover"
                />
                {/* Category Section */}
                <Box display="flex" flexDirection="row" w="100%" py={10}>
                  {dataArticle?.category.map((item, i) => (
                    <Badge
                      variant="outline"
                      borderRadius={'20px'}
                      borderColor="#6C6C6C"
                      p={2}
                      mr={3}
                      mt="5px"
                      key={i}
                    >
                      {item.name}
                    </Badge>
                  ))}
                </Box>
                {/* Article Section */}
                <Text>{dataArticle?.description}</Text>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export default Artikel;
