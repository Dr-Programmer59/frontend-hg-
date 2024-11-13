'use client'
import ConfirmBox from '@/components/ConfirmBox';
import Messages from '@/components/Messages';
import React, { useEffect, useState, useCallback, useRef } from 'react'

import SuperChat from '@/components/SuperChat';

import webrtcMediaSoup_client from '@/mediasoup/webrtc_mediasoup_host';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import RenderStream from '@/components/RenderStream';
// import { css } from 'emotion';
import "./style.css"
import { Camera } from "@mediapipe/camera_utils/camera_utils.js";
import { SelfieSegmentation } from "@mediapipe/selfie_segmentation";
import socket from '@/components/socket';
import { useRouter } from 'next/navigation';
import { io } from "socket.io-client";
import { Mic, MicOff, Video, VideoOff, Monitor, Wand2, Share2, Users, ThumbsUp, ThumbsDown, Send, Phone } from 'lucide-react'

const Button = ({ onClick, children, className, variant = 'primary' }) => (
    <button
        onClick={onClick}
        className={`
      py-2 px-4 rounded-md transition-colors
      ${variant === 'primary' ? 'bg-[#FCAD06] hover:bg-[#FFD74D] text-white' :
                variant === 'secondary' ? 'bg-[#2D3748] hover:bg-[#4A5568] text-white' :
                    'bg-white hover:bg-gray-100 text-[#1A1D22]'}
      ${className}
    `}
    >
        {children}
    </button>
)

const IconButton = ({ onClick, icon: Icon, active, tooltip }) => (
    <button
        onClick={onClick}
        className={`
      p-2 rounded-full transition-colors
      ${active ? 'bg-[#FCAD06] text-white' : 'bg-[#2D3748] text-white hover:bg-[#4A5568]'}
    `}
        title={tooltip}
    >
        <Icon size={20} />
    </button>
)

export default function LiveStream({ searchParams }) {
    const [webrtc_client, setwebrtc_client] = useState(new webrtcMediaSoup_client(true, socket,false));
    const [screenSharingsocket, setscreenSharingsocket] = useState(new io(`${process.env.NEXT_PUBLIC_SOCKET_URL}/mediasoup`))
    const screenSharingWebrtcClient = new webrtcMediaSoup_client(false, screenSharingsocket,true)

    const [videoStream, setVideoStream] = useState()
    const [filterOpen, setFilterOpen] = useState(false);
    const [isStreaming, setisStreaming] = useState(false)
    const alltracks = useRef([])
    const oldTracks = useRef([])
    const [streamDetails, setStreamDetails] = useState({});
    
    const [otherStream, setotherStream] = useState([]);
    const [, forceUpdate] = useState();
    const [value, setValue] = useState(null)
    const [open, setOpen] = useState(false)
    const [message_confirm, setMessage_confirm] = useState('Someone wanted to be host')
    const [messages, setMessages] = useState([])
    const [SuperChatmessages, setSuperChatmessages] = useState([])
    const [message, setMessage] = useState('');
    const [callers, setCallers] = useState([]);
    const [callers_audio,setcallers_audio] = useState([]);

    const callersproducerID = useRef([])
    const roomname = searchParams.rooms;
    const [callOpen, setCallOpen] = useState(false);
    const [startStream, setStartStream] = useState(false);
    const { ads } = useSelector(store => store.userReducer);
    const [cameraMute, setCameraMute] = useState(false)
    const [micMute, setmicMute] = useState(false);
    const [likes, setlikes] = useState(0)
    const [dislikes, setdislikes] = useState(0)
    const [views, setViews] = useState(0)
    const [dlike,setDLike] = useState(false);
    const [like,setLike] = useState(false);
    const [isfilterOn, setisfilterOn] = useState(false)
    const router = useRouter();
    const [unfilteredVideoStream, setunfilteredVideoStream] = useState(null)
    

    //new host data
    const waitingHosts = useRef({})

    console.log('ads', ads);

    const inputVideoRef = useRef();
    const inputVideoRef2 = useRef();
    const canvasRef = useRef();
     const [change, setChange] = useState(false)
    let ctx = null;
   
  
  
    const init = () => {
      const selfieSegmentation = new SelfieSegmentation({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
      });
  
      ctx = canvasRef.current.getContext("2d");
  
      const constraints = {
        video: { width: { min: 1280 }, height: { min: 720 } },
      };
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        inputVideoRef.current.srcObject = stream;
        // sendToMediaPipe();
      });
  
      selfieSegmentation.setOptions({
        modelSelection: 1,
        selfieMode: true,
      });
  
      selfieSegmentation.onResults(onResults);
  
      const camera = new Camera(inputVideoRef.current, {
        onFrame: async () => {
          await selfieSegmentation.send({ image: inputVideoRef.current });
        },
        width: 1280,
        height: 720,
      });
      camera.start();
    };



  const onResults = (results) => {
    const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Load the image when the component mounts
        const backgroundImage = new Image();
        backgroundImage.src = '/images/background.jpg'; // Place your image in the public folder or use a proper path

        backgroundImage.onload = () => {
            ctx.save();
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw segmentation mask
            ctx.drawImage(
                results.segmentationMask,
                0,
                0,
                canvas.width,
                canvas.height
            );

            // Set composite operation to draw the image as background
            ctx.globalCompositeOperation = "source-out";

            // Draw the background image instead of filling with green
            ctx.drawImage(
                backgroundImage,
                0,
                0,
                canvas.width,
                canvas.height
            );

            // Only overwrite missing pixels
            ctx.globalCompositeOperation = "destination-atop";
            ctx.drawImage(
                results.image,
                0,
                0,
                canvas.width,
                canvas.height
            );

            ctx.restore();
};}




const handlerFilterOpen=()=>{
    if(!isfilterOn){
    init()
    var videoStream = canvasRef.current.captureStream();
  
    inputVideoRef2.current.srcObject = videoStream;
    console.log("this is videostream ",inputVideoRef2.current)
    webrtc_client.videoProducer.replaceTrack({ track: inputVideoRef2.current.srcObject.getTracks()[0] });
    const videoTracks =  webrtc_client.mystream.getVideoTracks();
    setunfilteredVideoStream(videoTracks)
    videoTracks.forEach(track => {
        webrtc_client.mystream.removeTrack(track);
      track.stop(); // Stop the removed track to release resources
    });
    webrtc_client.mystream.addTrack(inputVideoRef2.current.srcObject.getTracks()[0])  
    setisfilterOn(true)
}
else{
  
    
    
      webrtc_client.videoProducer.replaceTrack({ track: inputVideoRef.current.srcObject.getTracks()[0] });
      const videoTracks =  webrtc_client.mystream.getVideoTracks();
      setunfilteredVideoStream(videoTracks)
      videoTracks.forEach(track => {
          webrtc_client.mystream.removeTrack(track);
        track.stop(); // Stop the removed track to release resources
      });
      webrtc_client.mystream.addTrack(inputVideoRef.current.srcObject.getTracks()[0])  
      setisfilterOn(true)
  }

}
    


    const handleSendMessageEvent = (data) => {
        if (data.superchat) {
            console.log("go new message",data)

            setSuperChatmessages((prev) => [...prev, { coins: data.coins, message: data.message }])
        }
        else {
            console.log("got message ", data.message)
            setMessages((prev) => [...prev, data.message])
        }
    }

    const handleSendMessage = () => {
        console.log("this is streams ",otherStream)
        console.log("sending message", message)
        socket.emit("send-message", ({ roomName: searchParams.rooms, message: message }))
        setMessages((prev) => [...prev, message])
    }


    const handleConnection = () => {
        webrtc_client.roomName = searchParams.rooms;
        webrtc_client.getLocalStream()
        setTimeout(() => {
            setotherStream((prev) => [...prev, webrtc_client.mystream]);
            setisStreaming(true);
        }, 2000);
    }
    const handleScreenSharingconnection=()=>{
        screenSharingWebrtcClient.roomName = searchParams.rooms;
        screenSharingWebrtcClient.getLocalStream()
     
    }





    const handleNewProducer = ({ hostData, socketId, viewer }) => {
        if (viewer) {
            console.log("new caller", hostData[0]['producerId'])
            
            if(!callersproducerID.current.includes(hostData[0]['producerId']))
            
            {
                setCallers((prev) => [...prev, { producerId: hostData[0]['producerId'], status: "pending" }])
                callersproducerID.current.push(hostData[0]['producerId'])
            }


        }

        else {
            console.log("new person")
            if (!waitingHosts.current[socketId])
            {
                waitingHosts.current[socketId] = hostData
            }

            if(screenSharingsocket.id==socketId){
                handleAccept()
            }
            else{
                setOpen(true)

            }
        }
    }


     // get strea details 
     useEffect(() => {
        (async function () {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/streams/${searchParams.rooms}`, {
                    withCredentials: true
                });
                setStreamDetails(data.stream);

            } catch (error) {
               console.log(error.message)
            }


        })()


    }, [])



    const handleHostDisconnected=({hostData})=>{
        if(hostData){
            console.log("disconnected")
        delete webrtc_client.mainTracks[hostData.socketId]
        setTimeout(() => {
            setotherStream([webrtc_client.mystream]);
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
            
        }, 1500);
        console.log("this host is disconencted ",hostData)
    }
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

   
      
    //Use effect to handle the Connections,message,new producers.
    useEffect(() => {
        socket.on('connection-success', handleConnection)
        socket.on('new-producer', handleNewProducer)
        socket.on("recive-message", handleSendMessageEvent)
        socket.on("host:disconnected", handleHostDisconnected)
        screenSharingsocket.on('connection-success', handleScreenSharingconnection)
        socket.on("stream:likeDetails", handlelikeEvent)
        socket.on("stream:views", handleViewsEvent)
        return () => {
            socket.off('connection-success', handleConnection)
            socket.off('new-producer', handleNewProducer)
            socket.off('recive-message', handleSendMessageEvent)
            socket.off("host:disconnected", handleHostDisconnected)
            socket.off("stream:likeDetails", handlelikeEvent)
            socket.off("stream:views", handleViewsEvent)
            screenSharingsocket.off('connection-success', handleScreenSharingconnection)

            socket.on('close', () => {
                console.log('Client disconnected');
              });
        }
    }, [socket,handleConnection,handleNewProducer,handleSendMessageEvent,handleScreenSharingconnection]);



    const   handleAccept = () => {

            console.log("before the screensharing ",otherStream)
            Object.keys(waitingHosts.current).forEach(key => {
                waitingHosts.current[key].forEach(host=>{
                    setTimeout(() => {
                        console.log("tihs is the host i am setngin",host)
                    webrtc_client.signalNewConsumerTransportHost(host,key)
                     }, 100); 
                    
                })
               
    
            })

        setTimeout(() => {
            Object.keys(waitingHosts.current).forEach(key => {
                var combinedStream = new MediaStream();
                console.log(webrtc_client.mainTracks,"this is tracks required","this is key ",key)
                console.log(webrtc_client.mainTracks[key],"this is main")
                let newhostMedia=webrtc_client.mainTracks
                console.log("this is new host media ",newhostMedia)
                newhostMedia[key].map(host=>{
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
                console.log("other stream is ",otherStream)
                setotherStream((prev) => [...prev, combinedStream])
                
                
                
            })
         
            socket.emit("hosts:Accept", { roomName: searchParams.rooms, waitingHosts: waitingHosts.current })
            socket.emit("hosts:shareNewHosts", { roomName: searchParams.rooms, waitingHosts: waitingHosts.current })
            waitingHosts.current = {}
        }, 2000); //
        
  
       
    }

    const handleStreamingStart = async () => {
        if (startStream) {
            try {
                //end stream and set stream status complete
                const { data } = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/stream-update/${searchParams.rooms}`, { status: 'complete' }, {
                    withCredentials: true
                });
            } catch (error) {
                console.log(error)
            }
            setStartStream(false);
            router.push('/dashboard');
        } else {
            try {
                //end stream and set stream status complete
                const { data } = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/stream-update/${searchParams.rooms}`, { status: 'processing' }, {
                    withCredentials: true
                });
            } catch (error) {
                console.log(error)
            }

            setStartStream(true);
            if (!isStreaming) {
                socket.emit("start-streaming", ({ connected: true }))
            }
        }



    }


    const handleClick = useCallback((e, value) => {
        e.preventDefault()
        if (value) {

            handleAccept()

        }
        setValue(value)
        setOpen(false)
    }, [])

    const handleAcceptCall = (index) => {
        console.log(callers)
        webrtc_client.signalNewConsumerTransport(callers[index]['producerId'], true)
        setTimeout(() => {
            setcallers_audio(webrtc_client.callers)
            let newCallers = callers;

            newCallers[index]['status'] = "accepted"
            setCallers(newCallers)

        }, 2000);
        // forceUpdate("check");
    }
    const handledeclineCall = (index) => {
        setCallers((prevCallers) => {
            let tempCaller = [...prevCallers];
            tempCaller.splice(index, 1);
            return tempCaller;
          });
        
          setcallers_audio((prevCallersAudio) => {
            let tempCallerAudio = [...prevCallersAudio];
            tempCallerAudio.splice(index, 1);
            return tempCallerAudio;
          });
        callersproducerID.current.splice(index,1)
        socket.emit("Call:DeclineCall", { producerId: callersproducerID.current[index], roomName: roomname })

    }

    const handleMainBox = (targetClass) => {
        const videoBoxs = document.querySelectorAll('.video-box');
        videoBoxs.forEach(ele => {
            ele.classList.remove('main');
        })
        console.log(targetClass)
        document.querySelector(targetClass).classList.add('main');

    }


    // useEffect(() => {
    //     return async () => {
    //        const { data } = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/stream-update/${searchParams.rooms}`, { status: 'complete' }, {
    //             withCredentials: true
    //         });
    //     } 
    // },[]);

    const handleCopy = () => {
        
        navigator.clipboard.writeText(`${window.location.origin}/host/${searchParams.rooms}`)
        toast.success("Host link Copied");
    }
    const handleCameraMute = () => {
        if(!cameraMute){
            webrtc_client.mystream?.getVideoTracks().forEach(track => track.enabled = false);
            setCameraMute(true);
        }else{
            webrtc_client.mystream?.getVideoTracks().forEach(track => track.enabled = true);
            setCameraMute(false);
        }
        
    }

    const handleMicMute = () => {
        if(!micMute){
            webrtc_client.mystream?.getAudioTracks().forEach(track => track.enabled = false);
            setmicMute(true);
        }else{
            webrtc_client.mystream?.getAudioTracks().forEach(track => track.enabled = true);
            setmicMute(false);
        }
}

const handleshareScreen=async ()=>{
    try {
      // Get user media with screen capture capability
 
     screenSharingsocket.emit("start-streaming", ({ connected: true }))
    } catch (error) {
      console.error('Error accessing screen sharing:', error);
    }
  };

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-[#1F2226] text-white font-roboto">
            <div className="w-full lg:w-[70%] flex flex-col">
                <div className="flex items-center justify-between p-4 bg-[#1A1D22]">
                    <div className="flex  items-center space-x-4">
                        <div className="bg-[#FCAD06] text-white px-3 py-1 rounded-full text-sm font-semibold">LIVE</div>
                        <span className="text-sm">00:12</span>
                    </div>
                    <div className="flex items-center space-x-6">
                        <span className="flex items-center"><Users className="mr-2" size={18} /> {views}</span>
                        <span className="flex items-center"><ThumbsUp className="mr-2" size={18} /> {likes}</span>
                        <span className="flex items-center"><ThumbsDown className="mr-2" size={18} /> {dislikes}</span>
                    </div>
                </div>
                <div className="flex-1 relative">
                    <RenderStream streamDetails={streamDetails} handleMainBox={handleMainBox} otherStream={otherStream} className1={'w-full h-[calc(100vh-6.72rem)] overflow-auto gap-4 stream-container'} className2={'w-full h-[calc(100vh-.72rem)] relative'} />
                </div>


                <div className="flex justify-center items-center p-4 bg-[#1A1D22] space-x-2 md:space-x-4">
                    <IconButton onClick={handleMicMute} icon={micMute ? MicOff : Mic} active={!micMute} tooltip={micMute ? 'Unmute' : 'Mute'} />
                    <IconButton onClick={handleCameraMute} icon={cameraMute ? VideoOff : Video} active={!cameraMute} tooltip={cameraMute ? 'Enable Camera' : 'Disable Camera'} />
                    <IconButton onClick={handleshareScreen} icon={Monitor} tooltip="Share Screen" />
                    <IconButton onClick={handlerFilterOpen} icon={Wand2} active={filterOpen} tooltip="Filters" />
                    <IconButton onClick={handleCopy} icon={Share2} tooltip="Copy Stream Link" />
                    <IconButton onClick={() => setCallOpen(!callOpen)} icon={Phone} active={callOpen} tooltip="Incoming Calls" />
                    <Button onClick={handleStreamingStart} className="ml-2 md:ml-4">
                        {startStream ? 'End Stream' : 'Start Stream'}
                    </Button>
                </div>
            </div>
            <div className="w-full lg:w-[30%] bg-[#1A1D22] flex flex-col">
                <div className="p-4 bg-[#1A1D22] border-b border-[#FCAD06]">
                    <h2 className="text-xl font-semibold text-[#FCAD06]">Live Chat</h2>
                </div>
                <div className="flex-grow overflow-hidden">
                    <div id="chat-container" className="flex-grow overflow-y-auto p-4" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                        {SuperChatmessages.map((msg, i) => (
                            <SuperChat key={i} avatar="/images/image-1.jpg" amount={msg.coins} message={msg.message} />
                        ))}
                        {messages.map((msg, i) => (
                            <Messages key={i} name="Someone" message={msg} admin={false} />
                        ))}
                    </div>
                </div>
                <div className="p-4 bg-[#1A1D22]">
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="flex-grow p-2 rounded bg-[#2D3748] text-white focus:outline-none focus:ring-2 focus:ring-[#FCAD06]"
                        />
                        <Button onClick={handleSendMessage} variant="secondary">
                            <Send size={18} />
                        </Button>
                    </div>
                </div>
            </div>
            {filterOpen && (
                <div className="absolute top-0 right-0 w-64 h-full bg-[#1A1D22] p-4 overflow-y-auto">
                    <h3 className="text-lg font-semibold mb-4 text-[#FCAD06]">Filters</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="filter w-full cursor-pointer">
                                <img src='/images/image-1.jpg' className='h-16 w-full rounded-md hover:opacity-75 transition-opacity' alt={`Filter ${i}`} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {callOpen && (
                <div className="absolute top-0 left-0 w-64 h-full bg-[#1A1D22] p-4 overflow-y-auto">
                    <h3 className="text-lg font-semibold mb-4 text-[#FCAD06]">Incoming Calls</h3>
                    {callers.map((caller, index) => (
                        <div key={index} className="mb-4 p-3 bg-[#2D3748] rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                                <img src="/placeholder.svg" alt="Caller Avatar" className="w-10 h-10 rounded-full" />
                                <span className="font-semibold">{caller.name || 'Unknown Caller'}</span>
                            </div>
                            {caller.status === 'accepted' && callers_audio[index] && (
                                <audio
                                    ref={el => { if (el) el.srcObject = callers_audio[index] }}
                                    autoPlay
                                />
                            )}
                            <div className="flex justify-center space-x-2 mt-2">
                                {caller.status !== 'accepted' && (
                                    <Button onClick={() => handleAcceptCall(index)} variant="primary" className="text-sm">
                                        Accept
                                    </Button>
                                )}
                                <Button onClick={() => handledeclineCall(index)} variant="secondary" className="text-sm">
                                    Decline
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <ConfirmBox handleClick={handleClick} message={message_confirm} open={open} />
            <canvas ref={canvasRef} className="hidden" />
            <video autoPlay ref={inputVideoRef} width={500} height={320} className="hidden" />
            <video autoPlay ref={inputVideoRef2} width={500} height={320} className="hidden" />
        </div>
    )
}