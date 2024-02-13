import { Grid, Skeleton } from "@mui/material";

const UserDrawerSkeleton = ({ arrayLength }: { arrayLength: number }) => {
  return (
    <Grid container pt={3}>
      {Array(arrayLength)
        .fill(0)
        .map((_, i) => (
          <Grid key={i} item container xs={12}>
            <Grid item xs={1}>
              <Skeleton />
            </Grid>

            <Grid item xs={12}>
              <Skeleton sx={{ height: "50px" }} />
            </Grid>
          </Grid>
        ))}
      <Grid item xs={12} display="flex" justifyContent="flex-end">
        <Skeleton sx={{ width: "60px", height: "50px" }} />
      </Grid>
    </Grid>
  );
};

export default UserDrawerSkeleton;
