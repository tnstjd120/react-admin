import { Grid, Typography, Box, Breadcrumbs, Theme } from "@mui/material";
import { IconCircle } from "@tabler/icons-react";

import breadcrumbImg from "public/images/breadcrumb/ChatBc.png";
import { Link, useLocation } from "react-router-dom";

interface BreadCrumbType {
  subtitle?: string;
  items?: any[];
  title: string;
  children?: JSX.Element;
}

const Breadcrumb = ({ subtitle, items, title, children }: BreadCrumbType) => {
  const location = useLocation();
  console.log("Breadcrumb location => ", location);

  return (
    <Grid
      container
      sx={{
        backgroundColor: "primary.light",
        borderRadius: (theme: Theme) => theme.shape.borderRadius / 4,
        p: "30px 25px 20px",
        marginBottom: "30px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Grid item xs={12} sm={6} lg={8} mb={1}>
        <Typography variant="h4">{title}</Typography>
        <Typography
          color="textSecondary"
          variant="h6"
          fontWeight={400}
          mt={0.8}
          mb={0}
        >
          {subtitle}
        </Typography>
        <Breadcrumbs
          separator={
            <IconCircle
              size="5"
              fill="textSecondary"
              fillOpacity={"0.6"}
              style={{ margin: "0 5px" }}
            />
          }
          sx={{ alignItems: "center", mt: items ? "10px" : "" }}
          aria-label="breadcrumb"
        >
          {items
            ? items.map((item) => (
                <div key={item.title}>
                  {item.to ? (
                    <Link to={item.to}>
                      <Typography color="textSecondary">
                        {item.title}
                      </Typography>
                    </Link>
                  ) : (
                    <Typography color="textPrimary">{item.title}</Typography>
                  )}
                </div>
              ))
            : ""}
        </Breadcrumbs>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} display="flex" alignItems="flex-end">
        <Box
          sx={{
            display: { xs: "none", md: "block", lg: "flex" },
            alignItems: "center",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          {children ? (
            <Box sx={{ top: "0px", position: "absolute" }}>{children}</Box>
          ) : (
            <>
              <Box sx={{ top: "0px", position: "absolute" }}>
                <img
                  src={breadcrumbImg}
                  alt={"breadcrumbImg"}
                  style={{ width: "165px", height: "165px" }}
                />
              </Box>
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Breadcrumb;