import React from 'react';
import { Button, TextField } from '@mui/material';
import { FaSearch } from 'react-icons/fa';

export const Navbar = ({ handleSubmit, inputValue,setInputValue, handleInputChange }) => {
  return (
    <div className='navigation'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
          setInputValue('')
        }}
      >
        <TextField 
          id="standard-basic"
          label="Search by city name or coordinates" 
          variant="outlined" 
          onChange={handleInputChange}
          value={inputValue}
          InputLabelProps={{
            style: { color: '#3963b3' },
          }}
        />
  
        <Button onClick={handleSubmit} variant="outlined">
          <FaSearch className='icon' />
        </Button>
      </form>
    </div>
  );
};

