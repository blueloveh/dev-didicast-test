<template>
  <div class="config-container d-flex align-items-center" v-if="configureState == true">
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
      meeting title (참가자 수 : {{ attendeeCount }})
    </div>

    <!-- 80% -->
    <div class="video-container">
      <!-- 강사 -->
      <!-- 임시 : 본인 -->
      <div :class="{
        'lecture-video-container-alone': attendeeCount == 1,
        'lecture-video-container': attendeeCount > 1
      }">
        <video id="local-video" class="local-video">
        </video>
      </div>

      <!-- 수강생 -->
      <!-- 임시 : 상대방들 -->
      <div class="student-video-container" v-if="attendeeCount > 1">
        <video class="main-video" :id="'main-video-' + (i + 1)" v-for="i in (attendeeCount - 1)" :key="i">
        </video>
      </div>

    </div>

    <!-- 10% -->
    <div class="video-footer">
      <img v-if="!deviceMute.camera" @click="toggleStopVideo" class="video-footer-img"
        :src="require('@/img/camera.svg')" />
      <img v-if="deviceMute.camera" @click="toggleStopVideo" class="video-footer-img"
        :src="require('@/img/camera_mute.svg')" />

      <img v-if="deviceMute.mic" @click="toggleMuteAudio" class="video-footer-img" :src="require('@/img/mic_mute.svg')" />
      <img v-if="!deviceMute.mic" @click="toggleMuteAudio" class="video-footer-img" :src="require('@/img/mic.svg')" />

      <img class="video-footer-img" v-if="!record"
      @click="recordMeeting(callbackRecordMeeting)" :src="require('@/img/record.svg')" />

      <img class="video-footer-img" v-if="record"
      @click="windows.stopCallback(); record = false; " :src="require('@/img/record_stop.svg')" />
    </div>

    <audio id="meeting-audio" style="display: none;" />

  </div>

  <div class="test-container">
    <div class="container-fluid">
      <div>
        <form>
          <input v-model="externalMeetingId" type="text" placeholder="생성할 회의의 이름을 입력하세요." />
        </form>
        <form>
          <input v-model="externalUserId" type="text" placeholder="회의에 참여할 ID를 입력하세요. " />
        </form>
        {{ externalUserId }}
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
          <input v-model="searchMeetingId" type="text" placeholder="참여할 회의의 ID를 입력하세요. " />
        </form>

        <form>
          <input v-model="externalUserId" type="text" placeholder="회의에 참여할 ID를 입력하세요. " />
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

import RecordRTC from "recordrtc";

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

      searchMeetingId: '', // 참가할 회의 ID
      externalMeetingId: '', // 생성할 외부 회의 ID
      externalUserId: '', // 생성할 외부 유저 ID
      meetingSession: null, // 회의 세션

      previewVideo: null, // 회의 참석 전, 비디오 미리보기 html 요소
      attendeeArr: [], // 참석자 html 요소 배열 (local 제외)

      updateVideoDone: true, // 참석자 video를 모두 update 했는가?

      // 장치 활성화 여부
      deviceMute: {
        camera: false,
        mic: false,
      },

      // 녹화 여부
      record: false,

      /*
      attendeeTile = [
        {
          tileState: tileState,
          externalUserId: externalUserId, 
        }
      ]
      */
      attendeeTile: [], // 참석자 video tile 배열 (DOM 생성 전에 구성됨)
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
          state: false,
          externalMeetingId: this.externalMeetingId,
          externalUserId: this.externalUserId,
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
    // 프리뷰 화면 <-> 회의 진행 화면
    async toggleConfigureState() {
      this.configureState = !this.configureState;
    },
    // 회의 세션 시작
    async meetingSessionStart() {
      await this.toggleConfigureState();

      // *** 바인딩할 html 객체 불러오기 ***
      const audio = document.getElementById('meeting-audio');
      const localVideo = document.getElementById('local-video');

      // Subscribe to Attendees Joining/Leaving the meeting
      const attendeesCallback = (presentAttendeeId, present) => {
        console.log(`Attendee ID: ${presentAttendeeId} Present: ${present}`);
        // TODO handling for attendees joining/leaving
        if (present) { // An attendee joins the call
          this.attendeeCount = this.attendeeCount + 1;
          console.log('this.attendeeCount : ' + this.attendeeCount);
        } else { // An attendee leaves the call
          this.attendeeCount = this.attendeeCount - 1;
          console.log('this.attendeeCount : ' + this.attendeeCount);
        }
      };
      this.meetingSession.audioVideo.realtimeSubscribeToAttendeeIdPresence(attendeesCallback);

      // *** Video Setting ***
      // video observer
      const videoObserver = {
        // 동영상 타일이 생성되거나 업데이트될 때마다 호출됨
        videoTileDidUpdate: async (tileState) => {
          // console.log("%cVideoTileDidUpdate()", "color: green", tileState);
          console.log("%cVideoTileDidUpdate()", "color: green");

          // Ignore a tile without attendee ID and other attendee's tile.
          if (!tileState.boundAttendeeId && !tileState.localTile) {
            return;
          }

          // Checking whether to render as local preview or main video
          let videoObj = tileState.localTile ? localVideo : null;
          if (videoObj) {
            await this.meetingSession.audioVideo.bindVideoElement(tileState.tileId, videoObj);
            videoObj.tileId = tileState.active ? tileState.tileId : null;
          }
          else {
            console.log(tileState.tileId + " : ", tileState.boundExternalUserId);
            this.attendeeTile[tileState.tileId] = {
              tileState: tileState,
              externalUserId: tileState.boundExternalUserId
            };
          }
        },
        // 동영상 타일이 제거될 때 호출됨
        videoTileWasRemoved: (tileId) => {
          // 이렇게 하면, 미팅에 대한 연결이 끊기는 비디오에 대해 더 정확한 콜백이 제공됨으로 보임
          console.log(`%cvideoTileWasRemoved. [tileId=${tileId}]`, "color: orange");
          // 해당 비디오 'isActive' 플래그를 false로 설정
          // const videoObj = tileId === mainVideo.tileId ? mainVideo : localVideo;
          // videoObj.isActive = false;

          this.meetingSession.audioVideo.removeVideoTile(tileId);
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
          meetingId: this.searchMeetingId,
          externalUserId: this.externalUserId,
        })
        .then((res) => {
          console.log(res.data);
          this.obj = res.data;
        });

      await this.setMeetingSession();
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
    },
    async updateVideo() {
      if (this.attendeeCount > 1) {
        console.log("updated attendeeCount : " + this.attendeeCount);

        for (var i = 2; i <= this.attendeeCount; i++) {
          // video tile 객체 존재 O
          if (this.attendeeTile[i]) {
            // video tile bound가 이미 되어있음
            if (this.attendeeTile[i].tileState.boundVideoElement) {
              console.log("already bound");
              continue;
            }
            // video tile bound 수행
            else {
              var tmp_element = document.getElementById('main-video-' + i);
              await this.meetingSession.audioVideo.bindVideoElement(this.attendeeTile[i].tileState.tileId, tmp_element);
              console.log('bound video id : ' + this.attendeeTile[i].tileState.tileId);

              this.updateVideoDone = true;
            }
          }
          // video tile 객체 존재 X -> update false
          else {
            console.log("failed bound video " + i);
            this.updateVideoDone = false;
          }
        }
      }
    },
    async toggleMuteAudio() {
      // mute X -> mute O
      if (!this.deviceMute.mic) {
        await this.meetingSession.audioVideo.realtimeMuteLocalAudio();
        console.log("Local audio muted");
      }
      // mute O -> mute X
      else {
        await this.meetingSession.audioVideo.realtimeUnmuteLocalAudio();
        console.log("Local audio unmuted");
      }

      this.deviceMute.mic = !this.deviceMute.mic;
    },
    async toggleStopVideo() {
      // stop video
      if (!this.deviceMute.camera) {
        await this.meetingSession.audioVideo.stopLocalVideoTile();
        await this.meetingSession.audioVideo.removeLocalVideoTile();
        this.deviceMute.camera = !this.deviceMute.camera;
      }
      // start video
      else {
        await this.meetingSession.audioVideo.startLocalVideoTile();
        this.deviceMute.camera = !this.deviceMute.camera;
      }
    },
    async recordMeeting(callback) {
      this.record = true;
      const video = document.querySelector('video');
      const { createFFmpeg, fetchFile } = FFmpeg;
      const ffmpeg = createFFmpeg({
        log: true,
        progress: showProgress
      });

      this.invokeGetDisplayMedia(function (target) {
        this.addStreamStopListener(target, function () {
          if (this.stopCallback) {
            this.stopCallback();
          }

        });
        callback(target);
      }, function (error) {
        console.error(error);
        alert('Unable to capture your screen. Please check console logs.\n' + error);
      });
    },
    async callbackRecordMeeting(target) {
      var recorder = RecordRTC(target, {
        type: 'video',
        mimeType: 'video/webm'
      });

      recorder.startRecording();

      this.stopCallback = function () {
        this.stopCallback = null;

        recorder.stopRecording(function () {
          var blob = recorder.getBlob();
          var fileUrl = URL.createObjectURL(blob);

          target.stop();
          recorder.save("screen_recording.webm");
          recorder.destroy();
          recorder = null;
        });
      };
    },
    async invokeGetDisplayMedia(success, error) {
      var displaymediastreamconstraints = {
        video: {
          displaySurface: 'monitor', // monitor, window, application, browser
          logicalSurface: true,
          cursor: 'always' // never, always, motion
        }
      };

      // above constraints are NOT supported YET
      // that's why overridnig them
      displaymediastreamconstraints = {
        video: true
      };

      if (navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices.getDisplayMedia(displaymediastreamconstraints).then(success).catch(error);
      }
      else {
        navigator.getDisplayMedia(displaymediastreamconstraints).then(success).catch(error);
      }
    },
    async addStreamStopListener(stream, callback) {
      stream.addEventListener('ended', function () {
        callback();
        callback = function () { };
      }, false);
      stream.addEventListener('inactive', function () {
        callback();
        callback = function () { };
      }, false);
      stream.getTracks().forEach(function (track) {
        track.addEventListener('ended', function () {
          callback();
          callback = function () { };
        }, false);
        track.addEventListener('inactive', function () {
          callback();
          callback = function () { };
        }, false);
      });
    }
  },
  created() {
    this.attendeeTile = new Array(100);
  },
  async updated() {
    await this.updateVideo();
  },
  props: {
  }
}
</script>
  
<style>
@import "@/css/config.css";
</style>
  