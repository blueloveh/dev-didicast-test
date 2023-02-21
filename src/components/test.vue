<template>
    <div>
        <video ref="videoElement" autoplay></video>
        <button @click="joinMeeting()">
            join meeting
        </button>
    </div>
</template>
  
<script>
import axios from 'axios';
import { ConsoleLogger, LogLevel } from 'amazon-chime-sdk-js';
import { ref, onMounted } from 'vue';
import { MeetingSessionConfiguration, MeetingSessionStatusCode } from 'amazon-chime-sdk-js';
import { v4 as uuidv4 } from 'uuid';

export default {
    name: 'test',
    /*
    setup() {
    const videoElement = ref(null);

    const createMeetingSession = async () => {
        let meetingId = ''
        let joinToken = ''
        try {
                const response = await axios.post('/api/chimeMeeting/createMeeting')
                meetingId = response.data.Meeting.MeetingId
                joinToken = response.data.JoinInfo.Attendee.AttendeeId
            } catch (error) {
                console.error(error)
        }
      const logger = new ConsoleLogger('MyLogger', LogLevel.INFO);
    //   const meetingId = "06dd856c-dceb-4720-972b-e963337a0706";
    //   const joinToken = "06dd856c-dceb-4720-972b-e963337a0706";
      const configuration = new MeetingSessionConfiguration(meetingId, joinToken);
      const session = new MeetingSession(configuration, logger);

      try {
        await session.audioVideo.start();
        await session.audioVideo.chooseAudioInputDevice(null);
        await session.audioVideo.chooseVideoInputDevice(null);
        await session.audioVideo.bindVideoElement(videoElement.value);
        setStatus('Connected');
      } catch (error) {
        setStatus('Error');
        console.error('Error starting the session', error);
      }
      setMeetingSession(session);
    }

    const setStatus = (status) => {
      console.log(`Meeting Status: ${status}`);
    }

    onMounted(() => {
      createMeetingSession();
    });

    return {
      videoElement
    }
    
  },
  */
    methods: {
        async joinMeeting() {
            const joinInfo = {
                meetingInfo: {
                    MeetingId: this.$route.query.meetingId
                },
                attendeeInfo: {
                    AttendeeId: this.$route.query.joinToken
                }
            }

            console.log(joinInfo)

            const response = await axios.get('/api/chimeMeeting/joinMeeting', { 
                params: {
                    joinInfo: joinInfo
                }
            })

            console.log(response)

            const meeting = new window.chime.Meeting(joinInfo)
            meeting.join().then(() => {
                console.log('Joined meeting successfully')
            }).catch((error) => {
                console.error(error)
            })
        }
    },
    props: {
    }
}
</script>
  
<style></style>
  