import { TextField, Button, Grid, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.5rem',
  gap: '1rem',
});

const StyledTextField = styled(TextField)({
  flex: '1',
  marginRight: '1rem',
});

const StyledButton = styled(Button)({
  color: '#fff',
  backgroundColor: '#3f51b5',
  '&:hover': {
    backgroundColor: '#303f9f',
  },
});

export default function Form({ onSubmit, setMessage }) {
  return (
    <StyledBox>
      <StyledTextField
        variant="outlined"
        type="text"
        onChange={(e) => setMessage(e.target.value)}
        name="message"
      />
      <StyledButton
        variant="contained"
        type="submit"
        onClick={onSubmit}
      >
        Send
      </StyledButton>
    </StyledBox>
  );
}