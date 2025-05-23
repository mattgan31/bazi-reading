import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, DatePicker, Input, SelectPicker, TimePicker } from 'rsuite';
import 'rsuite/dist/rsuite.css';


export default function Form() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [gender, setGender] = useState('');
  const [placement, setPlacement] = useState('bottomStart');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 640px)'); // Tailwind sm breakpoint
    const handleResize = () => {
      setPlacement(mediaQuery.matches ? 'auto' : 'bottomStart');
    };

    handleResize(); // set initial
    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!gender) {
      alert("Please select your gender.");
      return;
    }


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
        <div className='flex justify-between mt-4'>
          <div className='flex-1 text-left flex items-center'>
            <label>Fullname</label>
          </div>
          {/* <input type='text'
            name='fullname'
            placeholder='Insert your name'
            className='form-control border-1 px-2 py-1 rounded-sm'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required /> */}
          <div className='flex-1'>
            <Input
              name='fullname'
              placeholder='Insert your name'
              className=''
              value={name}
              style={{ width: '100%' }}
              onChange={(value) => setName(value)}
              required
              />
            </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex-1 text-left flex items-center'>
          <label>Birthdate</label>
          </div>
          {/* <input type='date'
            name='birthdate'
            placeholder='Insert your birthdate'
            className='form-control border-1 px-2 py-1 rounded-sm'
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required/> */}
          <div className='flex-1'>
          <DatePicker
            name='birthdate'
            className=''
              value={birthDate}
              style={{width: '100%'}}
              onChange={(value) => setBirthDate(value)}
              block
              placement={placement}
            />
            </div>
        </div>
        <div className='form-group'>
          <div className='flex-1 text-left flex items-center'>
            <label>Birth time</label>
          </div>
          {/* <input type='time'
            name='birthtime'
            placeholder='Insert your birthtime'
            className='form-control border-1 px-2 py-1 rounded-sm'
            value={birthTime}
            onChange={(e) => setBirthTime(e.target.value)}
            required/> */}
          <div className='flex-1'>

          <TimePicker
            name='birthtime'
            className=''
              value={birthTime}
              style={{width:'100%'}}
              onChange={(value) => setBirthTime(value)}
              block
              placement={placement}
            />
            </div>
        </div>
        <div className='form-group'>
          <div className='flex-1 text-left flex items-center'>
            <label>Select Gender</label>
          </div>
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
            {/* <select onChange={(e) => setGender(e.target.value)} className='form-control border-1 px-2 py-1 rounded-sm' required>
              <option value={''}>== Select your gender ==</option>
              <option value={'male'}>Male</option>
              <option value={'female'}>Female</option>
          </select> */}
          <div className='flex-1'>

          <SelectPicker
            data={[{label:"Male",value: "male"},{label:"Female", value: "female"}]}
            searchable={false}
            onChange={(value) => setGender(value)}
            style={{ width: '100%' }}
            className='w-full '
            required
            />
            </div>
        </div>
        <div className='form-group'>
          <label></label>
          <Button type='submit' color='red'>Submit</Button>
          {/* <input type='submit' placeholder='Submit' value="Submit" className='w-full md:w-30 border-1 py-1 px-2 rounded-sm bg-green-600 font-bold' /> */}
        </div>
      </form>
    </div>
  )
}
