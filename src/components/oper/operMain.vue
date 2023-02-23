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
            <span class="operMain-tap-item" style="color: #4DAED3;">
                강의
            </span>
            <span class="operMain-tap-item" @click="$router.push('/operCloud')">
                영상 클라우드
            </span>
        </div>
        <hr /><br />


        <div class="operMain-class-container">
            <div class="operMain-class-list">
                <span v-for="i in 16" :key="i" class="operMain-class-list-item">
                    <!-- 강의 만들기 -->
                    <div v-if="i == 1">
                        <div class="operMain-class-list-create">
                            <div>
                                + &nbsp;
                            </div>
                            <div>
                                강의 만들기
                            </div>
                        </div>
                        <br />
                        <br />
                    </div>

                    <!-- 강의 목록 -->
                    <div v-else>
                        <div class="operMain-class-list-video">
                        </div>
                        <div class="operMain-class-list-info">
                            <!-- 강의 번호 -->
                            <div class="operMain-class-list-video-info-number">
                                {{ i - 1 }}
                            </div>
                            <!-- 강의 제목 및 수강 버튼 -->
                            <div>
                                <div class="operMain-class-list-video-info-title">
                                    데이터베이스 프로그래밍 및 분석 강의ddddddd
                                </div>
                                <div class="operMain-class-list-video-info-bottom">
                                    <span class="operMain-video-kind">
                                        동영상
                                    </span>
                                    <button class="operMain-class-list-video-button">
                                        무료
                                    </button>
                                </div>
                            </div>
                        </div>
                        <!-- 강의 태그 -->
                        <span v-for="i in 3" :key="i" class="operMain-video-tag">
                            데이터분석
                        </span>
                    </div>
                </span>
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
export default {
    name: 'operMain',
    props: {
    },
    components: {
    },
}
</script>
  
<style>
@import "@/css/operMain.css";
</style>
  