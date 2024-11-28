'use client';
import { useState, useEffect } from 'react';
import ErrorHandler from '@/utils/error-handler';
import axiosInstance from '@/lib/axios';

import { IUser } from './types';
import MyEventList from '../myevents';
import MyTicketsList from '../mytickets';
import OrganizerEventTransactionsList from '../organizer';

// Fungsi untuk memformat angka menjadi format IDR
// function convertIDR(value: number) {
//   return value.toLocaleString('id-ID', {
//     style: 'currency',
//     currency: 'IDR',
//   });
// }

export default function DashboardView() {
  const [user, setUser] = useState<IUser | null>(null);
  const [points, setPoints] = useState<number>(0); // State terpisah untuk poin

  const getUser = async () => {
    try {
      const { data } = await axiosInstance.get('/auth/me');
      // console.log('[Dasboard] Data User:', data.data);
      setUser(data.data);
    } catch (err) {
      ErrorHandler(err);
    }
  };

  const getUserPoints = async (userId: number) => {
    try {
      const { data } = await axiosInstance.post('/auth/check-points', {
        userId,
      });
      // Menghitung total poin dari respons jika ada beberapa entri
      const totalPoints = data.points.reduce(
        (acc: number, point: { points: number }) => acc + point.points,
        0,
      );
      setPoints(totalPoints); // Update state points
    } catch (err) {
      ErrorHandler(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUser();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user?.UserID) {
      getUserPoints(user.UserID); // Panggil getUserPoints jika user telah diperoleh
    }
  }, [user]);

  return (
    <div className="dasboard">
      <div className="mx-auto max-w-lg flex flex-col text-center justify-center section-spacing">
        <h1 className="text-2xl font-semibold text-gray-900">
          Hello {user?.firstname} {user?.lastname}
        </h1>
      </div>
      <div className="w-full">
        {user?.role === 'Organizer' && <OrganizerEventTransactionsList />}
        {user?.role === 'Organizer' && <MyEventList />}
        <MyTicketsList />
      </div>
    </div>
  );
}
