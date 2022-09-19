//imports

import {Box, Button, Rating, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {Skeleton} from "@mui/material";

const ProductSkeleton = () => {
  return (
    <Box sx={{ boxShadow: "0px 3px 6px #00000029", width: "100%" }}>
      <Box
        sx={{
          px: 2,
          pt: 2,
          pb: "12px",
          borderBottom: "solid",
          borderWidth: 1,
          borderColor: grey[100],
        }}
      >
        <Typography variant="h6">
          <Skeleton />
        </Typography>
      </Box>
      <Box sx={{ display: "flex", px: 2}}>
        <Skeleton sx={{
          height: {xs: 220, sm: 242},
          width: {xs: 140, sm: 190},
          position: 'relative',
        }}/>
        <Box sx={{ width: '100%'}} p={2}>
          <div>
            <Typography variant="caption"><Skeleton /></Typography>
            <Typography variant="caption"><Skeleton /></Typography>


            <Typography variant="caption"><Skeleton /></Typography>
            <Typography variant="h6" color="primary.dark" sx={{ mb: 1 }}>
              <Skeleton />
            </Typography>

            <Box  mb={2}>
              <Box sx={{ ml: 2 }}>
                <Typography variant="caption"><Skeleton /></Typography>
              </Box>
            </Box>

            <Typography variant="caption"><Skeleton /></Typography>
          </div>
        </Box>
      </Box>
    </Box>
  )
}

export default ProductSkeleton
