import React, { useRef, useState } from 'react'
import { MdTableRestaurant } from "react-icons/md";
import NewTable from '../ui/NewTable';
import ExistingTable from '../ui/ExistingTable';

function AddTable() {

  const [selectedTable, setSelectedTable] = useState('new'); // 'new' or 'existing'

  return (
    <div>
      <section className='h-screen flex md:justify-end-safe w-full'>
        <div className='w-full flex flex-col gap-5 items-center bg-[#FBF9F0]'>

          <div>
            <h1 className='flex gap-2 items-center text-2xl md:text-3xl font-semibold text-gray-500'>
              Table Adding Section
              <MdTableRestaurant className='animate-pulse' />
            </h1>
          </div>

          <div className='flex gap-2'>

            <div className='shadow p-2 flex gap-5 justify-center items-center'>
              <label>Enter Into Existing :</label>
              <input
                type='radio'
                name='tableType'
                value='existing'
                checked={selectedTable === 'existing'}
                onChange={(e) => setSelectedTable(e.target.value)}
              />
            </div>

            <div className='shadow p-2 flex gap-5 justify-center items-center'>
              <label>New Table Setting</label>
              <input
                type='radio'
                name='tableType'
                value='new'
                checked={selectedTable === 'new'}
                onChange={(e) => setSelectedTable(e.target.value)}
              />
            </div>

          </div>

          {selectedTable === 'new' && <NewTable />}
          {/* If you want something for existing too */}
          {selectedTable === 'existing' && <ExistingTable />}

        </div>
      </section>
    </div>
  )
}

export default AddTable
