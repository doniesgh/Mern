import {useState,Link} from 'react'
import { useEventsContext } from '../hooks/useEventsContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import {useAuthContext } from 'views/auth/hooks/useAuthContext'
const { format } = require('date-fns');

const EventDetails = ({event}) => {
  const [logo, setLogo] = useState(event.logo);
  const { dispatch } = useEventsContext()
  const {user} = useAuthContext()
  const handleClick = async () =>{
    if(!user) {
      return
    }
    const response = await fetch('/api/events/' + event._id , {
      method:'DELETE',
      headers :{
        'Authorization' :`Bearer ${user.token}`
      }
    })
    const json = await response.json()
    if (response.ok){
      dispatch({type: 'DELETE_EVENT', payload: json})
    }
  }
  return (
    <div className='event-details p-5 rounded-2xl relative shadow-[2px_2px_5px_rgba(0,0,0,0.05)] mx-auto my-5 bg-white'>
      <div className='flex'>
      <div >
        <p><strong></strong><img src={logo} style={{ width: '200px', height: '200px' }} alt='logo' className='rounded' /></p>
        </div>
        <div className="ml-4">
      <h4 className="text-[1.2em] text-indigo-600 mt-0 mb-2.5 mx-0 font-semibold">{event.name}</h4>
      <p className="mb-1"><strong>Location :</strong>{event.location} </p>
      <p className="mb-1"><strong>Date of start: </strong>{format(new Date(event.start), 'yy:MM:dd HH:mm')}</p>
      <p className="mb-1"><strong>Date of end: </strong>{format(new Date(event.end), 'yy:MM:dd HH:mm')}</p>
      <p className="mb-1">{formatDistanceToNow(new Date(event.createdAt), { addSuffix: true })}</p>
      <br />
      <button onClick={handleClick} className='bg-transparent hover:bg-red-400 text-red-400  hover:text-white py-1 px-2 border border-red-400 hover:border-transparent rounded'>delete</button> 
     { /*<Link
            to={`/events/${event._id}`}
            className='bg-transparent ml-2 hover:bg-green-400 text-green-400  hover:text-white py-1 px-2 border border-green-400 hover:border-transparent rounded'
          >   Modify
  </Link>*/}
      <button className='bg-transparent ml-2 hover:bg-green-400 text-green-400  hover:text-white py-1 px-2 border border-green-400 hover:border-transparent rounded'>Modify</button>
        </div>
        
      </div>
     
     
    </div>
  );
};

export default EventDetails;
