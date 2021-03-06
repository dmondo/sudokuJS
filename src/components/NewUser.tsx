import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import { Store } from '../store/Store';
import '../style/Login.css';

const useStyles = makeStyles((theme) => ({
  margin: { margin: theme.spacing(1) },
  input: { color: 'white' },
}));

const NewUser = (): JSX.Element => {
  const classes = useStyles();
  const { state, dispatch } = React.useContext(Store);
  const { failedLogin } = state;

  const createAccount = async (): Promise<void> => {
    const data = {
      username: (document.getElementById('username') as HTMLInputElement).value,
      email: (document.getElementById('email') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value,
    };

    const url = '/users';

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

    const postUser = await fetch(url, options);

    if (postUser.status === 200) {
      const userData = await postUser.json();

      window.localStorage.setItem('sudokuJS', userData.token);
      window.localStorage.setItem('sudokuName', data.username);

      dispatch({ type: 'TOKEN', payload: userData.token });
      dispatch({ type: 'USER', payload: data.username });
      dispatch({ type: 'LOGIN', payload: true });
      dispatch({ type: 'FAILED', payload: false });
    } else {
      dispatch({ type: 'FAILED', payload: true });
    }
  };

  return (
    <div className={classes.margin}>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <AccountCircle />
        </Grid>
        <Grid item>
          <TextField
            id="username"
            label="username"
            color="secondary"
            InputProps={{ className: classes.input }}
          />
        </Grid>
        <Grid item>
          <EmailIcon />
        </Grid>
        <Grid item>
          <TextField
            id="email"
            label="email"
            color="secondary"
            InputProps={{ className: classes.input }}
          />
        </Grid>
        <Grid item>
          <VisibilityOffIcon />
        </Grid>
        <Grid item>
          <TextField
            id="password"
            label="password"
            type="password"
            color="secondary"
            InputProps={{ className: classes.input }}
          />
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="secondary"
            onClick={createAccount}
          >
            submit
          </Button>
        </Grid>
      </Grid>
      {failedLogin && <div className="failure">please try again</div>}
    </div>
  );
};

export default NewUser;
