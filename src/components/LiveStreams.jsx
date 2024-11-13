"use client"
import {useEffect, useState} from 'react'
import LiveCard from './LiveCard'
import axios from 'axios'
import { MdOutlineSearch } from "react-icons/md";

const getLives = async () => {
    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/streams`);
        return data.streams.reverse();
    } catch (error) {
        return []
    }
}

const LiveStreams = () => {
    const [streams,setStreams] = useState([]);
    const [filter,setFilter] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        
       if(query){
            setFilter(prev => {
                return streams.filter(s => s.status && s.status!= "complete")
            })
       }else{
            setFilter(streams);
       }
    },[query])

    useEffect(() => {
        (async function(){
            const res = await getLives();
            setStreams(prev => {
                return res.filter(s =>  s.status!= "complete")
            });
          
        })()
    },[])
 return (
    <section className='section-lives section p-5'>
        <div className='container m-auto'>
            <div className='group-1'>
                <div className="w-full border-2 rounded-3xl border-gray-500 mx-auto max-w-[40rem] h-12 flex items-center justify-start p-2 px-4 shadow-sm">
                    <input placeholder="search..." className="outline-none border-none bg-none w-[98%]" value={query} onChange={(e) => setQuery(e.target.value)}/>
                    <button><MdOutlineSearch size={25} /></button>
                </div>
                <div className='p-3 mt-5 flex flex-wrap justify-center items-center gap-8'>
                {/* <div className='p-3 mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center'> */}
                    {
                        streams.map((data) => (
                            
                            <LiveCard {...data}/>
                        ))
                    }
                </div>
                {
                    streams.length == 0 &&
                    <div className='flex justify-center items-center py-16'>
                        <h3 className='text-2xl'>No Stream Yet</h3>
                    </div>
                }
            </div>
        </div>
    </section>
  )
}

export default LiveStreams