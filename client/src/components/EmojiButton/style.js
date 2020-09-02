import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Menu } from "@material-ui/core";
export const StyledMenu = withStyles({
    paper: {
        border: "1px solid #d3d4d5",
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: "top",
            horizontal: "left",
        }}
        transformOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        {...props}
    />
));
