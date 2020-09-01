import React from 'react'
import Grid from '@material-ui/core/Grid';

import BackgroundImage from '../../components/bgImage';
import UserAuthForm from '../../components/userAuthForm';
import FormPageHeader from '../../components/formPageHeader';


function LoginPage() {

  return (
    <div style={{flexGrow: 1}}>
      <Grid container spacing={1}>
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
    </div>
  )
}

export default LoginPage;