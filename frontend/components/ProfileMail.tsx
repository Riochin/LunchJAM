// components/ProfileMail.tsx
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

const ProfileMail: React.FC<ProfileStatsProps> = ({ steps, sleepTime }) => {
  const [coupons, setCoupons] = useState<Coupon[]>([
    { id: 1, title: '3/14 今日のメニュー', description: 'ハンバーグ' },
    { id: 2, title: '3/15 今日のメニュー', description: 'カツカレー' },
    { id: 3, title: '3/16 今日のメニュー', description: 'アイスクリーム' },
    { id: 4, title: '3/17 今日のメニュー', description: 'カツ丼' },
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
        お知らせ
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

export default ProfileMail;
