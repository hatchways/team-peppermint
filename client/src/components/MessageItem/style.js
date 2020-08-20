import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root:{  
        width: "100%",
        padding: theme.spacing(2),


    },
    messageView:{
        display: "flex",
        '&.my':{
            justifyContent:"flex-end"
        },
        '&.other':{
            justifyContent:"flex-start"
        }
        
    },
    messageInfo:{
        marginLeft: theme.spacing(2),
    },
    messageDetails:{
        fontSize: "0.7em",
        '&.my':{
            textAlign:"right"
        },
        '&.other':{
            textAlign:"left"
        }
    },
    messageText:{
        borderRadius: 10,
        padding: 10,
        '&.my':{ 
            textAlign:"right",
            borderBottomRightRadius: 0,
            background: "lightgrey",
            color: "black"
        },
        '&.other':{
            borderTopLeftRadius: 0,
            background: "linear-gradient(130deg, rgba(39,31,208,1) 0%, rgba(32,167,253,1) 75%, rgba(106,194,255,1) 100%)",
            color: "white"
        }

    }
    
}))