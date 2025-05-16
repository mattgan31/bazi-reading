import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Form() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate('/result',
      {
        state: {
          name: name,
          birthDate: birthDate,
          birthTime: birthTime,
          gender: gender
        },
      }
    )
  }
  return (
    <div className='p-4 lg:p-0'>
      <form onSubmit={handleSubmit} method='GET' className='flex flex-col gap-2'>
        <div className='form-group mt-4'>
          <label>Fullname</label>
          <input type='text'
            name='fullname'
            placeholder='Insert your name'
            className='form-control border-1 px-2 py-1 rounded-sm'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required/>
        </div>
        <div className='form-group'>
          <label>Birthdate</label>
          <input type='date'
            name='birthdate'
            placeholder='Insert your birthdate'
            className='form-control border-1 px-2 py-1 rounded-sm'
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required/>
        </div>
        <div className='form-group'>
          <label>Birth time</label>
          <input type='time'
            name='birthtime'
            placeholder='Insert your birthtime'
            className='form-control border-1 px-2 py-1 rounded-sm'
            value={birthTime}
            onChange={(e) => setBirthTime(e.target.value)}
            required/>
        </div>
        <div className='form-group'>
          <label>Select Gender</label>
          {/* <div className='flex gap-2'>
            <input type='radio'
              name='gender'
              value={'male'}
              checked={gender === 'male'}
              onChange={(e) => setGender(e.target.value)} />
            <label>Male</label>
          </div>
          <div className='flex gap-2'>
            <input type='radio'
              name='gender'
              value={'female'}
              checked={gender === 'female'}
              onChange={(e) => setGender(e.target.value)} />
            <label>Female</label>
          </div> */}
            <select onChange={(e) => setGender(e.target.value)} className='form-control border-1 px-2 py-1 rounded-sm' required>
              <option value={''}>== Select your gender ==</option>
              <option value={'male'}>Male</option>
              <option value={'female'}>Female</option>
            </select>
        </div>
        <div className='form-group'>
          <label></label>
          <input type='submit' placeholder='Submit' value="Submit" className='border-1 py-1 px-2 rounded-sm bg-green-600 font-bold' />
        </div>
      </form>
    </div>
  )
}
