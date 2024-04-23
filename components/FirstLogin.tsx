import React from 'react'

function FirstLogin() {
  return (
    <div className='flex justify center items-center w-full h-full bg-slate-800'>
      <h1 className='text-center text-red-300'>
        Állítsd be az adatbázist a beállítások menüpontban, a saját postgres adataiddal.
        <br />
        Ezután a főoldalon láthatod a következő napot, ami kikerül a periódusból.
        <br />
        Ha nem tudod mik a belépő adataid, egyedül a pw, és a DB neve nincs kitöltve, az alapértelmezett dbpass ha minden igaz.
      </h1>
    </div>
  )
}

export default FirstLogin