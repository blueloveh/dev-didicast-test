<template>
  <div class="config-container d-flex align-items-center" 
  v-if="configureState == true">
    <div class="container-fluid">
      <!-- 미리보기 타이틀 -->
      <div class="row config-title">
        Preview
      </div>

      <!-- 미리보기 및 장치 설정 -->
      <div class="row">
        <!-- 미리보기 설정 -->
        <div class="col p-4">
          <!-- video 미리보기 -->
          <div class="config-video">
            <video id="preview-video"></video>
          </div>

          <!-- mute -->
          <div class="config-img-container">
            <img class="config-img-camera" :src="require('@/img/camera.svg')" />
            <img class="config-img-mic" :src="require('@/img/mic.svg')" />
          </div>
        </div>

        <!-- 장치 설정 -->
        <div class="col" style="padding: 0px;">
          <!-- select camera device -->
          <div class="config-select-section">
            <div class="mb-3 mt-3">카메라</div>

            <div class="dropdown config-dropdown">
              <button class="btn bg-white dropdown-toggle config-dropdown p-3" type="button" id="dropdownMenuButton1"
                data-bs-toggle="dropdown" aria-expanded="false">
                {{ selectedDevice.videoInput.label }}
              </button>
              <ul class="dropdown-menu config-dropdown" aria-labelledby="dropdownMenuButton1">
                <li v-for="(item, index) in videoInputDevices" :key="item">
                  <a class="dropdown-item" href="#"
                    @click="selectedDevice.videoInput.label = item.label; selectedDevice.videoInput.index = index;">
                    {{ item.label }}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- select video quality -->
          <div class="config-select-section">
            <div class="mb-3">해상도</div>

            <div class="dropdown config-dropdown">
              <button class="btn bg-white dropdown-toggle config-dropdown p-3" type="button" id="dropdownMenuButton1"
                data-bs-toggle="dropdown" aria-expanded="false">
                Select video quality
              </button>
              <ul class="dropdown-menu config-dropdown" aria-labelledby="dropdownMenuButton1">
                <li v-for="item in 3" :key="item">
                  <a class="dropdown-item" href="#">
                    해상도
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- select audio input -->
          <div class="config-select-section">
            <div class="mb-3">마이크</div>

            <div class="dropdown config-dropdown">
              <button class="btn bg-white dropdown-toggle config-dropdown p-3" type="button" id="dropdownMenuButton1"
                data-bs-toggle="dropdown" aria-expanded="false">
                {{ selectedDevice.audioInput.label }}
              </button>
              <ul class="dropdown-menu config-dropdown" aria-labelledby="dropdownMenuButton1">
                <li v-for="(item, index) in audioInputDevices" :key="item">
                  <a class="dropdown-item" href="#"
                    @click="selectedDevice.audioInput.label = item.label; selectedDevice.audioInput.index = index;">
                    {{ item.label }}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- select audio output -->
          <div class="config-select-section">
            <div class="mb-3">스피커</div>

            <div class="dropdown config-dropdown">
              <button class="btn bg-white dropdown-toggle config-dropdown p-3" type="button" id="dropdownMenuButton1"
                data-bs-toggle="dropdown" aria-expanded="false">
                {{ selectedDevice.audioOutput.label }}
              </button>
              <ul class="dropdown-menu config-dropdown" aria-labelledby="dropdownMenuButton1">
                <li v-for="(item, index) in audioOutputDevices" :key="item">
                  <a class="dropdown-item" href="#"
                    @click="selectedDevice.audioOutput.label = item.label; selectedDevice.audioOutput.index = index;">
                    {{ item.label }}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- 입장하기 -->
          <div class="config-select-section">
            <button class="config-button" @click="meetingSessionStart">
              입장하기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="meeting-container" v-if="configureState == false">
    <!-- 10% -->
    <div class="meeting-nav">
      meeting title
    </div>

    <div>
      {{ attendeeCount }}
    </div>

    <!-- 80% -->
    <div class="video-container">
      <!-- 강사 -->
      <!-- 임시 : 본인 -->
      <div class="lecture-video-container">
        <video id="local-video" class="local-video">
        </video>
      </div>

      <!-- 수강생 -->
      <!-- 임시 : 상대방들 -->
      <div class="student-video-container"
          v-if="attendeeCount > 1">
          <video class="main-video"
          :id="'main-video-' + i" 
          v-for="i in (attendeeCount - 1)" :key="i">
          </video>
      </div>

    </div>

    <!-- 10% -->
    <div class="video-footer">
      <img class="video-footer-img" :src="require('@/img/camera.svg')" />
      <img class="video-footer-img" :src="require('@/img/mic.svg')" />
      <img class="video-footer-img" :src="require('@/img/record.svg')" />
    </div>

    <audio id="meeting-audio" style="display: none;" />

  </div>

  <div class="test-container">
    <div class="container-fluid">
      <div>
        <button @click="createMeeting">create meeting</button>
        <p> : 새로운 회의를 생성합니다. </p>
      </div>

      <hr />

      <div>
        <button @click="deleteMeeting">delete meeting</button>
        <p> : 생성된 회의를 삭제합니다. </p>
      </div>

      <hr />

      <div>
        <form>
          <input v-model="searchMeetingId" type="text" placeholder="enter meeting id" />
        </form>

        <span>
          <button @click="joinMeeting">join meeting</button>
        </span>

        <p> : 입력한 회의 ID를 이용하여 회의에 참가합니다. </p>
      </div>

      <hr />

      <div v-if="obj">
        <textarea :value="obj.meetingObj.Meeting.MeetingId"></textarea>
        <p> : 현재 회의의 ID 입니다. </p>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
import {
  ConsoleLogger,
  LogLevel,
  DefaultDeviceController,
  DefaultMeetingSession,
  MeetingSessionConfiguration
} from 'amazon-chime-sdk-js';

export default {
  name: 'meeting',
  data() {
    return {
      msg: "",
      obj: null,
      configureState: true,
      audioInputDevices: null,
      audioOutputDevices: null,
      videoInputDevices: null,
      searchMeetingId: '',
      meetingSession: null,

      previewVideo: null, // 회의 참석 전, 비디오 미리보기 html 요소
      attendeeArr: [], // 참석자 html 요소 배열 (local 제외)
      attendeeCount: null, // 현재 참석자 수

      selectedDevice: {
        videoInput: {
          label: "Select video input",
          index: 0,
        },
        audioInput: {
          label: "Select audio input",
          index: 0,
        },
        audioOutput: {
          label: "Select audio Output",
          index: 0,
        },
      }
    }
  },
  methods: {
    // 회의 생성
    async createMeeting() {
      await axios.post('/api/chime/meetingSession',
        {
          state: false
        })
        .then((res) => {
          console.log(res.data);
          this.obj = res.data;
        });

      await this.setMeetingSession();
    },
    // 회의 세션 세팅 (공통)
    async setMeetingSession() {
      this.previewVideo = document.getElementById('preview-video');

      // *** Chime Setting ***
      // var logger = new ConsoleLogger("ChimeMeetingLogs", LogLevel.INFO); // console에 chime log를 띄움
      var logger = new ConsoleLogger();
      this.deviceController = new DefaultDeviceController(logger);
      var configuration = new MeetingSessionConfiguration(this.obj.meetingObj, this.obj.attendeeObj);

      // *** Meeting Session 생성 ***
      this.meetingSession = new DefaultMeetingSession(configuration, logger, this.deviceController);

      // *** Audio Setting ***
      const audioObserver = {
        audioVideoDidStart: () => {
          console.log('AudioVideo Started');
        }
      };
      await this.meetingSession.audioVideo.addObserver(audioObserver);

      // *** Handlers for meeting events ***
      const meetingObserver = {
        eventDidReceive: (name, attributes) => {
          console.log('Meeting event: ', name)
          switch (name) {
            case 'meetingStartSucceeded':
              // TODO callback when meeting has started, maybe enable/show the video controls at this point?
              console.log('Meeting started: ', attributes);
              break;
            case 'audioInputFailed':
              console.error(`Failed to choose microphone: ${attributes.audioInputErrorMessage} in `, attributes);
              break;
            case 'videoInputFailed':
              console.error(`Failed to choose camera: ${attributes.videoInputErrorMessage} in `, attributes);
              break;
            case 'meetingStartFailed':
              console.error(`Failed to start a meeting: ${attributes.meetingErrorMessage} in `, attributes);
              break;
            case 'meetingFailed':
              console.error(`Failed during a meeting: ${attributes.meetingErrorMessage} in `, attributes);
              break;
            case 'meetingStartRequested':

              break;
            default:
              break;
          }
          // Meeting is ended
          if (Object.prototype.hasOwnProperty.call(attributes, 'meetingStatus')) {
            // TODO handling for the meeting ending.
            console.log(`The meeting ended with the status: ${attributes.meetingStatus} in `, attributes);
          }
        }
      };
      await this.meetingSession.audioVideo.addObserver(meetingObserver);

      // *** Device Setting ***
      await this.meetingSession.audioVideo.setDeviceLabelTrigger(() => Promise.resolve(new MediaStream()));

      // audio input device list를 불러옴
      this.audioInputDevices = await this.meetingSession.audioVideo.listAudioInputDevices();

      // audio output device list를 불러옴
      this.audioOutputDevices = await this.meetingSession.audioVideo.listAudioOutputDevices();

      // video input device list를 불러옴
      this.videoInputDevices = await this.meetingSession.audioVideo.listVideoInputDevices();

      // video input device 선택
      await this.meetingSession.audioVideo.startVideoInput(this.videoInputDevices[this.selectedDevice.videoInput.index].deviceId)

      // video 미리보기
      await this.meetingSession.audioVideo.startVideoPreviewForVideoInput(this.previewVideo);
    },
    async toggleConfigureState() {
      this.configureState = !this.configureState;
    },
    async meetingSessionStart() {
      await this.toggleConfigureState();

      // *** 바인딩할 html 객체 불러오기 ***
      const audio = document.getElementById('meeting-audio');
      const localVideo = document.getElementById('local-video');

      // *** Video Setting ***
      // video observer
      const videoObserver = {
        // 동영상 타일이 생성되거나 업데이트될 때마다 호출됨
        videoTileDidUpdate: (tileState) => {
          this.attendeeArr = [];
          console.log("%cVideoTileDidUpdate()", "color: green", tileState);
          
          this.attendeeCount = tileState.tileId;
          for(var i = 1; i <= this.attendeeCount - 1; i++) {
            var mainVideo = document.getElementById('main-video-' + i);
            console.log(mainVideo)
            this.attendeeArr.push(mainVideo);
          }

          // Ignore a tile without attendee ID and other attendee's tile.
          if (!tileState.boundAttendeeId && !tileState.localTile) {
            console.log("No Attendee Id");
            return;
          }

          console.log(this.attendeeArr);

          // Checking whether to render as local preview or main video
          let videoObj = tileState.localTile ? localVideo : this.attendeeArr[tileState.tileId - 2];
          console.log("tileState.tileId : " + tileState.tileId);
          console.log(videoObj);
          this.meetingSession.audioVideo.bindVideoElement(tileState.tileId, videoObj);
          videoObj.tileId = tileState.active ? tileState.tileId : null;
        },
        // 동영상 타일이 제거될 때 호출됨
        videoTileWasRemoved: (tileId) => {
          // 이렇게 하면, 미팅에 대한 연결이 끊기는 비디오에 대해 더 정확한 콜백이 제공됨으로 보임
          console.log(`%cvideoTileWasRemoved. [tileId=${tileId}]`, "color: orange");
          // 해당 비디오 'isActive' 플래그를 false로 설정
          const videoObj = tileId === mainVideo.tileId ? mainVideo : localVideo;
          videoObj.isActive = false;
        },
      };

      // device change 감지
      const deviceChangeObserver = {
        // videoInputsChanged is called whenever a new webcam is connected to the computer  
        videoInputsChanged: async (freshVideoInputDeviceList) => {
          // TODO Load the audio/video input devices to vuex store
          console.log('videoInputsChanged: ', freshVideoInputDeviceList);
        }
      };

      await this.meetingSession.audioVideo.addDeviceChangeObserver(deviceChangeObserver);
      // video tile 생성 시작
      await this.meetingSession.audioVideo.addObserver(videoObserver);

      // audio input device 선택
      console.log(this.selectedDevice.videoInput.index);
      await this.meetingSession.audioVideo.startAudioInput(this.audioInputDevices[this.selectedDevice.audioInput.index].deviceId)
      // audio output device 선택
      await this.deviceController.chooseAudioOutput(this.audioOutputDevices[this.selectedDevice.audioOutput.index].deviceId)

      // audio 요소를 html에 바인딩
      await this.meetingSession.audioVideo.bindAudioElement(audio);

      // 비디오 미리보기 종료
      await this.meetingSession.audioVideo.stopVideoPreviewForVideoInput(this.previewVideo);

      // video tile start 함수가 start 함수 이후에 실행되야 한다.
      await this.meetingSession.audioVideo.start();
      await this.meetingSession.audioVideo.startLocalVideoTile();
    },
    // 회의 참가
    async joinMeeting() {
      await axios.post('/api/chime/meetingSession',
        {
          state: true,
          meetingId: this.searchMeetingId
        })
        .then((res) => {
          console.log(res.data);
          this.obj = res.data;
        });

      await this.setMeetingSession();
      await this.meetingSessionStart();
    },
    // 회의 제거
    async deleteMeeting() {
      await this.toggleConfigureState();

      await axios.post('/api/chime/deleteMeeting',
        {
          meetingId: this.obj.meetingObj.Meeting.MeetingId,
        })
        .then((res) => {
          console.log('delete meeting ended');
        })
    }
  },
  props: {
  }
}
</script>
  
<style>
@import "@/css/config.css";
</style>
  