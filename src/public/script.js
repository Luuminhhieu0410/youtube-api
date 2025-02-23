var playlist = [];
var player;
var currentVideoId;
var videoIndexValue = 0 ;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        playerVars: {
            'controls': 1,
            'rel': 0
        },
        events: {
            'onReady': onPlayerReady,// 
            'onStateChange': onPlayerStateChange
        }
    });
}
async function onPlayerReady(event) {
    event.target.setVolume(100); 
    const data = await getData();
    playlist = data.data;
    // console.log('khoi tao thanh cong');
}

async function onPlayerStateChange(event) {
    // console.log("trang thai video", event.data);
    // console.log(playlist)
    if (event.data == 0) { // ket thuc video
        playNext();
    }
}

function playNext() {
    // console.log('hien tại ' + currentVideoId);
    videoIndexValue = playlist.findIndex(element => element.videoId == currentVideoId); 
    // videoIndexValue = videoIndexValue == playlist.length ? videoIndexValue : 0;
    // console.log('vị trí hiện tại '+ videoIndexValue );
    // console.log('tiếp theo ' + currentVideoId);

    // console.log("vi tri video hien tai trong mang " + videoIndexValue);
    if (videoIndexValue < playlist.length) {
        // console.log('id video tiep theo ' + playlist[videoIndexValue + 1].videoId)
        player.loadVideoById(playlist[videoIndexValue + 1].videoId);
        currentVideoId = playlist[videoIndexValue + 1].videoId; // biến toàn cục
        videoIndexValue += 1; // biến toàn cục
    }
    else {
        videoIndexValue = 0;
        currentVideoId = playlist[0].videoId; // biến toàn cục
        player.loadVideoById(playlist[0].videoId)
    }
}

const getData = async () => { //lay du lieu tu api
    const response = await fetch('/video');
    const data = await response.json();
    return data;
};


function clickVideo(videoId) {
    if (!player || typeof player.loadVideoById !== 'function') {
        // onYouTubeIframeAPIReady();
        return;
    }
    videoIndexValue = playlist.findIndex(element => element.videoId == currentVideoId);  //biến toàn cục;
    currentVideoId = videoId; // biến toàn cục
    player.loadVideoById(videoId);
}


var smallImages;
var smallImageTitles;
var smallElements;

const createListVideo = (playList) => {
    playList.forEach(element => {
        $(".container-list-vd").append(`
                <div class="small-elements">
                    <img class="small-img" src="https://i.ytimg.com/vi/${element.videoId}/${element.thumbnail}" alt="thumbnail">
                    <h6 class="small-img-title">${element.title}</h6>
                </div>`);
    });
}

const loadVideos = async () => { // 
    const data1 = await getData();
    playlist = data1.data;
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
                currentVideoId = playlist[i].videoId; // biến toàn cục
                // console.log("current video ID " + currentVideoId);
                clickVideo(videoId);
            });
        })(playlist[i].videoId);
    }   
};

loadVideos();

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
    const response = await fetch("/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ linkYoutube: inputLink.value}),
      });
    const data = await response.json();
    return data;
}
