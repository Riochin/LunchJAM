// components/ProfileStatus.tsx
'use client';

import React, { useState } from 'react';
import { Typography, Box, Paper } from '@mui/material';

interface Coupon {
  id: number;
  title: string;
  description: string;
}

interface ProfileStatsProps {
  steps: number;
  sleepTime: string;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ steps, sleepTime }) => {
  const [coupons, setCoupons] = useState<Coupon[]>([
    { id: 1, title: '3/14', description: '3/14 11:20 入室' },
    { id: 2, title: '3/14', description: '3/14 12:40 退室' },
    { id: 3, title: '3/15', description: '3/15 12:20 入室' },
    { id: 4, title: '3/15', description: '3/15 12:40 退室' },
  ]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const handleCouponClick = (coupon: Coupon) => {
    if (selectedCoupon && selectedCoupon.id === coupon.id) {
      setSelectedCoupon(null);
    } else {
      setSelectedCoupon(coupon);
    }
  };

  return (
    <Box
      padding="1rem"
      sx={{
        backgroundColor: '#f0e6d2', // 背景色
        borderRadius: '1rem',
        margin: '1rem',
      }}
    >
      <Typography variant="h6" sx={{ color: '#333' }}>
        入退室履歴
      </Typography>
      <Box>
        {coupons.map((coupon) => (
          <Paper
            key={coupon.id}
            elevation={2}
            sx={{
              padding: '1rem',
              marginBottom: '1rem',
              cursor: 'pointer',
              backgroundColor: '#fff', // クーポンボックスの背景色
            }}
            onClick={() => handleCouponClick(coupon)}
          >
            <Typography variant="subtitle1" sx={{ color: '#333' }}>
              {coupon.title}
            </Typography>
            {selectedCoupon && selectedCoupon.id === coupon.id && (
              <Typography variant="body2" sx={{ color: '#666' }}>
                {coupon.description}
              </Typography>
            )}
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default ProfileStats;
