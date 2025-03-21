// components/ProfileInfo.tsx
import React from 'react';
import { Typography, Box } from '@mui/material';

interface ProfileInfoProps {
  role: string;
  department: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ role, department }) => {
  return (
    <Box
      padding="1rem"
      sx={{
        backgroundColor: '#f0e6d2', // 背景色
        borderRadius: '1rem',
        margin: '1rem',
      }}
    >
      <Typography variant="subtitle1" sx={{ color: '#333' }}>
        あなた: {role}
      </Typography>
      <Typography variant="subtitle1" sx={{ color: '#333' }}>
        メールアドレス: ***
      </Typography>
      <Typography variant="subtitle1" sx={{ color: '#333' }}>
        総ポイント数: 10pt
      </Typography>
    </Box>
  );
};

export default ProfileInfo;
