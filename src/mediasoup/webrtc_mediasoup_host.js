import { Device } from "mediasoup-client"
function createSilentAudioTrack() {
  const audioContext = new AudioContext();
  const oscillator = audioContext.createOscillator();
  const destination = audioContext.createMediaStreamDestination();

  oscillator.frequency.value = 0; // Set frequency to 0 to generate silence
  oscillator.connect(destination);
  oscillator.start();

  return destination.stream.getAudioTracks()[0];
}
export default class webrtcMediaSoup_client{

    constructor(isAdmin,socket,isscreenShared){

        this.socket=socket
        this.isscreenShared=isscreenShared;
        this.device
        this.roomName;
        this.rtpCapabilities
        this.producerTransport
        this.consumerTransports = []
        this.audioProducer
        this.videoProducer
        this.consumer
        this.mainTracks={}
        this.callers=[]
        this.isProducer = false
        this.mystream=null
        this.audioDisconnect=false
        this.videoDisconnect=false
        this.mystreamCopy=null
        this.isAdmin=isAdmin
        this.params = {
            // mediasoup params
            encodings: [
              {
                rid: 'r0',
                maxBitrate: 100000,
                scalabilityMode: 'S1T3',
              },
              {
                rid: 'r1',
                maxBitrate: 300000,
                scalabilityMode: 'S1T3',
              },
              {
                rid: 'r2',
                maxBitrate: 900000,
                scalabilityMode: 'S1T3',
              },
            ],
            // https://mediasoup.org/documentation/v3/mediasoup-client/api/#ProducerCodecOptions
            codecOptions: {
              videoGoogleStartBitrate: 1000
            }
          }
          
          this.audioParams;
          this.consumingTransports = [];

          this.videoParams = {
            // mediasoup params
            encodings: [
              {
                rid: 'r0',
                maxBitrate: 100000,
                scalabilityMode: 'S1T3',
              },
              {
                rid: 'r1',
                maxBitrate: 300000,
                scalabilityMode: 'S1T3',
              },
              {
                rid: 'r2',
                maxBitrate: 900000,
                scalabilityMode: 'S1T3',
              },
            ],
            // https://mediasoup.org/documentation/v3/mediasoup-client/api/#ProducerCodecOptions
            codecOptions: {
              videoGoogleStartBitrate: 1000
            }
          }
          this.signalNewConsumerTransport=this.signalNewConsumerTransport.bind(this)
          this.connectRecvTransport=this.connectRecvTransport.bind(this)
          this.signalNewConsumerTransportHost=this.signalNewConsumerTransportHost.bind(this)

          // this.signalNewConsumerTransport=this.signalNewConsumerTransport.bind(this)
          
    }
    joinRoom () {

      console.log(this.mystream)
      this.socket.emit('joinRoom', { roomName:this.roomName }, (data) => {
        console.log(`Router RTP Capabilities... ${data.rtpCapabilities}`)
        // we assign to local variable and will be used when
        // loading the client Device (see createDevice above)
        this.rtpCapabilities = data.rtpCapabilities
    
        // once we have rtpCapabilities from the Router, create Device
        this.createDevice()
      })
    }
    

    streamSuccess(stream){
      console.log("succesffuly get the media")
      
      if (stream.getAudioTracks().length === 0) {
        // Create and add a silent audio track if none exists
        const silentAudioTrack = createSilentAudioTrack();
        stream.addTrack(silentAudioTrack);
      }
      this.mystream=stream
      this.mystreamCopy=stream
      this.audioParams = { track: stream.getAudioTracks()[0], ...this.audioParams };

    
      this.videoParams = { track: stream.getVideoTracks()[0], ...this.videoParams };
    
      this.joinRoom()
    }
    
   
     getLocalStream  () {
      console.log("succesffuly get the media")
      if(this.isscreenShared){
        navigator.mediaDevices.getDisplayMedia({
            audio: true,
            video:true,
          })
          .then((stream)=>{this.streamSuccess(stream)})
          .catch(error => {
            console.log(error.message)
          })
      }
      else{
        navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        })
        .then((stream)=>{this.streamSuccess(stream)})
        .catch(error => {
          console.log(error.message)
        })
      }
      }
      
      
    // A device is an endpoint connecting to a Router on the
    // server side to send/recive media
    async createDevice  () {
      try {
        this.device = new Device()
    
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#device-load
        // Loads the device with RTP capabilities of the Router (server side)
        await this.device.load({
          // see getRtpCapabilities() below
          routerRtpCapabilities: this.rtpCapabilities
        })
    
        console.log('Device RTP Capabilities', this.device.rtpCapabilities)
    
        // once the device loads, create transport
        this.createSendTransport()
    
      } catch (error) {
        console.log(error)
        if (error.name === 'UnsupportedError')
          console.warn('browser not supported')
      }

      console.log("this is device created",this.device)
    }
    
     createSendTransport(){
      // see server's socket.on('createWebRtcTransport', sender?, ...)
      // this is a call from Producer, so sender = true
      this.socket.emit('createWebRtcTransport', { consumer: false }, ({ params }) => {
        // The server sends back params needed 
        // to create Send Transport on the client side
        if (params.error) {
          console.log(params.error)
          return
        }
    
        console.log(params)
    
        // creates a new WebRTC Transport to send media
        // based on the server's producer transport params
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#TransportOptions
        this.producerTransport = this.device.createSendTransport({...params, iceServers : [ {
   'urls' : 'stun:stun1.l.google.com:19302'
 }]});
    
        // https://mediasoup.org/documentation/v3/communication-between-client-and-server/#producing-media
        // this event is raised when a first call to transport.produce() is made
        // see connectSendTransport() below
        this.producerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
          try {
            // Signal local DTLS parameters to the server side transport
            // see server's socket.on('transport-connect', ...)
            await this.socket.emit('transport-connect', {
              dtlsParameters,
            })
    
            // Tell the transport that parameters were transmitted.
            callback()
    
          } catch (error) {
            errback(error)
          }
        })
    
        this.producerTransport.on('produce', async (parameters, callback, errback) => {
          console.log(parameters)
    
          try {
            // tell the server to create a Producer
            // with the following parameters and produce
            // and expect back a server side producer id
            // see server's socket.on('transport-produce', ...)
            await this.socket.emit('transport-produce', {
              kind: parameters.kind,
              rtpParameters: parameters.rtpParameters,
              appData: parameters.appData,
              admin:this.isAdmin,
              viewer:false
            }, ({ id, producersExist }) => {
              // Tell the transport that parameters were transmitted and provide it with the
              // server side producer's id.
              callback({ id })
    
              // if producers exist, then join room
              if (producersExist) this.getProducers()
            })
          } catch (error) {
            errback(error)
          }
        })
    
        this.connectSendTransport()
      })
    }

    handleScreenShareOff(){
      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: {
            min: 640,
            max: 1920,
          },
          height: {
            min: 400,
            max: 1080,
          }
        }
      })
      .then((stream)=>{
        this.videoParams = { track: stream.getVideoTracks()[0], ...this.videoParams }; 
        const videoTracks = this.mystream.getVideoTracks();
        // Remove each video track
        videoTracks.forEach(track => {
          this.mystream.removeTrack(track);
          track.stop(); // Stop the removed track to release resources
        });
        this.mystream.addTrack(stream.getVideoTracks()[0]);
        this.videoProducer.replaceTrack({ track: stream.getVideoTracks()[0] });
      })
      .catch(error => {
        console.log(error.message)
      })
    }
    getlocalDisplayScreen(){
      navigator.mediaDevices.getDisplayMedia({ video: true })
      .then((stream)=>{
        const screenTrack = stream.getTracks()[0];
        this.videoProducer.replaceTrack({ track: screenTrack });
            screenTrack.onended = function() {
              this.videoProducer.replaceTrack(userStream.current.getTracks()[1]);
            }
        const videoTracks = this.mystream.getVideoTracks();
            // Remove each video track
            videoTracks.forEach(track => {
              this.mystream.removeTrack(track);
              track.stop(); // Stop the removed track to release resources
            });
            this.mystream.addTrack(screenTrack);

      })
      .catch(error => {
        console.log(error.message)
      });
    }
    async connectSendTransport (){
      // we now call produce() to instruct the producer transport
      // to send media to the Router
      // https://mediasoup.org/documentation/v3/mediasoup-client/api/#transport-produce
      // this action will trigger the 'connect' and 'produce' events above
      if(this.mystream.getAudioTracks()!=[])
        this.audioProducer = await this.producerTransport.produce(this.audioParams);
      this.videoProducer = await this.producerTransport.produce(this.videoParams);
      this.audioProducer.on('trackended', () => {
        console.log('audio track ended')
        this.audioDisconnect=true
        // close audio track
      })
    
      this.audioProducer.on('transportclose', () => {
        console.log('audio transport ended')
        this.audioDisconnect=true
    
        // close audio track
      })
      
      this.videoProducer.on('trackended', () => {
        console.log('video track ended')
        this.socket.disconnect();
        this.videoDisconnect=true
        // close video track
      })
    
      this.videoProducer.on('transportclose', () => {
        console.log('video transport ended')
        this.videoDisconnect=true
    
        // close video track
      })
    }
    
   async signalNewConsumerTransport (remoteProducerId,viewer){
      //check if we are already consuming the remoteProducerId
      console.log("this is viewer in start ",viewer)
      if (this.consumingTransports.includes(remoteProducerId)) return;
      this.consumingTransports.push(remoteProducerId);
    
      await this.socket.emit('createWebRtcTransport', { consumer: true }, ({ params }) => {
        // The server sends back params needed 
        // to create Send Transport on the client side
        if (params.error) {
          console.log(params.error)
          return
        }
        console.log(`PARAMS... ${params}`)
    
        let consumerTransport
        try {
          console.log("checking ",this.mystream)
          consumerTransport = this.device.createRecvTransport(params)
        } catch (error) {
          // exceptions: 
          // {InvalidStateError} if not loaded
          // {TypeError} if wrong arguments.
          console.log(error)
          return
        }
    
        consumerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
          try {
            // Signal local DTLS parameters to the server side transport
            // see server's socket.on('transport-recv-connect', ...)
            await this.socket.emit('transport-recv-connect', {
              dtlsParameters,
              serverConsumerTransportId: params.id,
            })
    
            // Tell the transport that parameters were transmitted.
            callback()
          } catch (error) {
            // Tell the transport that something was wrong
            errback(error)
          }
        })
    
        this.connectRecvTransport(consumerTransport, remoteProducerId, params.id,viewer)
      })
    }
    
    
    async signalNewConsumerTransportHost (hostdata,socketId){
      //check if we are already consuming the remoteProducerId
     
      if (this.consumingTransports.includes(hostdata['producerId'])) return;
      this.consumingTransports.push(hostdata['producerId']);
    
      await this.socket.emit('createWebRtcTransport', { consumer: true }, ({ params }) => {
        // The server sends back params needed 
        // to create Send Transport on the client side
        if (params.error) {
          console.log(params.error)
          return
        }
        console.log(`PARAMS... ${params}`)
    
        let consumerTransport
        try {
          console.log("checking ",this.mystream)
          consumerTransport = this.device.createRecvTransport(params)
        } catch (error) {
          // exceptions: 
          // {InvalidStateError} if not loaded
          // {TypeError} if wrong arguments.
          console.log(error)
          return
        }
    
        consumerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
          try {
            // Signal local DTLS parameters to the server side transport
            // see server's socket.on('transport-recv-connect', ...)
            await this.socket.emit('transport-recv-connect', {
              dtlsParameters,
              serverConsumerTransportId: params.id,
            })
    
            // Tell the transport that parameters were transmitted.
            callback()
          } catch (error) {
            // Tell the transport that something was wrong
            errback(error)
          }
        })
    
        this.connectRecvTransportHost(consumerTransport, hostdata,socketId, params.id)
      })
    }
    
    
    
    
    
    
    // server informs the client of a new producer just joined
    
    getProducers() {
      this.socket.emit('getProducers', producerIds => {
        console.log(producerIds)
        // for each of the producer create a consumer
        // producerIds.forEach(id => signalNewConsumerTransport(id))
        producerIds.forEach(this.signalNewConsumerTransportHost)
      })
    }
    async connectRecvTransportHost (consumerTransport, hostdata,socketId, serverConsumerTransportId){
      // for consumer, we need to tell the server first
      // to create a consumer based on the rtpCapabilities and consume
      // if the router can consume, it will send back a set of params as below
      await this.socket.emit('consume', {
        rtpCapabilities: this.device.rtpCapabilities,
        remoteProducerId:hostdata['producerId'],
        serverConsumerTransportId,
      }, async ({ params }) => {
        if (params.error) {
          console.log('Cannot Consume')
          return
        }
    
        console.log(`Consumer Params ${params}`)
        // then consume with the local consumer transport
        // which creates a consumer
        const consumer = await consumerTransport.consume({
          id: params.id,
          producerId: params.producerId,
          kind: params.kind,
          rtpParameters: params.rtpParameters
        })
    
        this.consumerTransports = [
          ...this.consumerTransports,
          {
            consumerTransport,
            serverConsumerTransportId: params.id,
            producerId: hostdata['producerId'],
            consumer,
          },
        ]
    
        // create a new div element for the new consumer media
        
        // destructure and retrieve the video track from the producer
        const { track } = consumer;
        console.log(track,'track receive')

        console.log("track " ,track ," producer id ",hostdata['producerId'])
        let trackreq=new MediaStream([track])
       
        if (!this.mainTracks[socketId]){
          this.mainTracks[socketId]=[]
        }
        this.mainTracks[socketId].push({
          producerId:hostdata['producerId'],
          media:trackreq,
          producerKind:hostdata['producerKind'] 
        })

        
        // document.getElementById(remoteProducerId).srcObject = new MediaStream([track])
        console.log("this is track",this.mainTracks)
        // the server consumer started with media paused
        // so we need to inform the server to resume
        this.socket.emit('consumer-resume', { serverConsumerId: params.serverConsumerId })
      })
    }
    
    
    async connectRecvTransport (consumerTransport, remoteProducerId, serverConsumerTransportId,viewer){
      // for consumer, we need to tell the server first
      // to create a consumer based on the rtpCapabilities and consume
      // if the router can consume, it will send back a set of params as below
      await this.socket.emit('consume', {
        rtpCapabilities: this.device.rtpCapabilities,
        remoteProducerId,
        serverConsumerTransportId,
      }, async ({ params }) => {
        if (params.error) {
          console.log('Cannot Consume')
          return
        }
    
        console.log(`Consumer Params ${params}`)
        // then consume with the local consumer transport
        // which creates a consumer
        const consumer = await consumerTransport.consume({
          id: params.id,
          producerId: params.producerId,
          kind: params.kind,
          rtpParameters: params.rtpParameters
        })
    
        this.consumerTransports = [
          ...this.consumerTransports,
          {
            consumerTransport,
            serverConsumerTransportId: params.id,
            producerId: remoteProducerId,
            consumer,
          },
        ]
    
        // create a new div element for the new consumer media
        
        // destructure and retrieve the video track from the producer
        const { track } = consumer

        console.log("track " ,track ," producer id ",remoteProducerId)
        let trackreq=new MediaStream([track])
       
       
        if(viewer){
          this.callers.push(trackreq)
        }
        else{
          this.mainTracks.push(trackreq)

        }

        
        
        // document.getElementById(remoteProducerId).srcObject = new MediaStream([track])
        console.log("this is track",track)
        // the server consumer started with media paused
        // so we need to inform the server to resume
        this.socket.emit('consumer-resume', { serverConsumerId: params.serverConsumerId })
      })
    }
    

}


