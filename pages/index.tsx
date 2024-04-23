import Dashboard from '@/components/Dashboard';
import FirstLogin from '@/components/FirstLogin';
import Loader from '@/components/Loader';
import React, { useEffect, useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedDataByDay, setLoadedDataByDay] = useState([]);
  const [loadedDataByTour, setLoadedDataByTour] = useState([]);
  const [isFirstUse, setIsFirstUse] = useState<boolean>();

  const checkIsFirstUse = async() => {
    const isFirstUse = await (window as any).api.getIsFirstUse();
    return isFirstUse;
  };

  const loadDb = async () => {
    const firstUse = await checkIsFirstUse();
    
    if (firstUse) {
      setIsFirstUse(true);
      setIsLoading(false);
      return;
    } else {
      const isDbConnected = await (window as any).api.connectToDb();

      try {
        if (isDbConnected) {
          console.log('Database connected')
          await (window as any).api.loadDbData('mergedHands');
          const dbDataByDay = await (window as any).api.getDbData();
          const dbDataByTour = await (window as any).api.getMergedByTourData();
          setLoadedDataByDay(JSON.parse(dbDataByDay) || []);
          setLoadedDataByTour(JSON.parse(dbDataByTour) || []);
        } else {
          console.error('Error: Database not connected');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
      loadDb();
  }
  , []);

  useEffect(() => {
    console.log(loadedDataByDay);
  }, [loadedDataByDay]);

  return (
    <div className='bg-zinc-850 h-full w-full'>
      {isLoading
        ? <Loader />
        : <>
          {
            isFirstUse 
              ? <FirstLogin />
              : <Dashboard dataByTour={loadedDataByTour} dataByday={loadedDataByDay} />
          }
        </>}
    </div>
  );
}
