import { theme } from "@libs/mui";
import { makeStyles } from "@mui/material";

const styles = makeStyles(theme=>({
    appBar: {
        boxShadow: 'none',
        backgroundColor : 'white',
        color : 'black'
    }
}))
export default styles;