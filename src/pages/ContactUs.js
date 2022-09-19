import {Box, Container, Grid, Paper, Typography, useMediaQuery} from "@mui/material";
import ContactForm from "../components/contact/ContactForm";

export default function ContactUs() {
  const largeScreen = useMediaQuery(theme => theme.breakpoints.up('md'))
  return (
    <Box>
      <Container maxWidth='md'>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={2} sx={{p: 5, mb: 3, marginTop: largeScreen && '-5rem'}}>
              <Typography textAlign='center' variant='h1'>Contáctanos</Typography>
              <ContactForm/>
            </Paper>
          </Grid>
        </Grid>
      </Container>

    </Box>
  )
}
