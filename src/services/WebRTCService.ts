import { EventEmitter } from 'events';

class WebRTCService extends EventEmitter {
  private peerConnection: RTCPeerConnection | null = null;
  private stream: MediaStream | null = null;
  private socket: WebSocket | null = null;

  constructor() {
    super();
    this.connectToSignalingServer();
  }

  private connectToSignalingServer() {
    try {
      this.socket = new WebSocket('ws://localhost:3000');
      
      this.socket.onopen = () => {
        console.log('Connected to signaling server');
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      this.socket.onclose = () => {
        console.log('Disconnected from signaling server');
        // Attempt to reconnect after 5 seconds
        setTimeout(() => this.connectToSignalingServer(), 5000);
      };

      this.socket.onmessage = async (event) => {
        const message = JSON.parse(event.data);
        
        switch (message.type) {
          case 'offer':
            await this.handleOffer(message.offer);
            break;
          case 'answer':
            await this.handleAnswer(message.answer);
            break;
          case 'ice-candidate':
            await this.handleIceCandidate(message.candidate);
            break;
        }
      };
    } catch (error) {
      console.error('Failed to connect to signaling server:', error);
      // Attempt to reconnect after 5 seconds
      setTimeout(() => this.connectToSignalingServer(), 5000);
    }
  }

  async startScreenShare() {
    try {
      console.log('Starting screen share');
      this.stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false
      });

      console.log('Got media stream:', this.stream);
      this.emit('stream', this.stream);

      this.peerConnection = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      });

      this.stream.getTracks().forEach(track => {
        console.log('Adding track:', track.kind);
        this.peerConnection?.addTrack(track, this.stream!);
      });

      this.peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          this.socket?.send(JSON.stringify({
            type: 'ice-candidate',
            candidate: event.candidate
          }));
        }
      };

      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);
      
      this.socket?.send(JSON.stringify({
        type: 'offer',
        offer
      }));

    } catch (error) {
      console.error('Error starting screen share:', error);
      throw error;
    }
  }

  async stopScreenShare() {
    this.stream?.getTracks().forEach(track => track.stop());
    this.peerConnection?.close();
    this.peerConnection = null;
    this.stream = null;
  }

  private async handleOffer(offer: RTCSessionDescriptionInit) {
    if (!this.peerConnection) {
      this.peerConnection = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      });
    }

    await this.peerConnection.setRemoteDescription(offer);
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);

    this.socket?.send(JSON.stringify({
      type: 'answer',
      answer
    }));
  }

  private async handleAnswer(answer: RTCSessionDescriptionInit) {
    await this.peerConnection?.setRemoteDescription(answer);
  }

  private async handleIceCandidate(candidate: RTCIceCandidateInit) {
    await this.peerConnection?.addIceCandidate(candidate);
  }
}

export const webRTCService = new WebRTCService(); 