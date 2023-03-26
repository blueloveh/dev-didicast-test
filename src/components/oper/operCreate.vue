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
            <span class="operMain-tap-item">
                영상 클라우드
            </span>
        </div>
        <hr /><br />

        <div class="container-lg">
            <!-- 강의명, 강의썸네일 + 강의 설명 -->
            <div class="operCreate-create-container mb-5 row justify-content-between">
                <!-- 강의명, 강의썸네일 -->
                <span class="col-5">
                    <!-- 강의 만들기 -->
                    <div class="operCreate-create-title">
                        강의 만들기
                    </div>

                    <div class="mt-4 operCreate-titles">
                        강의명
                    </div>
                    <input type="text" class="operCreate-title-input" />

                    <div class="col-9 mt-5">
                        <div class="row">
                            <div class="col-5 operCreate-titles">
                                강의 썸네일
                            </div>
                            <div class="col-7">
                                <button class="operCreate-thumbnail-upload">
                                    업로드
                                </button>
                            </div>

                        </div>
                        <div class="operCreate-thumbnail-empty">

                        </div>
                    </div>
                </span>

                <!-- 강의 설명 -->
                <span class="col-6">
                    <div class="operCreate-titles">
                        강의 설명
                    </div>

                    <input type="textarea" class="row operCreate-textarea" />
                </span>

                <!-- 카테고리 선택 타이틀 -->
                <div class="row mt-5">
                    <div class="operCreate-titles">
                        카테고리 선택
                    </div>
                </div>

                <!-- 카테고리 선택 테이블 -->
                <div class="row">
                    <table class="table table-bordered">
                        <tr class="align-middle">
                            <!-- 카테고리 드롭다운 -->
                            <td scope="col" width="30%">
                                <div class="dropdown">
                                    <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        <!-- 나중에 데이터바인딩 -->
                                        -- 카테고리를 선택하세요. --
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a class="dropdown-item" href="#">프로그래밍</a></li>
                                        <li><a class="dropdown-item" href="#">프론트엔드</a></li>
                                        <li><a class="dropdown-item" href="#">백엔드</a></li>
                                    </ul>
                                </div>
                            </td>

                            <!-- 추가 카테고리 -->
                            <td width="20%" class="operCreate-table-add-category">
                                추가 카테고리
                            </td>

                            <!-- 카테고리 태그 -->
                            <td width="50%">
                                <!-- 필 배지 -->
                                <span v-for="i in 3" :key="i" class="badge rounded-pill"
                                    style="background-color: #16334F; margin: 0px 5px;">
                                    <!-- X 버튼 -->
                                    <button type="button" class="btn-close btn-close-white" aria-label="Close"></button>

                                    <!-- 태그 이름 -->
                                    <span>
                                        태그 {{ i }}
                                    </span>
                                </span>
                            </td>
                        </tr>
                    </table>

                    <!-- 동영상 or 라이브 선택 버튼 -->
                    <div class="row">
                        <!-- 동영상 -->
                        <div :class="{
                            'col-2': true,
                            'operCreate-select-video-kind': LectureType == 'live',
                            'operCreate-select-video-kind-selected': LectureType == 'video',
                        }" style="border-right: None;" @click="LectureType = 'video'">
                            동영상
                        </div>

                        <!-- 라이브 -->
                        <div :class="{
                            'col-2': true,
                            'operCreate-select-video-kind': LectureType == 'video', 'operCreate-select-video-kind-selected': LectureType == 'live',
                        }" @click="LectureType = 'live'">
                            라이브
                        </div>
                    </div>

                    <!-- 동영상 or 라이브 box -->
                    <div class="row">
                        <div class="col operCreate-select-video-box">
                            <div v-if="LectureType == 'video'" class="row m-5">
                                <!-- 강의 영상 선택 -->
                                <div class="col-3">
                                    <button class="operCreate-thumbnail-upload">
                                        강의 영상 선택
                                    </button>
                                </div>
                                <!-- 선택한 강의 썸네일 -->
                                <div class="col-9">
                                    <div class="operCreate-thumbnail-empty-selected"></div>
                                </div>
                            </div>

                            <div v-else class="row m-5">
                                <!-- <el-date-picker type="date" placeholder="시작일" value-format="yyyyMMdd"></el-date-picker> -->
                            </div>


                        </div>
                    </div>

                </div>

                <!-- 강의 가격 설정 타이틀 -->
                <div class="row mt-5">
                    <div class="operCreate-titles">
                        강의 가격 설정
                    </div>
                </div>

                <!-- 강의 가격 설정 -->
                <div class="row">
                    <div class="operCreate-price-setting">
                        <table class="table table-bordered">
                            <tr class="align-middle">
                                <td class="p-3">
                                    <div class="radio red">
                                        <input type="radio" name="group2" id="radio_price_free" />
                                        <label for="radio_price_free">무료</label>
                                    </div>
                                </td>
                                <td class="p-3"
                                style="display: flex;">
                                    <div class="col-2 radio red">
                                        <input type="radio" name="group2" id="radio_price_pay"/>
                                        <label for="radio_price_pay">유료</label>
                                    </div>
                                        <div>
                                            <input type="text" />
                                        </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>

                <!-- 강의 생성하기 -->
                <div class="row mt-4">
                    <button class="operCreate-create-button"
                    style="width: 30%;">
                        강의 생성하기
                    </button>
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
export default {
    name: 'operCreate',
    data() {
        return {
            LectureType: 'live', // or 'live'
        };
    },
    props: {
    },
    components: {
    },
}
</script>
  
<style>
@import "@/css/operCreate.css";
@import "@/css/operMain.css";
</style>
  