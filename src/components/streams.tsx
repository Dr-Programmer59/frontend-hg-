'use client'
import React, { useEffect, useState } from "react";

import { Play } from "lucide-react";
import Link from "next/link";
import SearchBar from "./search-bar";
import axios, { AxiosResponse } from "axios";
interface Stream {
  id: string;
  name: string;
  thumbnail: string;
  viewers: number;
  status: "complete" | "processing"
}

interface IData<T>
{
  streams: T[]
}


const getLives = async () => {
  try {
      const {data}:AxiosResponse<IData<Stream>> = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/streams`);
      return data.streams.reverse();
  } catch (error) {
      return []
  }
}
// @ts-ignore
function formatViews(views) {
  if (views >= 1000) {
      const count = Math.floor(views / 1000);
      return `${count}K`;
  } else {
      return `${views}`;
  }
}

const StreamsDisplay = () => {
  const [streams,setStreams] = useState([]);
  const [filter,setFilter] = useState([]);
  const [query, setQuery] = useState('');
  
  useEffect(() => {
      
     if(query){
      // @ts-ignore
          setFilter(prev => {
            // @ts-ignore
              return streams.filter(s => s.status && s.status!= "complete")
          })
     }else{
          setFilter(streams);
     }
  },[query])

  useEffect(() => {
      (async function(){
          const res = await getLives();
          // @ts-ignore
          setStreams(prev => {
              return res.filter(s =>  s.status!= "complete")
          });
        
      })()
  },[])
  return (
    <div className=" bg-[#1F2226] text-[#ffffff]  p-8 min-h-screen w-full">
      <div className="flex justify-between flex-wrap">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl xl:text-5xl mb-5 text-center w-auto ">
          Live Streams
        </h1>
        <div className="w-auto flex justify-center items-center">
          <SearchBar />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {streams.map((channel) => (
          // @ts-ignore
          <Link href={`/stream/${channel._id}`}>
          <div
            key={// @ts-ignore
              channel.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
          >
            <div className="relative">
              <img
              // @ts-ignore
                 src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${channel.thumnail}`}
                 // @ts-ignore
                alt={`${channel.title} thumbnail`}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                LIVE
              </div>

              <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded flex items-center">
                <Play className="w-4 h-4 mr-1" style={{ fill: "#FCAD06" }} />
                
                {
                // @ts-ignore
                formatViews(channel.views || 0)}
              </div>
            </div>
            <div className="p-4">
              
              <h3 className="text-lg font-semibold mb-2">{
              // @ts-ignore
              channel.title}</h3>
              <button
                className="w-full py-2 px-4 rounded font-semibold transition-colors duration-200"
                style={{ backgroundColor: "#FCAD06", color: "#1F2226" }}
              >
                Watch Stream
              </button>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StreamsDisplay;
