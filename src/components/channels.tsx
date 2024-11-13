"use client";

import React, { useCallback, useState } from "react";

import SearchBar from "./search-bar";
import { Users } from "lucide-react";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { followUnFollowRequest, getChannels } from "@/lib/actions/user";
import { useSelector } from "react-redux";

interface Channel {
  _id: string;
  name: string;
  avatar: string;
  followers: number;
  followersList: string[]
}

const ChannelCard = ({ channel,followAndUnfollow,loading,isFollow}: { channel: Channel,followAndUnfollow:() => void,loading: string,isFollow:boolean  }) => (
  <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 min-w-[280px] transform hover:scale-105 hover:shadow-2xl">
    <div className="relative">
      <img
        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${channel.avatar}`}
        alt={`${channel.name}'s avatar`}
        className="w-full h-40 object-contain"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
        <h3 className="text-white font-bold text-lg truncate">
          {channel.name}
        </h3>
      </div>
    </div>
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center text-gray-400">
        <Users size={16} className="mr-2" />
        <span>{channel?.followers?.toLocaleString()}</span>
      </div>
      <button
        className={`${isFollow ? 'bg-secondary  hover:bg-secondaryHover': 'bg-primary  hover:bg-hoverPrimary'} text-gray-900 font-bold py-2 px-4 rounded-full transition-colors duration-300 disabled:opacity-30`}
        onClick={followAndUnfollow}
        disabled={loading == channel._id ? true: false}
      >
        Follow
      </button>
    </div>
  </div>
);

const ChannelsDisplay = () => {
  const [loading,setLoading] = useState(null);
  // @ts-ignore
  const {user} = useSelector(store => store.userReducer);

  const {data,isLoading,isError} = useQuery({
    queryKey: ['chennels'],
    queryFn: getChannels
  });

  const queryClient = useQueryClient()
  

  const followAndUnfollow = useCallback(async (id:string) => {
    // @ts-ignore
    setLoading(id);
    const res = await followUnFollowRequest(id);
    // @ts-ignore
    queryClient.invalidateQueries(['channels']);
    setLoading(null);
  },[]);

  console.log(data,user)
  return (
    <div
      className="min-h-screen p-8 w-full"
      style={{ backgroundColor: "#1F2226" }}
    >
      <div className=" flex flex-col  max-w-full ">
        <div className="flex justify-between flex-wrap">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl xl:text-5xl mb-5 text-center w-auto ">
            Discover Channels
          </h1>
          <div className="w-auto flex justify-center items-center">
            <SearchBar />
          </div>
        </div>
        <div className="flex flex-row flex-wrap justify-center gap-3">
          {data && data.map((channel:Channel) => (
            // @ts-ignore
            <ChannelCard key={channel._id} channel={channel} followAndUnfollow={() => followAndUnfollow(channel._id)} loading={loading} isFollow={channel?.followersList?.some(userId => userId == user?._id)}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChannelsDisplay;
