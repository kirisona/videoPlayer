const VideoPlayer = (function() {
  let video = null;
  let toggleBtn = null;
  let progress = null;
  let progressWrapper = null;
  let volume = null;
  let speedChange = null;

  /**
   * @desc Function init
   * @param {HTMLVideoElement} videoEl
   * @returns {Object}
   */

  function init(videoEl) {
    video = videoEl;

    _initTemplate();
    _setElements();
    _initEvents();

    return {
      play,
      stop
    };
  }

  function toggle() {
    const method = video.paused ? "play" : "pause";
    toggleBtn.textContent = video.paused ? "❚ ❚" : "►";
    video[method]();
  }

  function play() {
    video.play();
  }

  function stop() {
    video.currentTime = 0;
    video.pause();
  }

  function _initTemplate() {
    // куда вставлять новую разметку
    const parent = video.parentElement;

    const playerWrapper = _playerWrapperTemplate();
    const controlsTemplate = _controlsTemplate();

    playerWrapper.appendChild(video);
    playerWrapper.insertAdjacentHTML("beforeend", controlsTemplate);
    parent.insertAdjacentElement("afterbegin", playerWrapper);
  }

  function _playerWrapperTemplate() {
    const playerWrapper = document.createElement("div");
    playerWrapper.classList.add("player");
    return playerWrapper;
  }

  function _controlsTemplate() {
    return `
    <div class="player__controls">
       <div class="progress">
        <div class="progress__filled"></div>
       </div>
       <button class="player__button toggle" title="Toggle Play">►</button>
       <input type="range" name="volume" class="player__slider" min=0 max="1" step="0.05" value="1">
       <input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1">
       <button data-skip="-1" class="player__button">« 1s</button>
       <button data-skip="1" class="player__button">1s »</button>
     </div>
    `;
  }

  function _setElements() {
    toggleBtn = document.querySelector(".toggle");
    progress = document.querySelector(".progress__filled");
    progressWrapper = document.querySelector(".progress");
    volume = document.querySelector(".player__slider");
    speedChange = volume.nextElementSibling;
  }

  function _handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progress.style.flexBasis = `${percent}%`;
  }

  function _scrub(e) {
    video.currentTime =
      (e.offsetX / progressWrapper.offsetWidth) * video.duration;
  }

  function _changeVolume(e) {
    video.volume = (this.value / 100) * volume.offsetWidth;
  }

  function _changeSpeed(e) {
    video.playbackRate = (this.value / 100) * speedChange.offsetWidth;
  }

  function _initEvents() {
    toggleBtn.addEventListener("click", toggle);
    video.addEventListener("click", toggle);
    video.addEventListener("timeupdate", _handleProgress);
    progressWrapper.addEventListener("click", _scrub);
    volume.addEventListener("change", _changeVolume);
    speedChange.addEventListener('change', _changeSpeed);
  }

  return {
    init
  };
})();

const video = document.querySelector(".player__video");
const player1 = VideoPlayer.init(video);
