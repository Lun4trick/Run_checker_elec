import React from 'react'
import RunModal from './RunModal'
import ChipPerGameModal from './ChipPerGameModal'
import { HandType } from '@/types/handType'

interface DashboardProps {
  dataByday: HandType[];
  dataByTour: HandType[];
}

function Dashboard({ dataByday, dataByTour }: DashboardProps) {
  return (
    <div className='flex flex-col gap-10 h-full w-full bg-slate-800 p-4'>
      <h1 className='text-center text-3xl'>Dashboard</h1>
      <RunModal dbData={dataByday} />
      <ChipPerGameModal dbData={dataByTour}/>
    </div>
  )
}

export default Dashboard