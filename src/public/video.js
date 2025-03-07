var playlist = [];
var player;
var currentVideoId;
var videoIndexValue = 0;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        playerVars: {
            // 'videoId': "x-_2eo7cSI0", // 
            'controls': 1,
            'rel': 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

async function onPlayerReady(event) {
    event.target.setVolume(100);
    if (playlist.length > 0) {
        currentVideoId = playlist[0].videoId;
        event.target.loadVideoById(currentVideoId);
    }
}

function onPlayerStateChange(event) {
    if (event.data == 0) { // Video kết thúc
        playNext();
    }
}

function playNext() {
    if (!player || typeof player.loadVideoById !== 'function') {
        console.log('Player chưa sẵn sàng');
        return;
    }
    videoIndexValue = playlist.findIndex(element => element.videoId == currentVideoId);
    if (videoIndexValue < playlist.length - 1) {
        player.loadVideoById(playlist[videoIndexValue + 1].videoId);
        currentVideoId = playlist[videoIndexValue + 1].videoId;
        videoIndexValue += 1;
    } else {
        videoIndexValue = 0;
        currentVideoId = playlist[0].videoId;
        player.loadVideoById(playlist[0].videoId);
    }
}

const getData = async () => {
    const response = await fetch('/videos');
    const data = await response.json();
    return data;
};
const getName = async () =>{
    const response = await fetch('/user/name');
    const data = await response.json();
    return data;
}
function clickVideo(videoId) {
    if (!player || typeof player.loadVideoById !== 'function') {
        console.log('Player chưa được khởi tạo');
        setTimeout(() => clickVideo(videoId), 1000);
        return;
    }
    videoIndexValue = playlist.findIndex(element => element.videoId == currentVideoId);
    currentVideoId = videoId;
    player.loadVideoById(videoId);
}

(async function initialize() {
    const response = await getData();
    if (response.message) { // server tra ra du lieu video hoac message 
        window.location.href = '/home';
        return;
    }
    playlist = response.data;
    // console.log("playlist : " + playlist);
    try {
        const response = await fetch('/user/nameUser');
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json();
        document.getElementById('ten').textContent = json.name;
        // console.log(json);
      } catch (error) {
        console.error(error.message);
      }
    
    loadVideos();
    onYouTubeIframeAPIReady();
})();


var smallImages;
var smallImageTitles;
var smallElements;

const createListVideo = (playList) => {
    $(".container-list-vd").empty(); // xóa danh sách cũ trước khi tạo lại
    playList.forEach((element, index) => {
        $(".container-list-vd").append(`
            <div class="small-elements" data-videoid="${element.videoId}">
                <img class="small-img" src="https://i.ytimg.com/vi/${element.videoId}/hqdefault.jpg" alt="thumbnail">
                <h6 class="small-img-title">${element.title}</h6>
                <button class="delete-btn" onclick="deleteVideo('${element.videoId}')">X</button>
            </div>`);
    });
};


const loadVideos = async () => { // 
    const data1 = await getData();

    if (data1.message == null) { // server trả message hoặc toàn bộ dữ liệu video
        playlist = data1.data;

        if (playlist.length === 0) {
            $(".container-list-vd").html('<h6 style=" color: red;text-align: center;"> Hãy copy một link youtube rồi paste vào ô');
            return; 
        }
        createListVideo(playlist);
        smallImages = document.getElementsByClassName('small-img');
        smallImageTitles = document.getElementsByClassName('small-img-title');
        smallElements = document.getElementsByClassName('small-elements');

        for (let i = 0; i < playlist.length; i++) {
            // smallImages[i].src = `https://i.ytimg.com/vi/${data.data[i].videoId}/${data.data[i].thumbnail}`;
            // smallImageTitles[i].textContent = data.data[i].title;
            (function (videoId) {
                smallElements[i].addEventListener('click', function (e) {
                    e.preventDefault();
                    // alert('test');
                    currentVideoId = playlist[i].videoId; // biến toàn cục
                    // console.log("current video ID " + currentVideoId);
                    clickVideo(videoId);
                });
            })(playlist[i].videoId);
        }
    }

    else{
        window.location.href = "/home/index.html"
    }
};

async function deleteVideo(videoId) { // xoa video
    const response = await fetch(`/videos/${videoId}`, {
        method: "DELETE",
    });
    const data = await response.json();
    // alert(data.message);

    if (data.message === "delete success") {
        // playlist = playlist.filter(video => video.videoId !== videoId);
        // createListVideo(playlist);
        loadVideos();
    }
}

const form_submit = document.getElementById('form-post');
const inputLink = document.getElementById('input-link');
form_submit.addEventListener('submit',async (e) =>{
    e.preventDefault();
   const dataReceived = await post();
   alert(dataReceived.message);
   inputLink.value = "";
   if(dataReceived.message == "Thêm video thành công"){
    playlist = [];
    $('.container-list-vd').empty();
    loadVideos();
   }
})

async function post(){
    const response = await fetch("/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ linkYoutube: inputLink.value}),
      });
    const data = await response.json();
    return data;
}