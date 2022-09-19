import {Link as RouterLink, useLocation} from "react-router-dom";
// material
import {styled} from "@mui/material/styles";
import {AppBar, Badge, Box, Toolbar} from "@mui/material";
// hooks
import useOffSetTop from "../../hooks/useOffSetTop";
// components
import {MHidden} from "../../components/@material-extend";
import Logo from '../../assets/renzito-logo.jpg'
//
import MenuMobile from "./MenuMobile";
import navConfig from "./menuConfig";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const ToolbarStyle = styled(Toolbar)(({theme}) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(["height", "background-color"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up("md")]: {
    height: APP_BAR_DESKTOP,
  },
}));

const ToolbarShadowStyle = styled("div")(({theme}) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  backgroundColor: '#fff',
  margin: "auto",
  borderRadius: "50%",
  position: "absolute",
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));


// ----------------------------------------------------------------------

export default function Header() {
  const isOffset = useOffSetTop(1);
  const {pathname} = useLocation();
  const isHome = pathname === "/";

  return (
    <AppBar sx={{boxShadow: 0, bgcolor: "transparent"}}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            bgColor: "background.default",
            height: {md: APP_BAR_DESKTOP - 20},
          }),
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            backgroundColor: 'white',
            justifyContent: "space-between",
            px: 2,
          }}
        >
          <RouterLink to="/">
            {/*<Logo/>*/}
            <MHidden width='mdDown'>
              <img src={Logo} width={40} alt="kamiranime logo"/>
            </MHidden>
            <MHidden width='mdUp'>
              <img src={Logo} width={40} alt="kamiranime logo"/>
            </MHidden>
          </RouterLink>

          <MHidden width="mdUp">
            <MenuMobile
              isOffset={isOffset}
              isHome={isHome}
              navConfig={navConfig}
            />
          </MHidden>
        </Box>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle/>}
    </AppBar>
  );
}

