import React, { useState } from 'react'
import { saveSettings } from '@/helpers/saveSetting';

function Settings() {

  const [dbHost, setDbHost] = useState('localhost');
  const [dbPort, setDbPort] = useState(5432);
  const [dbPass, setDbPass] = useState('');
  const [dbName, setDbName] = useState('');

  const onSave = () => {
    saveSettings({
      host: dbHost,
      port: dbPort,
      database: dbName,
      password: dbPass
    })
  }


  return (
    <div className='flex items-center flex-col w-full h-full bg-slate-800 gap-5'>
      <h1 className='text-3xl mt-8'>Beállítások</h1>
      <div>
        <p>Database host: </p>
        <input
          className='p-1 rounded-lg mt-2 text-black'
          type="text" 
          placeholder='localhost'
          value={dbHost}
          onChange={(e) => setDbHost(e.target.value)}
        />
      </div>

      <div>
        <p>Port: </p>
        <input
          className='p-1 rounded-lg mt-2 text-black'
          type="number" 
          placeholder='5432'
          value={dbPort}
          onChange={(e) => setDbPort(Number(e.target.value))}
        />
      </div>

      <div>
        <p>Database name: </p>
        <input
          className='p-1 rounded-lg mt-2 text-black'
          type="text" 
          placeholder='db neve'
          value={dbName}
          onChange={(e) => setDbName(e.target.value)}
        />
      </div>

      <div>
        <p>Database pw: </p>
        <input
          className='p-1 rounded-lg mt-2 text-black'
          type="password" 
          placeholder='db pass'
          value={dbPass}
          onChange={(e) => setDbPass(e.target.value)}
        />
      </div>
      <button 
        className='mt-5 p-2 border-2 rounded-lg hover:bg-slate-500 transition-all hover:scale-110'
        onClick={onSave}
      >
        Mentés
      </button>
    </div>
  )
}

export default Settings