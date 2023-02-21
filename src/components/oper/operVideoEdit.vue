<template>
    <div class="operMain-container">
        <!-- nav bar -->
        <div class="operMain-nav">
            <!-- 0. studio by didicast image -->
            <div class="operMain-nav-left">
                <img class="operMain-didicast-image" :src="require('@/img/studio_by_didicast.png')" />
            </div>
            <!-- 1. 강의 관리 -->
            <div class="operMain-nav-second">
                강의 관리
            </div>
            <!-- 2. 멤버 관리 -->
            <div class="operMain-nav-third">
                멤버 관리
            </div>
            <!-- 3. user info -->
            <div class="operMain-nav-right">
                <!-- user name -->
                <!-- <span>Miseon</span> -->
                <!-- user image -->
                <img class="operMain-profile-image" :src="require('@/img/profile.png')" />
            </div>
        </div>

        <!-- nav 밑 tap -->
        <hr />
        <div class="operMain-tap-container">
            <span class="operMain-tap-item">
                강의
            </span>
            <span class="operMain-tap-item" style="color: #4DAED3;">
                영상 클라우드
            </span>
        </div>
        <hr /><br />

        <div class="container">
            <!-- 오프닝 영상 선택 -->
            <div class="row">
                <div class="col-2">
                    <button class="operVideoEdit-button">
                        오프닝 영상 선택
                    </button>
                </div>

                <div class="col-10">
                    <input class="operVideoEdit-input" type="text"/>
                </div>
            </div>

            <!-- 클로징 영상 선택 -->
            <div class="row">
                <div class="col-2">
                    <button class="operVideoEdit-button">
                        클로징 영상 선택
                    </button>
                </div>

                <div class="col-10">
                    <input class="operVideoEdit-input" type="text"/>
                </div>
            </div>

            <!-- 아카이브 영상 선택 -->
            <div class="row">
                <div class="col-2">
                    <button class="operVideoEdit-button">
                        아카이브 영상 선택
                    </button>
                </div>

                <div class="col-10">
                    <input class="operVideoEdit-input" type="text"/>
                </div>
            </div>

            <div class="row">
                <video controls autoplay>
                    <source ref="player" :src="require('../test.mp4')"/>
                </video>
                <img ref="img"/>
                 <button @click="transcode">변환</button>
                 <p>로그 : {{ message }}</p>
            </div>

            <div class="row">
                <div class="alert alert-warning" role="alert">
                    최종 생성할 영상을 선택하고, 아카이브 완료 버튼을 눌러주세요.
                </div>
            </div>
        </div>


        <!-- Footer -->
        <div class="operMain-footer">
            <h1>(주) 산타</h1>
            <div>
                대표 : 박기웅 | 사업자 등록번호 : 627-88-00384
            </div>
            <div>
                서울 특별시 강남구 강남대로 132길 21 3층
            </div>
            <div>
                [HQ] 부산광역시 해운대구 센텀중앙로 97, 센텀스카이비즈 A-704
            </div>
        </div>
    </div>
</template>
  
<script>
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import axios from 'axios';

export default {
    name: 'operVideoEdit',
    data() {
        return {
            ffmpeg: null,
            message: "Click Start to Transcode"
        }
    },
    methods : {
        async transcode() {
            this.ffmpeg = createFFmpeg({
                log: true,
            });
            this.message = 'Loading ffmpeg-core.js';
            await this.ffmpeg.load();
            
            this.message = 'Start transcoding';
            
            // 가상 세계에 파일 만들기 (브라우저 메모리)
            const videoFile = URL.createObjectURL(
                new Blob(require('../test.mp4'), { type="video/mp4" })
            )
            await this.ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(videoFile));

            // 파일 변환 webm -> mp4
            await this.ffmpeg.run("-i", 'test.mp4', "-r", "5", "result.mp4");
            this.message = 'Complete transcoding';

            /*
            await this.ffmpeg.run(
                "-i", 
                "result.mp4", 
                "-ss", "00:00:01", 
                "-frames:v", 
                "1", 
                "myThumb.jpg"
            );
            */

            const data = this.ffmpeg.FS('readFile', 'result.mp4');
            // const data = this.ffmpeg.FS('readFile', "myThumb.jpg");

            
            this.$refs.player.value = URL.createObjectURL(
                new Blob([data.buffer], { type: 'video/mp4' })
            );
            /*
            this.$refs.img.value = URL.createObjectURL(
                new Blob([data.buffer], { type: 'image/jpg' })
            );
            */
        },
    },
    props: {
    },
    components: {
    },
}
</script>
  
<style>
@import "@/css/operMain.css";
@import "@/css/operCloud.css";
@import "@/css/operVideoEdit.css";
</style>
  