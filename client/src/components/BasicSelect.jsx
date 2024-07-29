// BasicSelect.jsx
import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; // Import ArrowDropDownIcon
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const BasicSelect = ({ age, setAge }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen size is mobile


  const handleChange = (event) => {
    document.cookie = "Model=" + event.target.value;
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: isMobile? '97vw':780, textAlign: 'center', bgcolor: '#1C253A', borderRadius: '0.5rem', position: 'relative' }}>
      <FormControl fullWidth>
        <Select
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
          IconComponent={ArrowDropDownIcon} // Use ArrowDropDownIcon for the dropdown icon
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            getContentAnchorEl: null,
            PaperProps: {
              style: {
                
                backgroundColor: '#111622', // Background color for menu items
                color: '#fff', // Text color for menu items
                maxHeight: isMobile ?'75rem':'300px', // Set maximum height for the menu
                borderRadius: '0.5rem', // Set border radius for the menu
              },
            },
          }}
          sx={{
            '& .MuiInputBase-input': {
              color: '#fff', // Text color
              fontSize: isMobile ? '3.2rem' : '1.6rem', // Font size for selected value
              textAlign: 'center',
              
              fontWeight: 'bold',
              paddingTop: isMobile? '2.6rem':'',
              paddingBottom: isMobile? '0':'0.95rem'
            },
            '& .MuiSelect-icon': {
              
              color: '#fff', // Dropdown icon color
              right: '10px', // Position the icon
              //top: 'calc(50% - 12px)', // Position the icon vertically centered
              position: 'absolute', // Position the icon absolutely
              fontSize: isMobile ? '5rem' : '2.5rem',
            },
            '& .MuiMenuItem-root': {
              //fontSize: '88rem !important', // Font size for options
              textAlign: 'center', // Center align the text
            },
            '& .MuiSelect-select': {
              
              textAlign: 'center', // Center align the selected text
            },
            borderRadius: '0.5rem',
             // Set border radius for the select component
          }}
        > 
          <MenuItem value={"GoogleGemini(InternetAccessEnabled)"} style={{ fontSize: isMobile ? '2.5rem': '1.3rem' }}>Google Gemini 1.5 Flash (Web Search)</MenuItem>
          <MenuItem value={"Google-gemma-2-9b"}style={{ fontSize: isMobile ? '2.5rem': '1.3rem' }}>Google Gemma2 9B</MenuItem>
          <MenuItem value={"Mixtral8x22BInstruct"}style={{ fontSize: isMobile ? '2.5rem': '1.3rem' }}>Mixtral 8x22B Instruct</MenuItem>
          <MenuItem value={"Mixtral8x7BInstruct"} style={{ fontSize: isMobile ? '2.5rem': '1.3rem' }}>Mixtral 8x7B Instruct</MenuItem>
          <MenuItem value={"Mistral7BInstruct"}style={{ fontSize: isMobile ? '2.5rem': '1.3rem' }}>Mistral 7B Instruct</MenuItem>
          <MenuItem value={"llama-3.1-405b-instruct"}style={{ fontSize: isMobile ? '2.5rem': '1.3rem' }}>Llama 3.1 405B Instruct</MenuItem>
          <MenuItem value={"llama-3.1-8b-instruct"}style={{ fontSize: isMobile ? '2.5rem': '1.3rem' }}>Llama 3.1 8B Instruct</MenuItem>
          
        </Select>
      </FormControl>
    </Box>  
  );
}

export default BasicSelect;




