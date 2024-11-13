'use client'

import Messages from '@/components/Messages';
import SuperChat from '@/components/SuperChat';
import axios from 'axios';
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { IoMdClose, IoMdSend } from 'react-icons/io';
import { RiCoinsFill } from "react-icons/ri";
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/navigation';
import { PrayingRequest, loadme } from '@/lib/actions/user';
import PrayForm from '@/components/PrayForm';
import webrtcMediaSoup_client from '@/mediasoup/webrtc_mediasoup_client';
import Dialog from '@/components/Dialog';
import { IoIosCall } from "react-icons/io";
import RenderStream from '@/components/RenderStream';
import ScrollToBottom from 'react-scroll-to-bottom';
import { io } from "socket.io-client";
import socket from '@/components/socket';
import { FaPlay, FaPause } from "react-icons/fa6";
import { IoVolumeMediumSharp, IoVolumeMute } from "react-icons/io5";
import { getAds } from '@/lib/actions/user';
import { FaCamera, FaRegEye, FaMicrophone, FaLaptop, FaUsers, FaThumbsUp, FaThumbsDown, FaShare } from 'react-icons/fa'



// const webrtc_client = new webrtcMediaSoup_client(socket)

function formatViews(views) {
  if (views >= 1000) {
      const count = Math.floor(views / 1000);
      return `${count}K`;
  } else {
      return `${views}`;
  }
}



const Timer = ({ timerStart }) => {
  const [straimgTime, setStraimgTime] = useState('00:00:00');
  const interValref = useRef();
  const [second, setSecond] = useState(0);
  const { user } = useSelector(store => store.userReducer);

  const startTime = () => {
    interValref.current = setInterval(() => {
      setSecond(prev => prev + 1);
    }, 1000);

  }

  useEffect(() => {
    let hour = Math.floor(second / 3600);
    let min = Math.floor((second % 3600) / 60);
    let sec = Math.floor((second % 3600) % 60);

    // console.log(second)

    if (hour < 10) hour = `0${hour}`;
    if (min < 10) min = `0${min}`;
    if (sec < 10) sec = `0${sec}`;

    // console.log(`${hour}:${min}:${sec}`)
    setStraimgTime(`${hour}:${min}:${sec}`);
  }, [second]);

  const stopTime = () => {
    clearInterval(interValref.current);
  }

  useEffect(() => {
    console.log(timerStart);
    if (timerStart) {
      startTime();
    } else {
      stopTime();
    }
  }, [timerStart])
  return <span>{straimgTime}</span>
}

const page = ({ params }) => {

  const [webrtc_client, setwebrtc_client] = useState(new webrtcMediaSoup_client(socket));

  useEffect(() => {

    socket.emit("start-streaming", ({ connected: true }))

    // Cleanup: Disconnect the socket and perform any cleanup when the component unmounts
    //l cleanup for your class instance if needed

  }, []); // Empty dependency array ensures this effect runs only once

  const [open, setOpen] = useState(false);
  const [callOpen, setCallOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [coins, setCoins] = useState(0);
  const [streamDetails, setStreamDetails] = useState({});
  const { user } = useSelector(store => store.userReducer)
  const dispatch = useDispatch();
  const routrer = useRouter();
  const [play, setPlay] = useState(true);
  const [volume, setVolume] = useState(0.2);


  const [otherStream, setotherStream] = useState([])
  const [messages, setMessages] = useState([])
  const oldTracks = useRef([])
  const [subject, setSubject] = useState('');
  const [pmessage, setpMessage] = useState('');
  const [Popen, setPOpen] = useState(false);
  const [myaudio, setmyaudio] = useState();
  const oldsockets = useRef([])
  const [likes, setlikes] = useState(0)
  const [dislikes, setdislikes] = useState(0)
  const [views, setViews] = useState(0)
  const [dlike,setDLike] = useState(false);
  const [like,setLike] = useState(false);


  const addNewHosts = () => {
    console.log(webrtc_client.mainTracks,"this is main tracks")
    console.log("this is another ", Object.keys(webrtc_client.mainTracks))

    Object.keys(webrtc_client.mainTracks).forEach(key => {
      console.log("we have socket ", key)
      var combinedStream = new MediaStream();
      webrtc_client.mainTracks[key].forEach(host => {
        if (host['producerKind'] == "video") {
          host['media'].getVideoTracks().forEach(track => {
            combinedStream.addTrack(track);
          });
        }
        else if (host['producerKind'] == "audio") {
          host['media'].getAudioTracks().forEach(track => {
            combinedStream.addTrack(track);
          });
        }
        console.log("this")
      })
    
        console.log("in old socket")
        if(! oldTracks.current.includes(key))
        {
          oldTracks.current.push(key)
          setotherStream((prev) => [...prev, combinedStream])


        }
        






    })
  };


  const handleNewProducer = useCallback((hostData) => {
    console.log("this is host data", hostData)
    Object.keys(hostData).forEach(key => {
      hostData[key].forEach(host => {
        setTimeout(() => {
          console.log("tihs is the host i am setngin", host)
          webrtc_client.signalNewConsumerTransport(host, key)
        }, 1000);

      })


    })

    setTimeout(() => {
      Object.keys(hostData).forEach(key => {
        var combinedStream = new MediaStream();
        webrtc_client.mainTracks[key].forEach(host => {
          if (host['producerKind'] == "video") {
            host['media'].getVideoTracks().forEach(track => {
              combinedStream.addTrack(track);
            });
          }
          else if (host['producerKind'] == "audio") {
            host['media'].getAudioTracks().forEach(track => {
              combinedStream.addTrack(track);
            });
          }
        })
        setotherStream((prev) => [...prev, combinedStream])

      })


    }, 3000); //

  }, [])



  const handleSendMessageEvent = (data) => {
    if (data.superchat) {
      setSuperChatMessages((prev) => [...prev, { coins: data.coins, message: data.message }])
    }
    else {
      console.log("got message ", message)
      setMessages((prev) => [...prev, data.message])
    }


  }

  const handleSendMessage = () => {
    // console.log("this is this",webrtc_client.device)
    console.log("this is otehr strema ",otherStream)
    if (isNaN(coins) || coins == 0) {
      console.log("sending message", message)
      socket.emit("send-message", ({ roomName: params.streamId, message: message, coins: 0, superchat: false }))
      setMessages((prev) => [...prev, message]);
      setMessage('');
    }
    else {
      console.log("sending message", message)
      handleSendCoins()
      socket.emit("send-message", ({ roomName: params.streamId, message: message, coins: coins, superchat: true }))
      setMessages((prev) => [...prev, message]);
      setMessage('');
      setCoins(0)
    }

  }
  const handleInputChange = useCallback((value) => {
    message.current = value
  }, []);
  const hanldeCreateDevice = ({ socketId, streamDetail, consumers }) => {
    webrtc_client.roomName = params.streamId;
    webrtc_client.joinRoom()
    if (streamDetail[params.streamId]) {

      setlikes(streamDetail[params.streamId]["likes"])
      setdislikes(streamDetail[params.streamId]["dislikes"])



    }
    let views = 0;
    let donesockets = []
    consumers.forEach((cons) => {
      if (cons.roomName == params.streamId && cons.watcher && !donesockets.includes(cons.socketId)) {
        views += 1;
        donesockets.push(cons.socketId)
      }
    });
    setViews(views)

    setTimeout(() => {
      addNewHosts()
    }, 3000); // 5000 milliseconds (5 seconds) - Adjust the time interval as needed

  }


  const handlelikeEvent = ({ like, dislike }) => {
    console.log(dislike)
    setlikes(like)
    setdislikes(dislike)
  }
  const handleViewsEvent = ({ views }) => {
    console.log("these are views ", views)
    setViews(views)

  }
  const handleHostDisconnected=({hostData})=>{
    console.log("in handle host disconnected ")
    delete webrtc_client.mainTracks[hostData.socketId]
    console.log(webrtc_client.mainTracks,"this is maintracks")
    setTimeout(() => {
        setotherStream([]);
        console.log()
        Object.keys(webrtc_client.mainTracks).forEach(key => {
            var combinedStream = new MediaStream();
            webrtc_client.mainTracks[key].forEach(host=>{
                if(host['producerKind']=="video"){
                    host['media'].getVideoTracks().forEach(track => {
                        combinedStream.addTrack(track);
                    });
                }
                else if (host['producerKind']=="audio"){
                    host['media'].getAudioTracks().forEach(track => {
                        combinedStream.addTrack(track);
                    });
                }
            })
            setotherStream((prev) => [...prev, combinedStream])
            
        })
        
    }, 3000);
    console.log("this host is disconencted ",hostData)
}
  useEffect(() => {

    socket.on('connection-success', hanldeCreateDevice)
    socket.on("recive-message", handleSendMessageEvent)
    socket.on("hosts:AceptedHost", handleNewProducer)
    socket.on("stream:likeDetails", handlelikeEvent)
    socket.on("stream:views", handleViewsEvent)
    socket.on("host:disconnected", handleHostDisconnected)

    return () => {
      socket.off('connection-success', hanldeCreateDevice)
      socket.off('recive-message', handleSendMessageEvent)

      socket.off("hosts:AceptedHost", handleNewProducer)
      socket.off("stream:likeDetails", handlelikeEvent)
      socket.off("stream:views", handleViewsEvent)
      socket.off("host:disconnected", handleHostDisconnected)


      socket.on('close', () => {
        console.log('Client disconnected');
      });

    }

  }, [socket, handleNewProducer, hanldeCreateDevice, handleSendMessageEvent]);
  const handleMainBox = (targetClass) => {
    const videoBoxs = document.querySelectorAll('.video-box');
    videoBoxs.forEach(ele => {
      ele.classList.remove('main');
    })
    // console.log(targetClass)
    document.querySelector(targetClass).classList.add('main');

  }






  const handleSendCoins = async () => {

    if (isNaN(coins)) {

      toast.error('Please enter amount in message');
      return
    }

    const amount = Number(coins);
    if (amount <= 0) {
      toast.error('amount should be more then 0');
      return
    }

    try {
      console.log(coins)
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/send-coins`, { reciveId: streamDetails?.owner?._id, senderId: user._id, amount }, {
        withCredentials: true
      });
      toast.success(data.message);
      dispatch(loadme())
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }

  }


  // // get strea details 
  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/streams/${params.streamId}`, {
          withCredentials: true
        });
        setStreamDetails(data.stream);

      } catch (error) {
        routrer.push('/')
      }


    })()


  }, [])

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('message', pmessage);
    formData.append('subject', subject);
    formData.append('reciverId', streamDetails?.owner?._id);
    dispatch(PrayingRequest(formData))
  }

  const handleLikeButton = () => {
    socket.emit("consumer:Like", { roomName: params.streamId, email: user?.email }, ({ like, dislike }) => {
      setlikes(like)
      setdislikes(dislike)

    })

    

    if(like){
      setLike(false);
    }else{
      setLike(true);
    }
    setDLike(false);

  }
  const handledislikeButton = () => {
    socket.emit("consumer:disLike", { roomName: params.streamId, email: user?.email }, ({ like, dislike }) => {
      setlikes(like)
      setdislikes(dislike)
      console.log("dislike ", dislike)
    })

    if(dlike){
      setDLike(false);
    }else{
      setDLike(true);
    }
    
    setLike(false);
    
  }

  const handleCalling = () => {
    webrtc_client.doCall();
    setTimeout(() => {
      console.log("do call ", webrtc_client.mystream)
      setmyaudio(webrtc_client.mystream);
    }, 3000);


    setCallOpen(true);
  }

  return (
    <>
      <section className='bg-gray-800'>
        <div className='w-[100%] relative flex'>
          {/* video box */}
          <div className='w-[70%] relative bg-gray-600'>
            <div className='z-10 bg-gray-900 bottom-0 left-0 right-0 h-[4rem] w-[100%] flex items-center justify-center absolute px-4 gap-8'>
              <div className='text-white text-lg'>
                Views {views != 0 ? formatViews(views) : '0'}
              </div>
              <button className='text-white p-2 rounded-full bg-primary' onClick={() => setPlay(prev => !prev)}>
                {play ? <FaPause size={23} /> : <FaPlay size={23} />}
              </button>
              <div className='flex items-center gap-1 w-[20rem] relative'>
                <button className='text-gray-500 p-2 rounded-full' onClick={() => setVolume(prev => (prev == 0 ? 0.5 : 0))}>
                  {volume != 0 ? <IoVolumeMediumSharp size={23} /> : <IoVolumeMute size={23} />}
                </button>
                <input type='range' min={0} max={1} step={0.1} value={volume} onChange={(e) => setVolume(e.target.value)} className='w-full' />

                <div className='flex flex-col gap-2 relative'>
                  <button className={`mx-5 ${like ? 'text-primary' : 'text-white'}`}>
                    <FaThumbsUp size={23}  onClick={handleLikeButton} />
                  </button>
                  <div className='text-white text-xs absolute -bottom-[98%] left-[50%] -translate-x-[50%]'>
                    {likes != 0 ? formatViews(likes) : ''}
                  </div>
                </div>

                <div className='flex flex-col gap-2 relative'>

                  <button className={`mx-5 ${dlike ? 'text-primary' : 'text-white'}`}>
                    <FaThumbsDown size={23}  onClick={handledislikeButton} />
                  </button>
                  <div className='text-white text-xs absolute -bottom-[98%] left-[50%] -translate-x-[50%]'>
                    {dislikes != 0 ? formatViews(dislikes) : ''}
                  </div>
                </div>
              </div>

            </div>

            <RenderStream handleMainBox={handleMainBox} streamDetails={streamDetails} play={play} volume={volume} otherStream={otherStream} className1={'w-full h-[48rem] overflow-y-auto gap-4 stream-container'} className2={'w-full h-[48rem] relative'} imageClass="relative bottom-[4rem]"/>
          </div>
          <div className='w-[30%] relative bg-blue-700'>
            <div className='live-chat w-[100%]'>
              <div className='bg-gray-900 h-[100%] relative'>
                <div className='h-[4rem] absolute top-0 left-0 right-0 p-1 overflow-x-auto flex items-center super-chat-box'>
                  <SuperChat avatar={'/images/image-1.jpg'} amount={1000.00} />
                  <SuperChat avatar={'/images/image-1.jpg'} amount={1000.00} />
                  <SuperChat avatar={'/images/image-1.jpg'} amount={1000.00} />
                </div>


                {/* coins dialog  */}
                {
                  open &&
                  <div className='absolute top-[83.5%] left-[60%] right-[50%]  bg-gray-700 w-[10rem]    h-[5rem] px-2 shadow-md  before:contect-[] before:absolute before:-bottom-[22.4%] before:left-[calc(80%-5px)] before:border-[10px] before:border-gray-700 before:border-b-transparent before:border-x-transparent rounded-md hidden md:block' onMouseMove={() => setOpen(true)} onMouseLeave={() => {
                    setTimeout(() => setOpen(false), 500);
                  }}>

                    <div className='  relative flex justify-center items-center gap-2 mt-5'>

                      <input type='number' className='flex-1 p-2 rounded-3xl bg-gray-600 outline-none w-[5rem] text-white' placeholder='coins amount' min={0} max={user?.coins} value={coins} onChange={(e) => setCoins(e.target.value)} />



                    </div>

                  </div>
                }


                {/* calling dialog  */}
                {
                  callOpen &&
                  <div className='absolute top-[40%] left-7 right-7 bg-gray-600 rounded-md h-[10rem] px-2 shadow-md '>

                    <div className='w-full h-[10rem] relative flex justify-center items-center gap-2 flex-col'>
                      <div className='absolute right-2 top-2'>
                        <button className='text-xl text-white' onClick={() => setCallOpen(false)}>
                          <IoMdClose size={23} />
                        </button>
                      </div>

                      <h2 className='text-white text-2xl mt-8'>
                        somone
                      </h2>

                      <p className='text-lg  text-white/60'><Timer timerStart={true} /></p>
                      <button className='bg-red-600 p-2 rounded-full text-white transition-all
                              ' onClick={handleCalling}><IoIosCall size={23} /></button>
                    </div>

                  </div>
                }

                <ScrollToBottom className='overflow-y-auto p-2 h-[calc(52rem-3rem)]  pt-[4.2rem]'>
                  {
                    messages.map((msg, i) => (
                      <Messages name={'someone'} message={msg} admin={false} />

                    )

                    )
                  }
                </ScrollToBottom>
                <div className='h-[3rem] flex items-center px-2 gap-2 relative'>
                  <input type='text' className='w-[100%] p-2 rounded-3xl bg-gray-600 outline-none text-white' placeholder='message...' value={message} onChange={(e) => setMessage(e.target.value)} />
                  <button className='text-white p-2 rounded-full bg-gray-600 transition-all
                            ' onClick={handleSendMessage}><IoMdSend size={23} /></button>
                  <button className=' flex  p-2 rounded-full bg-gray-600 transition-all text-yellow-500
                            'onMouseMove={() => setOpen(true)} >{coins != 0 ? coins : ""}<RiCoinsFill size={23} /></button>
                  <button className='text-green-600 p-2 rounded-full bg-gray-600 transition-all
                              ' onClick={handleCalling}><IoIosCall size={23} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='m-auto py-4 px-2 relative mt-5'>
          <div className='flex flex-row justify-center items-center'>

            {/* channels details  */}
            <div className='channels-details'>
              <div className='flex gap-3'>
                <img src='/images/image-1.jpg' alt='channel logo' className='w-[12rem] h-[12rem] rounded-full' />
                <div className='flex flex-col justify-center items-start'>
                  <h2 className='text-xl text-white'>Sloan Lake Community Church</h2>
                  <h2 className='text-sm text-white/70 mt-6'>Sloan Lake Community Church Streaming from China Grove , NC</h2>
                  <div className='flex'>
                    <button className='bg-primary rounded-md text-white text-sm py-2 px-4 mt-6'>Subscribe</button>
                    <button className='bg-primary rounded-md text-white text-sm py-2 px-4 mt-6 ml-5' onClick={() => setPOpen(true)}>Pray Request</button>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </section>
      <Dialog open={Popen} onClose={() => setPOpen(false)}>
        <form className='p-1' onSubmit={submitHandler}>
          <div className='input-group flex flex-col m-3 mb-6'>
            <label htmlFor="subject" className='text-lg mb-1'>Suject</label>
            <input type='text' name='subject' id='subject' placeholder='Enter Your subject' className='outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' value={subject} onChange={(e) => setSubject(e.target.value)} required />
          </div>
          <div className='input-group flex flex-col m-3'>
            <label htmlFor="Message" className='text-lg mb-1'>Message</label>
            <textarea type='text' id='Message' name='Message' placeholder='Enter Your Message' className='outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2 h-80' value={pmessage} onChange={(e) => setpMessage(e.target.value)} autoComplete required />
          </div>

          <div className='flex justify-center items-center  m-3 mt-8'>
            <button type='submit' className='bg-primary text-white text-lg py-2 px-6 rounded'>Submit</button>
          </div>

        </form>
      </Dialog>
    </>
  )
}

export default page