// material
import { grey } from "@mui/material/colors";
import { styled, TextField} from "@mui/material";
import { Box, Drawer, IconButton, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import {useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import CategorySkeleton from "../skeletons/CategorySkeleton";

// ----------------------------------------------------------------------

const AccordionStyle = styled(Accordion)(() => ({
  borderBottom: "solid",
  borderRight: "solid",
  borderWidth: 2,
  borderColor: grey[100],
  borderRadius: "0 !important",
  "&::before": {
    display: "none",
  },
  "&.Mui-expanded": {
    margin: 0,
    boxShadow: "none",
  },
  "& .MuiAccordionSummary-content": {
    margin: "15px 0 11px 0 !important",
  },
  "& .MuiAccordionSummary-content.Mui-expanded": {
    margin: "15px 0  11px 0 !important",
  },
  "& .MuiButtonBase-root.MuiAccordionSummary-root.Mui-expanded": {
    minHeight: "48px",
  },
  "& .MuiAccordionDetails-root": {
    padding: "0px 16px 16px",
  },
}));


const BoxStyle = styled(Box)(() => ({
  display: 'flex',
  padding: "14px 16px 8px 16px",
}));

// ----------------------------------------------------------------------

const categories = [
  {title: 'Bodys'},
  {title: 'Bragas'},
  {title: 'Pantalones'},
  {title: 'Pijamas'},
]


export default function FiltersMobile({ drawer, setDrawer, setFilters, filters, categories, loading, total }) {
  const [product, setProduct] = useState('')

  function handleChangeCategory(event, value) {
    setFilters(prevState => ({
      ...prevState,
      category: value
    }))
    setDrawer(false)
  }

  function handleChangeSearch(value) {
    setFilters(prevState => ({
      ...prevState,
      search: value
    }))
    setDrawer(false)
  }

  return (
    <Drawer
      anchor="left"
      open={drawer}
      onClose={() => setDrawer(false)}
      sx={{
        width: 320,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 320,
        },
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        p={1}
        pl={2}
        alignItems="center"
      >
        <Typography variant="h6" sx={{ marginTop: "5px" }}>
          FILTRAR
        </Typography>
        <IconButton onClick={() => setDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>

      <BoxStyle>
        <TextField
          id="search"
          label="Buscar…"
          variant="outlined"
          size="small"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleChangeSearch(product)}
          fullWidth
        />
        <IconButton onClick={() => handleChangeSearch(product)}>
          <SearchIcon color='primary' />
        </IconButton>
      </BoxStyle>

      <Box p={2}>
        <Typography variant='h6'>Total resultados: {total}</Typography>
      </Box>

      <AccordionStyle
        defaultExpanded
        sx={{ borderTop: "solid", borderWidth: 2, borderColor: grey[100] }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Buscar por categoria {!loading && categories.length > 0 && `(${categories.length})`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {
              loading && <CategorySkeleton />
            }
            <FormControlLabel
              control={<Checkbox checked={filters.category === ''} onChange={e => handleChangeCategory(e.target.checked, '')}/>}
              label={<Typography variant="body1">Todos</Typography>}
            />
            {
              !loading && categories.length > 0 && categories.map((category) => (
                <FormControlLabel
                  key={category._id}
                  control={<Checkbox checked={filters.category === category._id} onChange={e => handleChangeCategory(e.target.checked, category._id)}/>}
                  label={<Typography variant="body1">{category.title}</Typography>}
                />
              ))
            }
          </FormGroup>
        </AccordionDetails>
      </AccordionStyle>
    </Drawer>
  );
}
