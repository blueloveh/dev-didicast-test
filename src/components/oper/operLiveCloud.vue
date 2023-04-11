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
                <img class="operMain-profile-image" :src="require('@/img/profile.png')" @click="logout" />
            </div>
        </div>

        <!-- nav 밑 tap -->
        <hr />
        <div class="operMain-tap-container">
            <span class="operMain-tap-item" 
            @click="$router.push('/operMain')">
                강의
            </span>
            <span class="operMain-tap-item" @click="$router.push('/operCloud')">
                영상 클라우드
            </span>
            <span class="operMain-tap-item" style="color: #4DAED3;">
                라이브 클라우드
            </span>
        </div>
        <hr /><br />

        <!-- 영상 업로드 -->
        <div class="operCloud-button-container">
            <!-- <button class="operCloud-button">
                + 영상 업로드
            </button> -->

            <!-- <button class="operCloud-button"
            @click="edit_video">
                아카이브 영상 편집
            </button> -->
        </div>

        <!-- 아카이브 테이블 -->
        <div class="container operCloud-main">
            <table class="table table-bordered operCloud-table">
                <th class="operCloud-table-header">
                    영상 제목
                </th>
                <th class="operCloud-table-header">
                    영상 용량
                </th>
                <th class="operCloud-table-header">
                    재생
                </th>
                <tr v-for="(i, a) in recordVideo" :key="a"
                class="operCloud-table-row align-middle">
                    <td style="vertical-align: middle;">
                        <div class="radio red">
                            <input v-model="selectedRadio" 
                            type="radio" 
                            name="group" 
                            :id="'radioCloud' + a"
                            :value="a" />
                            <label :for="'radioCloud' + a"> {{ i.title }} </label>
                        </div>
                    </td>
                    <td style="padding: 0px; text-align: center;">
                        {{ (i.size / 1024 / 1024).toFixed(3) }} MB
                    </td>
                    <td class="play-button-style p-0"
                    @click="play_video(i)">
                        <img :src="require('@/img/playButton.svg')"
                        width="50"
                        />
                    </td>
                </tr>
            </table>
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
import axios from 'axios';

export default {
    name: 'operLiveCloud',
    data() {
        return {
            archive: null,
            selectedRadio: null,

            // DB를 이용하여 S3에 저장돼있는 녹화 영상을 가져옴
            recordVideo: null
        }
    },
    props: {
    },
    created: async function () {
        const token = 'Bearer ' + localStorage.getItem('token')
        await axios.get(
            'https://api-government.didisam.com/api/video',
            {
                headers: {
                    Authorization: token
                }
            }).then((res) => {
                this.archive = res.data.result;
            });

        await axios.get('/api/chime/live/video')
        .then((res) => {
            console.log(res.data);
            this.recordVideo = res.data;
        });
    },
    methods: {
        edit_video() {
            const token = 'Bearer ' + localStorage.getItem('token');
            console.log(this.selectedRadio + "번째 영상 convert");
            alert(this.selectedRadio + "번째 영상 convert")

            axios.get(
            'https://api-government.didisam.com/api/video/convert/' + this.selectedRadio,
            {
                headers: {
                    Authorization: token
                }
            }).then((res) => {
                console.log(res);
            }).catch(function (error) {
                console.log(error);
            });
        },
        play_video(video) {
            const title = video.title;
            const video_url = video.path;

            this.$router.push({
                path: '/archiveVideo',
                query: {
                    title: title,
                    video_url: video_url
                }
            })
        },
        logout: async function (){
            const token = 'Bearer ' + localStorage.getItem('token')
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://api-government.didisam.com/api/logout',
                headers: { 
                    'Authorization': token
                }
            }
            await axios(config).then((res) => {
                this.$router.push('/')
            })
        },
    },  
    components: {
    },
}
</script>
  
<style>
@import "@/css/operMain.css";
@import "@/css/operCloud.css";
</style>
  