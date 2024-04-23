import { calculateChipPerGame } from '@/helpers/calculateChipPerGame'
import { HandType } from '@/types/handType';
import React from 'react'
import cn from 'classnames'

interface ChipPerGameModalProps {
  dbData: HandType[];
}

function ChipPerGameModal({ dbData }: ChipPerGameModalProps) {
  const { chipsWon, gamesPlayed, chipPerGame } = calculateChipPerGame(dbData);

  return (
      <div className='w-full bg-slate-900 flex flex-col gap-3 text-2xl border-2 border-slate-400 text-slate-300 rounded-2xl p-4 drop-shadow-lg bg-opacity-35'>
        <h1 className='mx-auto'>Összesített adat</h1>
        <h1>c/g</h1>
        <p
          className={cn(
            'font-bold text-2xl',
            chipPerGame >= 0 ? 'text-green-500' : 'text-red-500'
        )}
        >
          {chipPerGame.toFixed(2)}
        </p>
        <h1>Összes nyert zseton a periódus alatt:</h1>
        <p
          className={cn(
            'font-bold text-2xl',
            chipsWon >= 0 ? 'text-green-500' : 'text-red-500'
        )}
        >
          {chipsWon}
        </p>
        <h1>Játékok száma:</h1>
        <p>{gamesPlayed}</p>
      </div>
  )
}

export default ChipPerGameModal