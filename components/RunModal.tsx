import { HandType } from '@/types/handType'
import React from 'react'
import cn from 'classnames'

interface RunModalProps {
  dbData: HandType[];
}

function RunModal({ dbData }: RunModalProps) {
  const lastDay = dbData[dbData.length - 1];
  const halfYear = 180 * 24 * 60 * 60 * 1000;
  const getDate = () => {
    const date = new Date().setFullYear(lastDay.yearPlayed, lastDay.monthPlayed - 1, lastDay.dayPlayed);
    return new Date(date + halfYear).toLocaleDateString();
  }
  return (
    <div className='flex flex-col gap-3 text-2xl border-2 border-slate-400 text-slate-300 rounded-2xl p-4 bg-slate-900 bg-opacity-35'>
      <h1 className='mx-auto'>Napi Adat</h1>
      <h1>Következő nap:</h1>
      <p
      className={cn(
        'font-bold text-2xl',
        lastDay.chipsWon >= 0 ? 'text-green-500' : 'text-red-500'
      )}
      >
        {lastDay.chipsWon}
      </p>
      <h1>kikerül a periódusból:</h1>
      <p>{getDate()}</p>
    </div>
  )
}

export default RunModal