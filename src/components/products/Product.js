import {Box, IconButton, Paper, styled, Typography} from "@mui/material";
import { useNavigate } from 'react-router-dom'

const UpsideBox = styled(Box)({
  position: 'relative',
  backgroundColor: '#F8EDF6',
  ":hover": {
    "& .MuiBox-root": {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, .3)',
      transition: 'all 200ms ease',
    }
  }
})

export default function Product({product}) {
  const navigate = useNavigate();

  function goToDetail(product) {
    navigate(product._id)
  }

  return (
    <Paper sx={{maxWidth: '300px'}} onClick={() => goToDetail(product)}>
      {/*<UpsideBox>*/}
        {/*<Box sx={{*/}
        {/*  position: 'absolute',*/}
        {/*  top: 0,*/}
        {/*  left: 0,*/}
        {/*  right: 0,*/}
        {/*  bottom: 0,*/}
        {/*  backgroundColor: 'none',*/}
        {/*  display: 'none',*/}
        {/*}}>*/}
        {/*  <IconButton color='primary'><VisibilityIcon sx={{fontSize: 50}}/></IconButton>*/}
        {/*</Box>*/}
        <Box
          sx={{
            cursor: 'pointer',
            // backgroundColor: 'transparent',
            transition: 'transform .1s',
            "&:hover": {
              // backgroundColor: theme => theme.palette.primary.lighter,
              // transition: 'background-color 500ms ease',
              transform: 'scale(1.1)'
          }
        }}
        >
          <Box
            component="img"
            src={product.images[0]}
            alt="Paella dish"
            height='300px'
            width='300px'
          />
        </Box>
      {/*</UpsideBox>*/}
      <Box sx={{p: 3}}>
        <Box sx={{ mb: 1, cursor: 'pointer'}}>
          <Typography variant='h6' sx={{ "&:hover": { color: theme => theme.palette.primary.main, transition: 'color 100ms ease' } }}>{product.productName}</Typography>
        </Box>
        <Box>
          <Typography fontWeight='bold' sx={{ color: '#b6b6b6' }}>Codigo: {product.productCode}</Typography>
        </Box>
        <Box sx={{display: 'flex'}}>
            {/*<Typography variant='h4' sx={{textDecoration: 'line-through', mr: 2}} fontWeight='bold'*/}
            {/*            color='primary.main'>$ 9.99</Typography>*/}
          <Typography fontWeight='bold' color='primary' variant='h4'>$ {product.sellPrice}</Typography>
        </Box>
      </Box>
    </Paper>
  )
}
