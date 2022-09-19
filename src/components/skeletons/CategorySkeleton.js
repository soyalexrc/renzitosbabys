import {Box, Skeleton, Typography} from "@mui/material";

export default function CategorySkeleton() {
  return (
    <Box>
      {
        [{}, {}, {}, {}, {}, {}, {}, {}, {} , {}].map((x, index)=> (
          <Box mb={2} key={index + 1}>
            <Typography variant='body1'>
              <Skeleton variant='text' width='100%'/>
            </Typography>
          </Box>
        ))
      }
    </Box>
  )
}
