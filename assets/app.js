    const $ = document.querySelector.bind(document)
    const $$ = document.querySelectorAll.bind(document)

    const playList = $('.playlist')
    const cd = $('.cd')
    const haeding = $('header h2')
    const cdThumb = $('.cd-thumb')
    const audio = $('#audio')
    const playBtn = $('.btn-toggle-play')
    const player = $('.player')
    const progress = $('#progress')
    const nextBtn = $('.btn-next')
    const prevBtn = $('.btn-prev')
    const randomBtn = $('.btn-random')
    const repeatBtn = $('.btn-repeat')

    const app = {
        currentIndex: 0,
        isPlaying: false,
        isRandom: false,
        isRepeat: false,
        // config: {},
        // // (1/2) Uncomment the line below to use localStorage
        // // config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
        songs: [
            {
                name: 'Bao Tiền Một Mớ Bình Yên',
                singer: '14 Casper & Bon',
                path: './assets/music/BaoTienMotMoBinhYenLofiVersion-14CasperBonFreakD-6982202.mp3',
                image: './assets/img/BaoTienMotMoBinhYen.jpg'
            },
            {
                name: 'Biết Em',
                singer: 'Lynk Nguyen',
                path: './assets/music/BietEm-LynkNguyen-7117652.mp3',
                image: './assets/img/BietEm.jpg'
            },
            {
                name: 'Có Ai Ở Đây Không ?',
                singer: '14 Casper & Bon',
                path: './assets/music/CoAiODayKhong-14CasperBon-6262416.mp3',
                image: './assets/img/CoAiODayKhong.jpg'
            },
            {
                name: 'Cỏ Gió Và Mây',
                singer: 'Nha',
                path: './assets/music/CoGioVaMay-NHA-6267108.mp3',
                image: './assets/img/CoGioVaMay.jpg'
            },
            {
                name: 'Đi Qua Hoa Cúc',
                singer: 'TeA ft. VoVanDuc',
                path: './assets/music/DiQuaHoaCuc-TaynguyenSoundTungTeAVoVanDuc-7034664.mp3',
                image: './assets/img/ĐiQuaHoaCuc.jpg'
            },
            {
                name: 'Lại Một Người Trở Về Từ Mây',
                singer: 'Nha',
                path: './assets/music/LaiMotNguoiTroVeTuMay-NHA-6362237.mp3',
                image: './assets/img/LaiMotNguoiTroVeTuMay.jpg'
            },
            {
                name: 'Luyến',
                singer: 'Nha',
                path: './assets/music/Luyen-NHA-5162623.mp3',
                image: './assets/img/Luyen.jpg'
            },
            {
                name: '10 Ngàn Năm',
                singer: 'Prod. Duckie',
                path: './assets/music/MuoiNganNam-PCDuckie-6183024.mp3',
                image: './assets/img/MuoiNganNam.jpg'
            },
            {
                name: 'Muốn Được Cùng Em',
                singer: 'FREAKY x CM1X',
                path: './assets/music/MuonDuocCungEm-Freaky-6792500.mp3',
                image: './assets/img/MuonDuocCungEm.jpg'
            },
            {
                name: 'Muốn Nói Với Em',
                singer: 'TTeam',
                path: './assets/music/MuonNoiVoiEm-TTeam-6288870.mp3',
                image: './assets/img/MuonNoiVoiEm.jpg'
            },
            {
                name: 'Sinh Ra Đã Là Thứ Đối Lập',
                singer: 'Freak D Lofi Ver.',
                path: './assets/music/SinhRaDaLaThuDoiLapNhau-EmceeLDaLABBadbies-6896982.mp3',
                image: './assets/img/SinhRaDaLaThuDoiLap.jpg'
            },
        ],

        render: function () {
            const htmls = this.songs.map((song, index) => {
                return `
                    <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                        <div class="thumb"
                        style="background-image: url('${song.image}')">
                        </div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>
                `
            })
            playList.innerHTML = htmls.join('')
        },
        defineProperties: function() {
            Object.defineProperty(this,'currentSong', {
                get: function() {
                    return this.songs[this.currentIndex]
                }
            })
        },
        handleEvents: function() {
            const _this = this
            const cdWidth = cd.offsetWidth

            // Xử lý CD quay / dừng
        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ], {
            duration: 15000, // 10 seconds
            iterations: Infinity // Vô hạn
        })
        cdThumbAnimate.pause()

            // Xử lý phóng to / thu nhỏ CD
            document.onscroll = function() {
                const scrollTop = window.scrollY || document.documentElement.scrollTop
                newCdWidth = cdWidth - scrollTop
                cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
                cd.style.opacity = newCdWidth / cdWidth
            }

            // Xử lý khi click play
            playBtn.onclick = function() {
                if(_this.isPlaying) {
                    audio.pause()
                }
                else {
                    audio.play()
                }
            }
            // Khi song được play 
            audio.onplay = function() {
                _this.isPlaying = true
                player.classList.add('playing')
                cdThumbAnimate.play()
            }
            // Khi song được pause
            audio.onpause = function() {
                _this.isPlaying = false
                player.classList.remove('playing')
                cdThumbAnimate.pause()
            }

            // Khi tiến độ bài hát thay đổi
            audio.ontimeupdate = function() {
                if(audio.duration) {
                    const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                    progress.value = progressPercent
                }
            }

            // Xử lý khi tua bài hát
            progress.oninput = function(e) {
                const seekTime = audio.duration / 100 * e.target.value
                audio.currentTime = seekTime
            }

            // Khi next bài hát
            nextBtn.onclick = function() {
                nextBtn.classList.add('active')
            if(_this.isRandom) {
                _this.playRandomSong()
            }
            else {
                    _this.nextSong()
            }
            audio.play()
            setTimeout(function() {
                        nextBtn.classList.remove('active')
                    }, 200)
                _this.activeSong()
                _this.scrollToActiveSong()
            }

            // Khi prev bài hát
            prevBtn.onclick = function() {
                prevBtn.classList.add('active')
                if(_this.isRandom) {
                    _this.playRandomSong()
                }
                else {
                    _this.prevSong()
                }
                audio.play()
                setTimeout(function() {
                    prevBtn.classList.remove('active')
                }, 200)
                _this.activeSong()
                _this.scrollToActiveSong()
            }

            // Xử lý Random bài hát
            randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active',_this.isRandom)
            }

            // Xử lý phát lại 1 bài hát
            repeatBtn.onclick = function() {
                _this.isRepeat = !_this.isRepeat
                repeatBtn.classList.toggle('active', _this.isRepeat)
            }

            // Xử lý  bài hát khi ended
            audio.onended = function() {
            if(_this.isRepeat) {
                audio.play()
            }
            else {
                nextBtn.click()
            }
            }

            // Lắng nghe hành vi click vào playlist
            playList.onclick = function(e) {
                const songNode = e.target.closest('.song:not(.active)')
                // Xử lý khi click vào bài hát
                if(songNode || e.target.closest('.options')) {
                    // Xử lý khi click vào song
                    if(songNode) {
                        _this.currentIndex = songNode.dataset.index
                        _this.loadCurrentSong()
                        _this.activeSong()
                        audio.play()
                    }
                }
            }
        },
        scrollToActiveSong: function() {
            setTimeout(function() {
                $('.song.active').scrollIntoView({
                    behavior: 'smooth',
                    block: 'end'
                })
            }, 300)
        },
        loadCurrentSong: function() {
            haeding.textContent = this.currentSong.name
            cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
            audio.src = this.currentSong.path
        },
        nextSong: function() {
            this.currentIndex++
            if(this.currentIndex == this.songs.length) {
                this.currentIndex = 0
            }
        this.loadCurrentSong()
        },
        prevSong: function() {
            this.currentIndex--
            if(this.currentIndex < 0) {
                this.currentIndex = this.songs.length - 1
            }
            this.loadCurrentSong()
        },
        playRandomSong: function() {
            let newIndex
            do{
                newIndex = Math.floor(Math.random() * this.songs.length)
            } while(newIndex == this.currentIndex)

            this.currentIndex = newIndex
            this.loadCurrentSong()
        },
        activeSong: function(){
            var loopSongs = $$('.song')
            for (song of loopSongs){
                    song.classList.remove('active')
            }
            const activeSong = loopSongs[this.currentIndex]
            activeSong.classList.add('active')
        },
        start: function () {
            // Định nghĩa các thuộc tính cho Object
            this.defineProperties()

            // Lắng nghe / xử lý các sự kiện (DOM events)
            this.handleEvents()

            // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
            this.loadCurrentSong()

            // Render playlist
            this.render()
        }
    }

    app.start()
