import React, { useEffect, useRef } from 'react'
import { useFileSystemPublicRoutes } from '../../next.config';



const position = {
    0: [0, 0],
    1: [420, 0],
    2: [420, 165],
    3: [0, 330],
    4: [210, 330],
    4: [420, 330],
}

const RenderStream = ({ otherStream, handleMainBox, className1, className2, play, volume,streamDetails, imageClass }) => {
    const streamVideoElementRef = useRef([]);
    
    useEffect(() => {
        console.log("other stream change ",otherStream)
        if(otherStream.length > 1 && streamVideoElementRef.current[0].main == true ){
            streamVideoElementRef.current.splice(0,1);
        }
        otherStream.forEach((stream,i) => streamVideoElementRef.current[i].srcObject = stream);
    },[otherStream,streamVideoElementRef]);


    useEffect(() => {
        if(play == true){
            streamVideoElementRef.current.forEach((ref) => ref?.play());
        }else if(play == false){
            streamVideoElementRef.current.forEach((ref) => ref?.pause());
        }
    },[play]);

    useEffect(() => {
        if(volume != undefined){
            // console.log(volume,videoRef.current[0]?.volume)
            console.log(volume)
            streamVideoElementRef.current.forEach((ref) => ref.volume = volume);
       }
    },[volume])
    

    return (
        <>
       
            {
                otherStream.length == 1 ? (
                    <div className={className2+" "+ "relative"}>
                        <video className='absolute top-0 bottom-0 w-[100%] h-[100%] object-cover' muted autoPlay ref={(ref) => {if(ref) ref.main = true; streamVideoElementRef.current[0] = ref}}>
                                </video>
                        <div className='absolute bottom-0 left-0 right-0 h-[8rem]'>
                            <div className='relative w-full h-[100%]'>
                                <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${streamDetails?.banner}`} className={"w-full h-[100%]" + " " + imageClass}/>
                            </div>
                        </div>
                        <div className='absolute top-2 right-2 w-20 h-20 rounded-full overflow-hidden '> 
        <div className='relative w-full h-full'>
            <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${streamDetails?.logo}`}
                className={`w-full h-full object-cover ${imageClass} animate-spin-slow`}
            />
        </div>
    </div>
                    </div>
                )
                :(
                    <div className={className1}>
    {otherStream.map((stream, i) => (
        <div
            key={i}
            className={`relative video-box cursor-pointer video-box-${i} ${i === 0 ? 'main' : ''}`}
            onClick={(e) => handleMainBox(`.video-box-${i}`)}
        >
            <video
                className='absolute top-0 bottom-0 w-[1020px] h-full  iamsecond'
               
                autoPlay
                muted 
                ref={(ref) => (streamVideoElementRef.current[i] = ref)}
            />
        </div>
    ))}
    
    {/* Banner at the Bottom */}
    <div className='absolute bottom-0 left-0 right-0 h-[8rem] '>
        <div className='relative w-full h-full'>
            <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${streamDetails?.banner}`}
                className={`w-full h-full ${imageClass}`}
            />
        </div>
    </div>
    
    {/* Circular Image at Top Right */}
    <div className='absolute top-2 right-2 w-20 h-20 rounded-full overflow-hidden animate-spin-slow'> 
        <div className='relative w-full h-full'>
            <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${streamDetails?.logo}`}
                className={`w-full h-full object-cover  `} 
            />
        </div>
    </div>
</div>

                )
            }
        </>
        // <>
        //     <>
        //         <canvas ref={parentCanvasRef} width={640} height={480} className={className1}></canvas>
        //     </>
        // </>
    )
}

export default RenderStream

