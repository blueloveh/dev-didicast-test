<template>
    <div class="userMain-container">
        <!-- nav bar -->
        <div class="row justify-content-end p-3 m-0">
            <!-- left : didicast image -->
            <div v-if="role == 'user'" class="col-10">
                <img class="userMain-didicast-image" :src="require('@/img/didicast_logo.png')" />
            </div>
            <div v-if="role == 'admin'" class="col-1">
                <img class="userMain-didicast-image" :src="require('@/img/didicast_logo.png')" />
            </div>

            <!-- 영상 아카이브 (운영자 경우) -->
            <div v-if="role == 'admin'" class="col" style="display: flex; justify-content: flex-end;">
                <button class="userMain-video-button p-2" style="background-color: #aaa;"
                    @click="$router.push('/operCloud')">
                    영상 아카이브
                </button>
            </div>
            <!-- right : user info -->
            <div class="col-2" style="display: flex; justify-content: flex-end;">
                <!-- user name -->
                <span class="userMain-username">
                    user name : <b>{{ username }}</b>
                </span>
                <!-- user image -->
                <img  @click="logout" class="userMain-profile-image" :src="require('@/img/profile.png')" style="cursor: pointer;" />
            </div>
        </div>

        <div class="userMain-class-container">
            <!-- Santa image -->
            <div class="userMain-santa-div">
                <img class="userMain-santa-image" :src="require('@/img/santa_logo.png')" />
            </div>

            <!-- 등록 강의 -->
            <div class="row mt-3 align-items-center">
                <div class="col userMain-register-title">
                    등록 강의
                </div>
                <div class="col userMain-register-lecture-count">
                    강의 개수 : {{ lecture_len }}
                </div>
            </div>

            <Carousel :breakpoints="breakpoints" :settings="settings" class="userMain-register-carousel">
                <!-- 캐러셀 -->
                <Slide v-for="(i, a) in lecture" :key="i" class="userMain-register-carousel-item">
                    <div class="userMain-register-carousel-video">
                        <img :src="i.thumbnail" crossorigin="anonymous" style="width: 100%;" />
                        <!-- {{ i.thumbnail }} -->
                    </div>
                    <div class="userMain-register-video-info">
                        <!-- 강의 번호 -->
                        <div class="userMain-register-video-info-number">
                            {{ i.lecture_no }}
                        </div>
                        <!-- 강의 제목 및 수강 버튼 -->
                        <div>
                            <div class="userMain-register-video-info-title">
                                <b>[{{ a + 1 }}]</b> {{ i.title }}
                            </div>
                            <div class="userMain-video-info-bottom">
                                <span class="userMain-video-kind">
                                    <span v-if="i.lecture_type == 'live'" style="color: red; font-weight: 700;">· 라이브</span>

                                    <span v-if="i.lecture_type == 'vod'">동영상</span>
                                </span>
                                <button v-if="i.price == 0 && role == 'user'" @click="user_route_video_page(i)"
                                    class="userMain-video-button">
                                    수강하기
                                </button>
                                <button v-else-if="i.paid == true && role == 'user'" @click="user_route_video_page(i)"
                                    class="userMain-video-button">
                                    수강하기
                                </button>
                                <button v-else-if="role == 'user'" class="userMain-video-button
                                                        userMain-video-button-buy" @click="lecture_buy(i)">
                                    {{ i.price }} 원 구매하기
                                </button>
                                <button v-else-if="i.lecture_type == 'vod' && role == 'admin'" class="userMain-video-button"
                                    @click="user_route_video_page(i)">
                                    확인하기
                                </button>
                                <button v-else-if="i.lecture_type == 'live' && role == 'admin'" class="userMain-video-button
                                                        userMain-video-button-buy" @click="user_route_video_page(i)">
                                    입장하기
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

            <!-- 맞춤 추천 강의 -->
            <div class="row mt-3 align-items-center">
                <div class="col userMain-register-title">
                    맞춤 추천 강의
                </div>
                <div class="col userMain-register-lecture-count">
                    강의 개수 : {{ recommend_lecture_len }}
                </div>
            </div>

            <!-- 맞춤 추천 강의 -->
            <Carousel :breakpoints="breakpoints" :settings="settings" class="userMain-register-carousel">
                <!-- 캐러셀 -->
                <Slide v-for="(i, a) in recommend_lecture" :key="i" class="userMain-register-carousel-item">
                    <div class="userMain-register-carousel-video">
                        <img :src="i.thumbnail" crossorigin="anonymous" style="width: 100%;" />
                        <!-- {{ i.thumbnail }} -->
                    </div>
                    <div class="userMain-register-video-info">
                        <!-- 강의 번호 -->
                        <div class="userMain-register-video-info-number">
                            {{ i.lecture_no }}
                        </div>
                        <!-- 강의 제목 및 수강 버튼 -->
                        <div>
                            <div class="userMain-register-video-info-title">
                                <b>[{{ a + 1 }}]</b> {{ i.title }}
                            </div>
                            <div class="userMain-video-info-bottom">
                                <span class="userMain-video-kind">
                                    <span v-if="i.lecture_type == 'live'" style="color: red; font-weight: 700;">· 라이브</span>

                                    <span v-if="i.lecture_type == 'vod'">동영상</span>
                                </span>
                                <button v-if="i.price == 0 && role == 'user'" @click="user_route_video_page(i)"
                                    class="userMain-video-button">
                                    수강하기
                                </button>
                                <button v-else-if="i.paid == true && role == 'user'" @click="user_route_video_page(i)"
                                    class="userMain-video-button">
                                    수강하기
                                </button>
                                <button v-else-if="role == 'user'" class="userMain-video-button
                                                        userMain-video-button-buy" @click="lecture_buy(i)">
                                    {{ i.price }} 원 구매하기
                                </button>
                                <button v-else-if="i.lecture_type == 'vod' && role == 'admin'" class="userMain-video-button"
                                    @click="user_route_video_page(i)">
                                    확인하기
                                </button>
                                <button v-else-if="i.lecture_type == 'live' && role == 'admin'" class="userMain-video-button
                                                        userMain-video-button-buy" @click="user_route_video_page(i)">
                                    입장하기
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

            <!-- 수강 기간 매핑 강의 -->
            <div class="row mt-3 align-items-center">
                <div class="col userMain-register-title">
                    수강 기간 매핑 강의
                </div>
                <div class="col userMain-register-lecture-count">
                    강의 개수 : {{ mapping_lecture_len }}
                </div>
            </div>

            <!-- 수강 기간 매핑 강의 -->
            <Carousel :breakpoints="breakpoints" :settings="settings" class="userMain-register-carousel">
                <!-- 캐러셀 -->
                <Slide v-for="(i, a) in mapping_lecture" :key="i" class="userMain-register-carousel-item">
                    <div class="userMain-register-carousel-video">
                        <img :src="i.thumbnail" crossorigin="anonymous" style="width: 100%;" />
                        <!-- {{ i.thumbnail }} -->
                    </div>
                    <div class="userMain-register-video-info">
                        <!-- 강의 번호 -->
                        <div class="userMain-register-video-info-number">
                            {{ i.lecture_no }}
                        </div>
                        <!-- 강의 제목 및 수강 버튼 -->
                        <div>
                            <div class="userMain-register-video-info-title">
                                <b>[{{ a + 1 }}]</b> {{ i.title }}
                            </div>
                            <div class="userMain-video-info-bottom">
                                <span class="userMain-video-kind">
                                    <span v-if="i.lecture_type == 'live'" style="color: red; font-weight: 700;">· 라이브</span>

                                    <span v-if="i.lecture_type == 'vod'">동영상</span>
                                </span>
                                <button v-if="i.price == 0 && role == 'user'" @click="user_route_video_page(i)"
                                    class="userMain-video-button">
                                    수강하기
                                </button>
                                <button v-else-if="i.paid == true && role == 'user'" @click="user_route_video_page(i)"
                                    class="userMain-video-button">
                                    수강하기
                                </button>
                                <button v-else-if="role == 'user'" class="userMain-video-button
                                                        userMain-video-button-buy" @click="lecture_buy(i)">
                                    {{ i.price }} 원 구매하기
                                </button>
                                <button v-else-if="i.lecture_type == 'vod' && role == 'admin'" class="userMain-video-button"
                                    @click="user_route_video_page(i)">
                                    확인하기
                                </button>
                                <button v-else-if="i.lecture_type == 'live' && role == 'admin'" class="userMain-video-button
                                                        userMain-video-button-buy" @click="user_route_video_page(i)">
                                    입장하기
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
            <div v-if="role == 'admin'" style="float: right;">
                <button style=" background-color: #aaa; border: None; color: white; padding: 10px 20px; color: white;"
                    @click="purchase_delete_all">초기화</button>
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
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';

import axios from 'axios';

export default {
    name: 'userMain',
    data() {
        return {
            lecture: [],
            recommend_lecture: [],
            mapping_lecture: [],
            lecture_len: 0,
            recommend_lecture_len: 0,
            mapping_lecture_len: 0,
            role: null,
            username: '',
            // carousel settings
            settings: {
                itemsToShow: 1,
                snapAlign: 'start',
            },
            // breakpoints are mobile first
            // any settings not specified will fallback to the carousel settings
            breakpoints: {
                500: {
                    itemsToShow: 1,
                    snapAlign: 'start',
                },
                900: {
                    itemsToShow: 3,
                    snapAlign: 'start',
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
                this.lecture_len = this.lecture.length;
            })

        await axios.get(
            'https://api-government.didisam.com/api/lecture/recommend',
            {
                headers: {
                    Authorization: token
                }
            }).then((res) => {
                this.recommend_lecture = res.data.result;
                this.recommend_lecture_len = this.recommend_lecture.length;
            })

        await axios.get(
            'https://api-government.didisam.com/api/lecture/mapping',
            {
                headers: {
                    Authorization: token
                }
            }).then((res) => {
                this.mapping_lecture = res.data.result;
                this.mapping_lecture_len = this.mapping_lecture.length;
            })
        this.username = localStorage.getItem('username')
        this.role = localStorage.getItem('role')
    },
    props: {
    },
    components: {
        Carousel,
        Slide,
        Navigation,
    },
    methods: {
        user_route_video_page: async function (now_lecture) {
            const token = 'Bearer ' + localStorage.getItem('token')
            await axios.get(
                'https://api-government.didisam.com/api/lecture/' + now_lecture.lecture_no,
                {
                    headers: {
                        Authorization: token
                    }
                }).then((res) => {
                    // 동영상 강의인 경우
                    if (now_lecture.lecture_type == 'vod') {
                        const video_url = res.data.result.video_url;

                        this.$router.push({
                            path: '/video',
                            query: {
                                // router query push할 때, JSON 데이터를 유지하려면 stringfy와 parse 과정이 필요하다.
                                lecture: JSON.stringify(now_lecture),
                                video_url: video_url
                            }
                        })
                    }
                    // 라이브 강의인 경우
                    else {
                        // const url = 'runDIDICAM://';
                        // const exec = document.createElement('a');
                        // exec.setAttribute('href', url);
                        // exec.click();

                        // const live_url = res.data.result.live_url;
                        // window.open(live_url, "_blank");
                        
                        // user인 경우, 현재 라이브 강의가 존재하는지 확인한다. 존재한다면 입장하고, 존재하지 않는다면 경고문을 띄운다.
                        if (this.role == 'user') {
                            axios.post('/api/chime/meetingId', {
                                externalMeetingId: now_lecture.title
                            }).then((res) => {
                                if (res.data == "none") {
                                    alert("라이브 강의가 존재하지 않습니다. ");
                                }
                                else {
                                    this.$router.push({
                                        path: '/meeting',
                                        query: {
                                            // router query push할 때, JSON 데이터를 유지하려면 stringfy와 parse 과정이 필요하다.
                                            lecture: JSON.stringify(now_lecture),
                                        }
                                    })
                                }
                            });
                        }
                        // admin일 경우, 라이브 강의 방을 생성하여 입장할 수 있도록 바로 meeting 페이지로 이동한다.
                        else if (this.role == 'admin') {
                            this.$router.push({
                                path: '/meeting',
                                query: {
                                    // router query push할 때, JSON 데이터를 유지하려면 stringfy와 parse 과정이 필요하다.
                                    lecture: JSON.stringify(now_lecture),
                                }
                            })
                        }
                    }
                })
        },
        lecture_buy: async function (now_lecture) {
            alert("구매 완료되었습니다. 강의 수강 페이지로 이동합니다.");

            const token = 'Bearer ' + localStorage.getItem('token')
            await axios.get(
                'https://api-government.didisam.com/api/lecture/' + now_lecture.lecture_no,
                {
                    headers: {
                        Authorization: token
                    }
                }).then((res) => {
                    // 동영상 강의인 경우
                    if (now_lecture.lecture_type == 'vod') {
                        const video_url = res.data.result.video_url;

                        this.$router.push({
                            path: '/video',
                            query: {
                                // router query push할 때, JSON 데이터를 유지하려면 stringfy와 parse 과정이 필요하다.
                                lecture: JSON.stringify(now_lecture),
                                video_url: video_url
                            }
                        })
                    }
                    // 라이브 강의인 경우
                    else {
                        // const live_url = res.data.result.live_url;

                        // window.open(live_url, "_blank");

                        // user인 경우, 현재 라이브 강의가 존재하는지 확인한다. 존재한다면 입장하고, 존재하지 않는다면 경고문을 띄운다.
                        if (this.role == 'user') {
                            axios.post('/api/chime/meetingId', {
                                externalMeetingId: now_lecture.title
                            }).then((res) => {
                                if (res.data == "none") {
                                    alert("라이브 강의가 존재하지 않습니다. ");
                                }
                                else {
                                    this.$router.push({
                                        path: '/meeting',
                                        query: {
                                            // router query push할 때, JSON 데이터를 유지하려면 stringfy와 parse 과정이 필요하다.
                                            lecture: JSON.stringify(now_lecture),
                                        }
                                    })
                                }
                            });
                        }
                        // admin일 경우, 라이브 강의 방을 생성하여 입장할 수 있도록 바로 meeting 페이지로 이동한다.
                        else if (this.role == 'admin') {
                            this.$router.push({
                                path: '/meeting',
                                query: {
                                    // router query push할 때, JSON 데이터를 유지하려면 stringfy와 parse 과정이 필요하다.
                                    lecture: JSON.stringify(now_lecture),
                                }
                            })
                        }
                    }
                })
        },
        logout: async function () {
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
        purchase_delete_all() {
            const token = 'Bearer ' + localStorage.getItem('token')
            axios.delete(
                'https://api-government.didisam.com/api/lecture',
                {
                    headers: {
                        Authorization: token
                    }
                }).then((res) => {
                    this.$router.go(0);
                })
        }
    },
}
</script>
  
<style>
@import "@/css/userMain.css";
</style>
  