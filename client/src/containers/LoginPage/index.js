import React from 'react'
import Grid from '@material-ui/core/Grid';

import BackgroundImage from '../../components/bgImage';
import UserAuthForm from '../../components/userAuthForm';
import FormPageHeader from '../../components/formPageHeader';


function LoginPage() {

  return (
 
      <Grid container>
        <Grid item xs>
          <BackgroundImage />
        </Grid>
        <Grid item xs>
          <FormPageHeader 
            questionText="Don't have an account?" 
            buttonText="Create account"
          />
          <UserAuthForm 
            headerText="Welcome Back!"
          />
        </Grid>
      </Grid>
    
  )
}

export default LoginPage;