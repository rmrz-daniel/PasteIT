import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { writeText } from '@tauri-apps/api/clipboard';
import classNames from 'classnames';
import { useLongPress } from 'use-long-press';

interface Props {
	children?: ReactNode,
	note: string,
	cb: Set<string>
	setCb: Dispatch<SetStateAction<Set<string>>>,
	defaultColour: string,
}

interface cbNote{
label: string,
content: string,
colour: string,
}


async function noteClick(msg: string) {
	await writeText(msg);
}

function Note({ children, ...props }: Props){
	const [edit, setEdit] = useState(false);
	const [note, setNote] = useState<cbNote>({
		label: props.note,
		content: props.note,
		colour: props.defaultColour,
	});

	// const note = props.note;
	const cb = new Set(props.cb);

	const deleteNote = () => {
		console.log("deleted")
		cb.delete(note.content)
		props.setCb(cb);
	}

	const longPress = useLongPress(()=>{
		setEdit(true);
		console.log(edit)
	})

	const editNote = () => {
		// cb.delete(JSON.stringify(note));
		// props.setCb(cb);
		// props.setCb(prev => new Set([...prev, JSON.stringify(newNote)]) );
		setEdit(false);
	}

	useEffect(() => {

  	}, [edit] );


  	const noteclass = classNames(
  		`group relative flex h-24 w-[4.6rem] ${note.colour} drop-shadow-xl rounded-lg text-l-base dark:text-d-base-1 rounded-tr-3xl justify-center
  		items-center cursor-pointer select-none overflow-hidden subpixel-antialiased`,
		{'animate-wiggle': edit},
		{'transition-transform duration-500 hover:scale-105 opacity-90 hover:opacity-100': !edit},
	)

	return (
		<div title={note.content}>
			{ edit
				? <div onClick={editNote} className='absolute top-2 left-5 bg-l-base dark:bg-d-base-1 dark:text-l-base rounded-full px-2 text-sm font-semibold select-none transition-transform duration-500 hover:scale-105 cursor-pointer'>Done</div>
				: null
			}

			<div className={noteclass}> 
				<div className='bg-zinc-200 dark:bg-d-base-3 absolute w-4 h-4 top-0 right-0 rounded-bl-sm'/>
				{ edit ?
					<>
						<div onClick={deleteNote} className='absolute w-4 h-4 top-1 left-1 z-10'>
		  					<svg className='opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-500 delay-200 w-3 fill-zinc-200 dark:fill-d-base-2 hover:scale-110' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg>
		  				</div>

		  				<div className='absolute bottom-1 flex flex-row justify-evenly bg-zinc-200 dark:bg-d-base-2 w-[80%] rounded-lg gap-y-1 p-0.5 z-10 shadow-xl'>
		  					<div onClick={() => setNote({...note, colour: 'bg-l-bittersweet dark:bg-d-vanilla'})} className='w-3 h-3 rounded-full bg-l-bittersweet dark:bg-d-vanilla transition-transform duration-500 hover:scale-110 border border-transparent hover:ring-2 hover:ring-blue-400/40'></div>
		  					<div onClick={() => setNote({...note, colour: 'bg-l-oj dark:bg-d-old-rose'})} className='w-3 h-3 rounded-full bg-l-oj dark:bg-d-old-rose transition-transform duration-500 hover:scale-110 border border-transparent hover:ring-2 hover:ring-blue-400/40'></div>
		  					<div onClick={() => setNote({...note, colour: 'bg-l-blue dark:bg-d-magenta'})} className='w-3 h-3 rounded-full bg-l-blue dark:bg-d-magenta transition-transform duration-500 hover:scale-110 border border-transparent hover:ring-2 hover:ring-blue-400/40'></div>
		  				</div>
	  				</>
	  				: null
				}
				<div {...longPress()} onClick={() => { if(!edit) noteClick(note.content)}} className='absolute top-0 w-full h-full'>
				</div>
				{ edit
					? <input type='text' value={note.label.toUpperCase()} onChange={(e) => setNote({...note, label: e.target.value})} maxLength={5} className='z-10 w-[80%] text-d-base-1 dark:text-l-base bg-l-base dark:bg-d-base-1 rounded-md outline-0 focus:outline-1 focus:outline-zinc-400 caret-transparent text-center'/>
					: <p className='truncate text-md font-bold p-2'> {note.label.toUpperCase()} </p>
				}
			</div>
		</div>
	)
}

export default Note
