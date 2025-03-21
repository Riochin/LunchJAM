// pages/profile.tsx
import React from 'react';
import ProfileHeader from '../../../components/ProfileHeader';
import ProfileInfo from '../../../components/ProfileInfo';
import ProfileStats from '../../../components/ProfileStatus';
import { Box } from '@mui/material';
import Header from '../../../components/Header';
import ProfileMail from '../../../components/ProfileMail';
import Typography from '@mui/material';

const ProfilePage: React.FC = () => {
  const chartData = [
    { name: '100', value: 4000 },
    { name: '200', value: 3000 },
    { name: '300', value: 2000 },
    { name: 'ONE', value: 2780 },
    { name: '500', value: 1890 },
    { name: '600', value: 2390 },
    { name: '700', value: 3490 },
    { name: '800', value: 2000 },
    { name: '900', value: 4000 },
  ];

  return (
    <Box
      sx={{
        backgroundColor: '#f8eedc', // 背景色
        minHeight: '100vh',
        padding: '1rem',
      }}
    >
      <Header />
      <ProfileHeader
        name="User"
        status="入室中"
        imageUrl="/images/profile.jpg"
      />
      Profile
      <ProfileInfo role="学生" department="開発部" />
      <ProfileStats steps={5000} sleepTime="8時間" />
      <ProfileMail steps={5000} sleepTime="8時間" />
    </Box>
  );
};

export default ProfilePage;
