<template>
    <div class="userMain-container">
        <!-- nav bar -->
        <div class="userMain-nav">
            <!-- left : didicast image -->
            <div class="userMain-nav-left">
                <img class="userMain-didicast-image" :src="require('@/img/didicast_logo.png')" />
            </div>
            <!-- right : user info -->
            <div class="userMain-nav-right">
                <!-- user name -->
                <!-- <span>Miseon</span> -->
                <!-- user image -->
                <img class="userMain-profile-image" :src="require('@/img/profile.png')" />
            </div>
        </div>

        <div class="userMain-class-container">
            <!-- Santa image -->
            <div class="userMain-santa-div">
                <img class="userMain-santa-image" :src="require('@/img/santa_logo.png')" />
            </div>

            <!-- 등록 강의 -->
            <div class="userMain-register-title">
                등록 강의
            </div>

            <Carousel :breakpoints="breakpoints" :settings="settings" :wrap-around="true"
                class="userMain-register-carousel">
                <!-- 캐러셀 -->
                <Slide v-for="i in lecture" :key="i" class="userMain-register-carousel-item">
                    <div class="userMain-register-carousel-video">
                    </div>
                    <div class="userMain-register-video-info">
                        <!-- 강의 번호 -->
                        <div class="userMain-register-video-info-number">
                            {{ i.lecture_no }}
                        </div>
                        <!-- 강의 제목 및 수강 버튼 -->
                        <div>
                            <div class="userMain-register-video-info-title">
                                {{ i.title }}
                            </div>
                            <div class="userMain-video-info-bottom">
                                <span class="userMain-video-kind">
                                    <span v-if="i.lecture_type == 'live'" style="color: red; font-weight: 700;">· 라이브</span>

                                    <span v-if="i.lecture_type == 'vod'">동영상</span>
                                </span>
                                <button v-if="i.price == 0" @click="user_route_video_page(i)" class="userMain-video-button">
                                    수강하기
                                </button>
                                <button v-else-if="i.paid = true" @click="user_route_video_page(i)"
                                    class="userMain-video-button">
                                    수강하기
                                </button>
                                <button v-else class="userMain-video-button
                                    userMain-video-button-buy">
                                    {{ i.price }} 원 구매하기
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- 강의 태그 -->
                    <span v-for="j in i.category" :key="j" class="userMain-video-tag">
                        {{ j.title }}
                    </span>
                </Slide>

                <template #addons>
                    <Navigation />
                    <!-- <Pagination /> -->
                </template>
            </Carousel>

            <!-- 등록 강의 -->
            <div class="userMain-register-title">
                맞춤 추천 강의
            </div>

            <!-- 맞춤 추천 강의 -->
            <Carousel :breakpoints="breakpoints" :settings="settings" :wrap-around="true"
                class="userMain-register-carousel">
                <!-- 캐러셀 -->
                <Slide v-for="i in lecture" :key="i" class="userMain-register-carousel-item">
                    <div class="userMain-register-carousel-video">
                    </div>
                    <div class="userMain-register-video-info">
                        <!-- 강의 번호 -->
                        <div class="userMain-register-video-info-number">
                            {{ i.lecture_no }}
                        </div>
                        <!-- 강의 제목 및 수강 버튼 -->
                        <div>
                            <div class="userMain-register-video-info-title">
                                {{ i.title }}
                            </div>
                            <div class="userMain-video-info-bottom">
                                <span class="userMain-video-kind">
                                    <span v-if="i.lecture_type == 'live'" style="color: red; font-weight: 700;">· 라이브</span>

                                    <span v-if="i.lecture_type == 'vod'">동영상</span>
                                </span>
                                <button v-if="i.price == 0" @click="user_route_video_page(i)" class="userMain-video-button">
                                    수강하기
                                </button>
                                <button v-else-if="i.paid = true" @click="user_route_video_page(i)"
                                    class="userMain-video-button">
                                    수강하기
                                </button>
                                <button v-else class="userMain-video-button
                                    userMain-video-button-buy">
                                    {{ i.price }} 원 구매하기
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- 강의 태그 -->
                    <span v-for="j in i.category" :key="j" class="userMain-video-tag">
                        {{ j.title }}
                    </span>
                </Slide>

                <template #addons>
                    <Navigation />
                    <!-- <Pagination /> -->
                </template>
            </Carousel>

            <!-- 등록 강의 -->
            <div class="userMain-register-title">
                수강 기간 매핑 강의
            </div>

            <!-- 수강 기간 매핑 강의 -->
            <Carousel :breakpoints="breakpoints" :settings="settings" :wrap-around="true"
                class="userMain-register-carousel">
                <!-- 캐러셀 -->
                <Slide v-for="i in lecture" :key="i" class="userMain-register-carousel-item">
                    <div class="userMain-register-carousel-video">
                    </div>
                    <div class="userMain-register-video-info">
                        <!-- 강의 번호 -->
                        <div class="userMain-register-video-info-number">
                            {{ i.lecture_no }}
                        </div>
                        <!-- 강의 제목 및 수강 버튼 -->
                        <div>
                            <div class="userMain-register-video-info-title">
                                {{ i.title }}
                            </div>
                            <div class="userMain-video-info-bottom">
                                <span class="userMain-video-kind">
                                    <span v-if="i.lecture_type == 'live'" style="color: red; font-weight: 700;">· 라이브</span>

                                    <span v-if="i.lecture_type == 'vod'">동영상</span>
                                </span>
                                <button v-if="i.price == 0" @click="user_route_video_page(i)" class="userMain-video-button">
                                    수강하기
                                </button>
                                <button v-else-if="i.paid = true" @click="user_route_video_page(i)"
                                    class="userMain-video-button">
                                    수강하기
                                </button>
                                <button v-else class="userMain-video-button
                                    userMain-video-button-buy">
                                    {{ i.price }} 원 구매하기
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- 강의 태그 -->
                    <span v-for="j in i.category" :key="j" class="userMain-video-tag">
                        {{ j.title }}
                    </span>
                </Slide>

                <template #addons>
                    <Navigation />
                    <!-- <Pagination /> -->
                </template>
            </Carousel>


        </div>

        <!-- Footer -->
        <div class="userMain-footer">
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

        <button @click="createMeeting()">
            meeting
        </button>
    </div>
</template>
  
<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';

import axios from 'axios';

export default {
    name: 'userMain',
    data() {
        return {
            lecture: [],
            // carousel settings
            settings: {
                itemsToShow: 1,
                snapAlign: 'center',
            },
            // breakpoints are mobile first
            // any settings not specified will fallback to the carousel settings
            breakpoints: {
                500: {
                    itemsToShow: 1,
                    snapAlign: 'center',
                },
                900: {
                    itemsToShow: 3,
                    snapAlign: 'center',
                },
                1400: {
                    itemsToShow: 4,
                    snapAlign: 'start',
                },
                1600: {
                    itemsToShow: 5,
                    snapAlign: 'start',
                },
            },
        }
    },
    created: async function () {
        const token = 'Bearer ' + localStorage.getItem('token')
        await axios.get(
            'https://api-government.didisam.com/api/lecture',
            {
                headers: {
                    Authorization: token
                }
            }).then((res) => {
                this.lecture = res.data.result;
            })
    },
    props: {
    },
    components: {
        Carousel,
        Slide,
        Navigation,
    },
    methods: {
        async createMeeting() {
            try {
                const response = await axios.post('/api/chimeMeeting/createMeeting')
                const meetingId = response.data.Meeting.MeetingId
                const joinToken = response.data.JoinInfo.Attendee.AttendeeId

                console.log(meetingId);
                console.log(joinToken);

                this.$router.push({
                    path: '/test',
                    query: {
                        meetingId: meetingId,
                        joinToken: joinToken
                    }
                })
            } catch (error) {
                console.error(error)
            }
        },
        user_route_video_page: async function (now_lecture) {
            const token = 'Bearer ' + localStorage.getItem('token')
            await axios.get(
                'https://api-government.didisam.com/api/lecture/' + now_lecture.lecture_no,
                {
                    headers: {
                        Authorization: token
                    }
                }).then((res) => {
                    const video_url = res.data.result.video_url;

                    this.$router.push({
                        path: '/video',
                        query: {
                            // router query push할 때, JSON 데이터를 유지하려면 stringfy와 parse 과정이 필요하다.
                            lecture: JSON.stringify(now_lecture),
                            video_url: video_url
                        }
                    })
                })
        }
    },
}
</script>
  
<style>
@import "@/css/userMain.css";
</style>
  