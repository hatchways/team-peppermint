import React from "react";
import Grid from "@material-ui/core/Grid";
import BackgroundImage from "../../components/bgImage";
import UserAuthForm from "../../components/userAuthForm";
import FormPageHeader from "../../components/formPageHeader";

function SignupPage() {
  
  return (
    <div style={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs-12>
          <BackgroundImage />
        </Grid>
        <Grid item xs>
          <FormPageHeader
            questionText="Already have an account?"
            buttonText="Login"
          />
          <UserAuthForm headerText="Create an account." />
        </Grid>
      </Grid>
    </div>
  );
}

export default SignupPage;
