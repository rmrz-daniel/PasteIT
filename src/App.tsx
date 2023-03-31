import { useState, useEffect, } from 'react'
import { listen } from '@tauri-apps/api/event'
import { appWindow } from '@tauri-apps/api/window';
import classNames from 'classnames';
import './App.css'
import Note from './note'

function App() {
  const [cb, setCb] = useState(new Set<string>());
  const [darkMode, setDarkMode] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [clearCheck, setClearCheck] = useState(false);
  const [settingsActive, setSettings] = useState(false);
  const [defaultColour, setDefaultColour] = useState("bg-l-bittersweet dark:bg-d-vanilla")

  appWindow.setAlwaysOnTop(true);


  useEffect(() => {
    const unlisten = listen('clip-board', (event) => {
      setCb(prev => new Set([...prev, (event.payload as string).trim()]));
      // setCb(prev => 
      //   new Set(
      //     [...prev, JSON.stringify({
      //       label:event.payload as string,
      //       content:event.payload as string,
      //       colour: defaultColour})
      //     ]
      //   ) 
      // )
    })


    console.log(cb);


  }, [cb] );



  return (
    <div className={classNames('App flex justify-center clip-container border-[1px] rounded-lg backdrop-blur-lg overflow-hidden min-h-[120px] max-h-[650px]', {'dark border-d-base-2': darkMode}, {'border-zinc-500':! darkMode}) }>
    <div className='absolute w-full h-full bg-white/10 dark:bg-d-base-1/10 -z-10'/>
      {/*<div className='absolute bottom-0 w-full h-16 bg-gradient-to-t from-slate-800/80' />*/}


      { menuActive ?
        <div className='flex flex-col justify-between absolute top-5 right-0 w-24 h-10 rounded-l-lg bg-l-base dark:bg-d-base-1 dark:text-l-base z-10'>
          <p className='text-sm px-2 hover:bg-l-base dark:hover:bg-d-base-2 rounded-tl-lg select-none cursor-pointer' onClick={() => {setMenuActive(!menuActive); setClearCheck(!clearCheck);}}>Clear</p>
          <p className='text-sm px-2 hover:bg-l-base dark:hover:bg-d-base-2 rounded-bl-lg select-none cursor-pointer' onClick={() => {setMenuActive(!menuActive); setSettings(!settingsActive);}}>Settings</p>
        </div>
        : null
      }



      {
        clearCheck ?
        <div className='text-center px-5 py-2 absolute top-1/2 left-1/2 border-[1px] border-l-base dark:border-d-base-2 bg-zinc-200 dark:bg-d-base-1 dark:text-l-base rounded-lg h-24 w-48 z-10 -translate-x-1/2 -translate-y-1/2 shadow-lg'>
          <p> Are you sure you wish to clear? </p>
          <div className='flex flex-row justify-evenly pt-1'>
            <p className='text-green-600 select-none cursor-pointer transition duration-300 hover:scale-110' onClick={() => {setClearCheck(!clearCheck); cb.clear(); }}>Yes!</p>
            <p className='text-red-600 select-none cursor-pointer transition duration-300 hover:scale-110' onClick={() => setClearCheck(!clearCheck)}>No</p>
          </div>
        </div>
        : null
      }

      
      <div data-tauri-drag-region className={classNames('select-none flex flex-col gap-2 items-center px-5 py-2 absolute top-0 left-0 bg-l-base dark:bg-d-base-1 dark:text-l-base rounded-r-lg h-full overflow-y-scroll  scrollbar w-44 z-10 shadow-lg transition-transform ease-in-out duration-500 delay-100',{'translate-x-0': settingsActive},{'-translate-x-48': !settingsActive },)}>
      
        <p className='text-lg font-semibold self-start'>Settings</p>
        <svg onClick={() => setSettings(!settingsActive)} className='absolute top-2 right-2 cursor-pointer duration-300 w-3 hover:scale-110 dark:fill-l-base' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg>
        

        <p className='text-xs'>Default note colour</p>
          <div className=' flex flex-row justify-evenly bg-zinc-200 dark:bg-d-base-2 shadow-inner w-[80%] rounded-lg gap-y-1 p-0.5 z-10'>
            <div onClick={() => setDefaultColour('bg-l-bittersweet dark:bg-d-vanilla')} className='w-3 h-3 rounded-full bg-l-bittersweet dark:bg-d-vanilla transition-transform duration-500 hover:scale-110 border border-transparent hover:ring-2 hover:ring-blue-400/40 cursor-pointer'></div>
            <div onClick={() => setDefaultColour('bg-l-oj dark:bg-d-old-rose')} className='w-3 h-3 rounded-full bg-l-oj dark:bg-d-old-rose transition-transform duration-500 hover:scale-110 border border-transparent hover:ring-2 hover:ring-blue-400/40 cursor-pointer'></div>
            <div onClick={() => setDefaultColour('bg-l-blue dark:bg-d-magenta')} className='w-3 h-3 rounded-full bg-l-blue dark:bg-d-magenta transition-transform duration-500 hover:scale-110 border border-transparent hover:ring-2 hover:ring-blue-400/40 cursor-pointer'></div>
          </div>
        <p className='text-xs pt-5'>Note size</p>
        <p className='text-xs font-bold text-red-400'>N/A</p>
        <p className='text-xs pt-5'>Theme</p>
        <div className='grid grid-cols-2 gap-2'>

          <div onClick={() => {setDarkMode(false); console.log("Dark off")}} className='flex flex-col gap-1 items-center shadow-inner bg-zinc-200 dark:bg-d-base-2 p-2 rounded-lg transition-transform duration-500 hover:scale-110 hover:ring-2 hover:ring-blue-400/40 cursor-pointer'>
            <div className='w-10 h-10 rounded-2xl overflow-hidden'>
              <svg id="visual" viewBox="0 0 40 40" width="40" height="40" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="M0 11L1.3 10.3C2.7 9.7 5.3 8.3 8 8.8C10.7 9.3 13.3 11.7 16 11.7C18.7 11.7 21.3 9.3 24 8.8C26.7 8.3 29.3 9.7 32 8.8C34.7 8 37.3 5 38.7 3.5L40 2L40 0L38.7 0C37.3 0 34.7 0 32 0C29.3 0 26.7 0 24 0C21.3 0 18.7 0 16 0C13.3 0 10.7 0 8 0C5.3 0 2.7 0 1.3 0L0 0Z" fill="#f5f5f4"></path><path d="M0 17L1.3 17.3C2.7 17.7 5.3 18.3 8 19.7C10.7 21 13.3 23 16 24.2C18.7 25.3 21.3 25.7 24 24C26.7 22.3 29.3 18.7 32 15.5C34.7 12.3 37.3 9.7 38.7 8.3L40 7L40 0L38.7 1.5C37.3 3 34.7 6 32 6.8C29.3 7.7 26.7 6.3 24 6.8C21.3 7.3 18.7 9.7 16 9.7C13.3 9.7 10.7 7.3 8 6.8C5.3 6.3 2.7 7.7 1.3 8.3L0 9Z" fill="#f3ceb2"></path><path d="M0 19L1.3 20.3C2.7 21.7 5.3 24.3 8 25.7C10.7 27 13.3 27 16 27.3C18.7 27.7 21.3 28.3 24 27.2C26.7 26 29.3 23 32 20.2C34.7 17.3 37.3 14.7 38.7 13.3L40 12L40 5L38.7 6.3C37.3 7.7 34.7 10.3 32 13.5C29.3 16.7 26.7 20.3 24 22C21.3 23.7 18.7 23.3 16 22.2C13.3 21 10.7 19 8 17.7C5.3 16.3 2.7 15.7 1.3 15.3L0 15Z" fill="#ff9a9d"></path><path d="M0 34L1.3 34.5C2.7 35 5.3 36 8 37.2C10.7 38.3 13.3 39.7 16 38.5C18.7 37.3 21.3 33.7 24 32.2C26.7 30.7 29.3 31.3 32 31.7C34.7 32 37.3 32 38.7 32L40 32L40 10L38.7 11.3C37.3 12.7 34.7 15.3 32 18.2C29.3 21 26.7 24 24 25.2C21.3 26.3 18.7 25.7 16 25.3C13.3 25 10.7 25 8 23.7C5.3 22.3 2.7 19.7 1.3 18.3L0 17Z" fill="#e36ec5"></path><path d="M0 41L1.3 41C2.7 41 5.3 41 8 41C10.7 41 13.3 41 16 41C18.7 41 21.3 41 24 41C26.7 41 29.3 41 32 41C34.7 41 37.3 41 38.7 41L40 41L40 30L38.7 30C37.3 30 34.7 30 32 29.7C29.3 29.3 26.7 28.7 24 30.2C21.3 31.7 18.7 35.3 16 36.5C13.3 37.7 10.7 36.3 8 35.2C5.3 34 2.7 33 1.3 32.5L0 32Z" fill="#3772ff"></path></svg>
            </div>
            <p className='font-light text-xs select-none'>Light</p>
          </div>

          <div onClick={() => {setDarkMode(true); console.log("Dark On")}} className='flex flex-col gap-1 items-center shadow-inner bg-zinc-200 dark:bg-d-base-2 p-2 rounded-lg transition-transform duration-500 hover:scale-110 hover:ring-2 hover:ring-blue-400/40 cursor-pointer'>
            <div className='w-10 h-10 rounded-2xl overflow-hidden'>
              <svg id="visual" viewBox="0 0 40 40" width="40" height="40" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="M0 7L1.3 7.7C2.7 8.3 5.3 9.7 8 10.2C10.7 10.7 13.3 10.3 16 11.5C18.7 12.7 21.3 15.3 24 16.5C26.7 17.7 29.3 17.3 32 15.7C34.7 14 37.3 11 38.7 9.5L40 8L40 0L38.7 0C37.3 0 34.7 0 32 0C29.3 0 26.7 0 24 0C21.3 0 18.7 0 16 0C13.3 0 10.7 0 8 0C5.3 0 2.7 0 1.3 0L0 0Z" fill="#334155"></path><path d="M0 7L1.3 8.2C2.7 9.3 5.3 11.7 8 14.5C10.7 17.3 13.3 20.7 16 22.7C18.7 24.7 21.3 25.3 24 25.2C26.7 25 29.3 24 32 22.8C34.7 21.7 37.3 20.3 38.7 19.7L40 19L40 6L38.7 7.5C37.3 9 34.7 12 32 13.7C29.3 15.3 26.7 15.7 24 14.5C21.3 13.3 18.7 10.7 16 9.5C13.3 8.3 10.7 8.7 8 8.2C5.3 7.7 2.7 6.3 1.3 5.7L0 5Z" fill="#5a516e"></path><path d="M0 32L1.3 32.5C2.7 33 5.3 34 8 34.8C10.7 35.7 13.3 36.3 16 35C18.7 33.7 21.3 30.3 24 28.2C26.7 26 29.3 25 32 24.7C34.7 24.3 37.3 24.7 38.7 24.8L40 25L40 17L38.7 17.7C37.3 18.3 34.7 19.7 32 20.8C29.3 22 26.7 23 24 23.2C21.3 23.3 18.7 22.7 16 20.7C13.3 18.7 10.7 15.3 8 12.5C5.3 9.7 2.7 7.3 1.3 6.2L0 5Z" fill="#87607b"></path><path d="M0 36L1.3 36.2C2.7 36.3 5.3 36.7 8 37.2C10.7 37.7 13.3 38.3 16 37.7C18.7 37 21.3 35 24 34.3C26.7 33.7 29.3 34.3 32 34.7C34.7 35 37.3 35 38.7 35L40 35L40 23L38.7 22.8C37.3 22.7 34.7 22.3 32 22.7C29.3 23 26.7 24 24 26.2C21.3 28.3 18.7 31.7 16 33C13.3 34.3 10.7 33.7 8 32.8C5.3 32 2.7 31 1.3 30.5L0 30Z" fill="#b1727c"></path><path d="M0 41L1.3 41C2.7 41 5.3 41 8 41C10.7 41 13.3 41 16 41C18.7 41 21.3 41 24 41C26.7 41 29.3 41 32 41C34.7 41 37.3 41 38.7 41L40 41L40 33L38.7 33C37.3 33 34.7 33 32 32.7C29.3 32.3 26.7 31.7 24 32.3C21.3 33 18.7 35 16 35.7C13.3 36.3 10.7 35.7 8 35.2C5.3 34.7 2.7 34.3 1.3 34.2L0 34Z" fill="#cd8b76"></path></svg>
            </div>
            <p className='font-light text-xs'>Dark</p>
          </div>

        </div>
      </div>
      
      <div data-tauri-drag-region className='flex flex-row justify-end absolute top-0 right-0 bg-l-base dark:bg-d-base-1 w-20 h-5 rounded-bl-lg z-20'>

        <div onClick={() => {setMenuActive(!menuActive)}} className='hover:cursor-pointer select-none w-5 flex justify-center items-center hover:bg-zinc-200 dark:hover:bg-d-base-2 transition duration-300'>
          <svg className='h-3 w-3 fill-d-base-1 dark:fill-l-base' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 14.187v-4.374c-2.148-.766-2.726-.802-3.027-1.529-.303-.729.083-1.169 1.059-3.223l-3.093-3.093c-2.026.963-2.488 1.364-3.224 1.059-.727-.302-.768-.889-1.527-3.027h-4.375c-.764 2.144-.8 2.725-1.529 3.027-.752.313-1.203-.1-3.223-1.059l-3.093 3.093c.977 2.055 1.362 2.493 1.059 3.224-.302.727-.881.764-3.027 1.528v4.375c2.139.76 2.725.8 3.027 1.528.304.734-.081 1.167-1.059 3.223l3.093 3.093c1.999-.95 2.47-1.373 3.223-1.059.728.302.764.88 1.529 3.027h4.374c.758-2.131.799-2.723 1.537-3.031.745-.308 1.186.099 3.215 1.062l3.093-3.093c-.975-2.05-1.362-2.492-1.059-3.223.3-.726.88-.763 3.027-1.528zm-4.875.764c-.577 1.394-.068 2.458.488 3.578l-1.084 1.084c-1.093-.543-2.161-1.076-3.573-.49-1.396.581-1.79 1.693-2.188 2.877h-1.534c-.398-1.185-.791-2.297-2.183-2.875-1.419-.588-2.507-.045-3.579.488l-1.083-1.084c.557-1.118 1.066-2.18.487-3.58-.579-1.391-1.691-1.784-2.876-2.182v-1.533c1.185-.398 2.297-.791 2.875-2.184.578-1.394.068-2.459-.488-3.579l1.084-1.084c1.082.538 2.162 1.077 3.58.488 1.392-.577 1.785-1.69 2.183-2.875h1.534c.398 1.185.792 2.297 2.184 2.875 1.419.588 2.506.045 3.579-.488l1.084 1.084c-.556 1.121-1.065 2.187-.488 3.58.577 1.391 1.689 1.784 2.875 2.183v1.534c-1.188.398-2.302.791-2.877 2.183zm-7.125-5.951c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.762 0-5 2.238-5 5s2.238 5 5 5 5-2.238 5-5-2.238-5-5-5z"/></svg>
        </div>

        <div onClick={ () => {appWindow.minimize()}} className='hover:cursor-pointer select-none w-5 flex justify-center items-center hover:bg-zinc-200 dark:hover:bg-d-base-2 transition duration-300'>
          <svg className='w-3 fill-d-base-1 dark:fill-l-base' clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21 11.75c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75z" fillRule="nonzero"/></svg>
        </div>

        <div onClick={ () => {appWindow.close()}} className='hover:cursor-pointer select-none w-5 flex justify-center items-center hover:bg-zinc-200 dark:hover:bg-d-base-2 transition duration-300'>
          <svg className='w-2 h-2 fill-d-base-1 dark:fill-l-base' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg>
        </div>
      </div>

      <div data-tauri-drag-region className={classNames('py-10 px-5 grid gap-4 grid-cols-4 max-h-[400px] overflow-y-auto overflow-x-hidden scrollbar w-full')}>
        {
          Array.from(cb).map(value => {
             return(
              <Note key={value} defaultColour={defaultColour} note={value} cb={cb} setCb={setCb}/>
            )}
          )
        }

{/*        {
          Array.from(cb).map(value => {
             return(
              <Note key={JSON.parse(value).content} note={JSON.parse(value)} cb={cb} setCb={setCb}/>
            )}
          )
        }*/}

      </div>

    </div>
  )
}

export default App
