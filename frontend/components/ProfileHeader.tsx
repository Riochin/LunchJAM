// components/ProfileHeader.tsx
import React from 'react';
import { Avatar, Typography, Box } from '@mui/material';

interface ProfileHeaderProps {
  name: string;
  status: string;
  imageUrl: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  status,
  imageUrl,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding="2rem"
      sx={{
        backgroundColor: '#f0e6d2', // 背景色
        borderRadius: '1rem',
        margin: '1rem',
      }}
    >
      <Avatar
        src={imageUrl}
        sx={{ width: 100, height: 100, marginBottom: '1rem' }}
      />
      <Typography variant="h6" sx={{ color: '#333' }}>
        {name}
      </Typography>
      <Typography variant="body2" sx={{ color: '#666' }}>
        {status}
      </Typography>
    </Box>
  );
};

export default ProfileHeader;
