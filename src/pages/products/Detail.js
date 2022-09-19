import {styled} from "@mui/material/styles";
import Page from "../../components/Page";
import {
  Box,
  Button, Chip,
  Container,
  Grid,
  Divider,
  Typography, Skeleton
} from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {useState, useEffect} from 'react';
import {CarouselBasic3} from "../../components/carousel";
import sampleProduct from '../../assets/img/sample-product.jpg';
import useGetProducts from "../../hooks/useGetProducts";
import {useParams} from 'react-router-dom';
import CategorySkeleton from "../../components/skeletons/CategorySkeleton";

const sampleCarousel = [
  {img: sampleProduct},
  {img: sampleProduct},
  {img: sampleProduct},
  {img: sampleProduct},
]

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const RootStyle = styled(Page)(({theme}) => ({
  minHeight: "100%",
  width: "100%",
  paddingTop: APP_BAR_MOBILE,
  [theme.breakpoints.up("md")]: {
    paddingTop: APP_BAR_DESKTOP,
  },
}));

export default function Detail() {
  const [count, setCount] = useState(1);
  const {id} = useParams();
  const {getProductById, loading, currentProduct} = useGetProducts()

  useEffect(() => {
    getProductById(id)
  }, [id])

  if (loading) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h2'><Skeleton variant='text' width={300} /></Typography>
          <Typography variant='body1'><Skeleton variant='text' width={'100%'} /></Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Skeleton variant='rectangular' width={'100%'} height={700}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box mb={3}>
            <Typography variant='h6'>
              <Skeleton variant='text' width={300}/>
            </Typography>
          </Box>
          <Box mb={3}>
            <Typography variant='h1'>
              <Skeleton variant='text' width='100%'/>
            </Typography>
          </Box>
          <Box mb={3}>
            <Typography variant='body1'><Skeleton variant='text' width='100%'/></Typography>
            <Typography variant='body1'><Skeleton variant='text' width='100%'/></Typography>
            <Typography variant='body1'><Skeleton variant='text' width='100%'/></Typography>
            <Typography variant='body1'><Skeleton variant='text' width='100%'/></Typography>
          </Box>
          <Box mb={3} display='flex'>
            <Skeleton variant='rounded' sx={{mx: 2}} width={75} height={30}/>
            <Skeleton variant='rounded' sx={{mx: 2}} width={75} height={30}/>
            <Skeleton variant='rounded' sx={{mx: 2}} width={75} height={30}/>
            <Skeleton variant='rounded' sx={{mx: 2}} width={75} height={30}/>
          </Box>
          <Box mb={3}>
            <Skeleton variant='rounded' sx={{mb: 2}} width={'100%'} height={80}/>
            <Skeleton variant='rounded' sx={{mb: 2}} width={'100%'} height={80}/>
            <Skeleton variant='rounded' sx={{mb: 2}} width={'100%'} height={80}/>
          </Box>
        </Grid>
      </Grid>
    )
  }

  if (!loading && currentProduct._id) {
    return (
      <RootStyle title={`${currentProduct.productName} | RenzitosBabys`}>
        <Container maxWidth='xl'>

          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Box>
                <Typography variant='h2' color='primary' align='center'>{currentProduct.category.title}</Typography>
                <Typography align='center'>{currentProduct.category.description}</Typography>
              </Box>
              <Divider sx={{borderWidth: '2px', mt: 2}}></Divider>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{
                width: "100%",
                borderRadius: 1,
                // boxShadow: "0px 3px 6px #00000029;",
                position: 'relative'
              }}>
                <Box sx={{overflow: "hidden"}}>
                  <CarouselBasic3 data={currentProduct.images} type='product'/>
                </Box>
              </Box>

            </Grid>
            <Grid item xs={12} md={6} alignSelf='center'>
              <Typography fontWeight='bold' sx={{color: '#b6b6b6'}}>Codigo: {currentProduct.productCode}</Typography>
              <Typography variant='h1' sx={{my: 3}}> {currentProduct.productName}</Typography>
              <Box sx={{display: 'flex'}}>
                {/*<Typography variant='h3' color='primary' sx={{*/}
                {/*  mr: 5,*/}
                {/*  textDecoration: 'line-through '*/}
                {/*}}> $ 9.99</Typography>*/}
                <Typography variant='h3' color='primary'> $ {currentProduct.sellPrice}</Typography>
              </Box>
              <Typography variant='body1' sx={{my: 4}}>{currentProduct.description}</Typography>
              <Box display='flex' flexWrap='wrap'>
                {
                  currentProduct.sizes.map(size => (
                    <Chip size='small' sx={{mr: 1, mb: 1}} key={size.text} label={size.text} variant='outlined'
                          color='primary'/>
                  ))
                }
                <Chip size='small' sx={{mr: 1, mb: 1}} label={currentProduct.material} variant='outlined'
                      color='primary'/>

                {
                  currentProduct.isFav &&
                  <Chip size='small' sx={{mr: 1, mb: 1}} label='Es favorito' variant='outlined' color='primary'/>
                }
              </Box>

              {/*<Box sx={{display: 'flex', alignItems: 'center', my: 3, justifyContent: 'center'}}>*/}
              {/*  <IconButton onClick={() => setCount(prevState => --prevState)}*/}
              {/*              color='primary'><RemoveIcon/></IconButton>*/}
              {/*  <Typography sx={{width: '50px'}} align='center'>{count}</Typography>*/}
              {/*  <IconButton onClick={() => setCount(prevState => ++prevState)} color='primary'><AddIcon/></IconButton>*/}
              {/*</Box>*/}
              <Box my={2}>
                <Button variant='outlined' color='primary' fullWidth>
                  Solicitar via Whatsapp
                </Button>
              </Box>
              <Box my={2}>
                <Button variant='outlined' color='primary' fullWidth>
                  Solicitar via Email
                </Button>
              </Box>
              <Box my={2}>
                <Button variant='outlined' color='primary' fullWidth>
                  Agregar al carrito
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    )
  }
}
