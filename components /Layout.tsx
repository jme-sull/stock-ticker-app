import { AppBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface LayoutProps {
  children: any;
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    background: "#007cad",
    height: 60,
    padding: "0 30px",
  },
});

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
        <AppBar />
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
