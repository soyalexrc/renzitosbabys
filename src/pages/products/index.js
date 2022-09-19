import {styled} from "@mui/material/styles";
import Page from '../../components/Page'
import Product from "../../components/products/Product";
import {Box, Container, Grid, LinearProgress, Pagination, Typography} from "@mui/material";
import SortDesktop from "../../components/products/SortDektop";
import SortMobile from "../../components/products/SortMobile";
import FiltersMobile from "../../components/products/FiltersMobile";
import FiltersDesktop from "../../components/products/FiltersDesktop";
import {useState, useEffect} from "react";
import {useLocation} from 'react-router-dom';
import useGetCategories from "../../hooks/useGetCategories";
import useGetProducts from "../../hooks/useGetProducts";
import ProductSkeleton from '../../components/skeletons/ProductSkeleton'

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


export default function Products() {
  const {pathname} = useLocation()
  const { categories, loading: categoriesLoading } = useGetCategories();
  const {loading, products, getByCategory } = useGetProducts();
  const [drawer, setDrawer] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    category: '',
    page: 1,
    limit: 12,
    order: '',
    search: ''
  });

  const handleChangePage = (event, newPage) => {
    setFilters(prevState => ({
      ...prevState,
      page: newPage
    }))
    setPage(newPage);
  };

  useEffect(() => {
    getByCategory(filters)
  }, [filters, page])


  return (
    <RootStyle title={`Productos | Renzitosbabys`}>
      <Container maxWidth='xl'>
        <Grid container>
          <Grid item xs={12} md={3}>
            <FiltersDesktop
              total={products.total}
              categories={categories}
              loading={categoriesLoading}
              setFilters={setFilters}
              filters={filters}
            />
            <FiltersMobile
              total={products.total}
              categories={categories}
              loading={categoriesLoading}
              setFilters={setFilters}
              filters={filters}
              setDrawer={setDrawer}
              drawer={drawer}
            />
          </Grid>
          <Grid item xs={12} md={9} sx={{position: 'relative'}}>
            <SortDesktop filters={filters} setFilters={setFilters}/>
            <SortMobile setDrawer={setDrawer} filters={filters} setFilters={setFilters}/>

            {loading &&  <LinearProgress />}
            <Box sx={{p: 3}}>
              {loading &&  <ProductSkeleton />}
              <Grid container spacing={3}>
                {
                  !loading && products.data && products.data.length > 0 && products.data.map(product => (
                    <Grid key={product._id} item xs={12} sm={6} md={4} sx={{display: 'flex', justifyContent: 'center'}}>
                      <Product  product={product}/>
                    </Grid>
                  ))
                }
              </Grid>
              {
                !loading && products?.data?.length < 1 &&
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Box display='flex' alignItems='center' justifyContent='center' height={500}>
                        <Typography variant='h6'> No se encontraro resultados...</Typography>
                      </Box>
                    </Grid>
                  </Grid>
              }
            </Box>
          </Grid>
        </Grid>
        <Box sx={{display: 'flex', justifyContent: 'end', p: 5}}>
          <Pagination
            boundaryCount={1}
            count={Math.round(products.total / filters.limit) || 1}
            defaultPage={1}
            onChange={handleChangePage}
            page={page}
            showFirstButton
            showLastButton
          />
        </Box>
      </Container>
    </RootStyle>
  )
}
