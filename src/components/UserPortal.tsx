import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Board from './Board';
import '../style/userPortal.css';
import { Store } from '../store/Store';
import { solveBoard } from '../../lib/utils';

const UserPortal = (): JSX.Element => {
  const { state, dispatch } = React.useContext(Store);
  useEffect(() => {
    (async () => {
      const data = await fetch('/puzzles');
      const puzzles = await data.json();
      const randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
      const inProgress = randomPuzzle.puzzle.map((row: (string|number)[]) => row.slice());
      const emptySolution = randomPuzzle.puzzle.map((row: (string|number)[]) => row.slice());
      dispatch({ type: 'PUZZLE', payload: inProgress });
      dispatch({ type: 'START', payload: emptySolution });
      dispatch({ type: 'PUZZLES', payload: puzzles });
    })();
  }, []);

  const getSolved = () => {
    const { startingPuzzle } = state;
    const solvedPuzzle = solveBoard(startingPuzzle);
    dispatch({ type: 'SOLUTION', payload: solvedPuzzle });
  };

  const removeSolved = () => {
    dispatch({ type: 'SOLUTION', payload: false });
  };

  const newPuzzle = () => {
    const { allPuzzles } = state;
    const rdmPuzzle = allPuzzles[Math.floor(Math.random() * allPuzzles.length)];
    const inProgress = rdmPuzzle.puzzle.map((row: (string|number)[]) => row.slice());
    const emptySolution = rdmPuzzle.puzzle.map((row: (string|number)[]) => row.slice());
    dispatch({ type: 'PUZZLE', payload: inProgress });
    dispatch({ type: 'START', payload: emptySolution });
    dispatch({ type: 'SOLUTION', payload: false });
  };

  return (
    <>
      <Grid item xs={12}>
        <Grid container justify="flex-start" spacing={2}>
          <Grid item sm={6}>
            <Board solved={false} />
            <Button
              variant="contained"
              color="secondary"
              onClick={getSolved}
            >
              solve
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={newPuzzle}
            >
              new
            </Button>
          </Grid>
          <Grid item sm={6}>
            {state.solution && <Board solved />}
            {state.solution && (
              <Button
                variant="contained"
                color="primary"
                onClick={removeSolved}
              >
                hide
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default UserPortal;
