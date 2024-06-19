import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, Typography, Card, CardContent, CardHeader, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const StyledBox = styled(Box)({
  backgroundColor: '#f5f5f5',
  borderRadius: '10px',
  margin: '10px',
  padding: '10px',
});

const StyledListItem = styled(ListItem)({
  margin: '10px',
  borderRadius: '10px',
  '&:hover': {
    backgroundColor: '#ddd',
  },
});

const StyledCard = styled(Card)({
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: '0.3s',
  borderRadius: '5px', 
  margin: '10px',
  '&:hover': {
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
  },
});

export default function Conversations({ user, setPreviousMessages, setPreviousResponses, setChatName, setLoaded }) {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getChats() {
      try {
        const response = await fetch("http://localhost:5000/allchats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userid: user._id,
          }),
        });
        const data = await response.json();
        setChats(data.chats);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getChats();
  }, [user._id]);

  function handleChatClick(chat) {
    setPreviousMessages(chat.messages);
    setPreviousResponses(chat.responses);
    setChatName(chat.chatName);
    setLoaded(true);
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <ErrorOutlineIcon color="error" style={{ fontSize: 60 }} />
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <StyledBox>
      <Typography variant="h4" gutterBottom component="div">
        Conversations
      </Typography>
      <List>
        {chats.map((chat, index) => (
          <StyledListItem 
            key={index} 
            button 
            onClick={() => handleChatClick(chat)}
          >
            <StyledCard>
              <CardHeader
                title={chat.chatName}
                subheader={`Last Message: ${chat.lastMessage}`}
              />
            </StyledCard>
          </StyledListItem>
        ))}
      </List>
    </StyledBox>
  );
}