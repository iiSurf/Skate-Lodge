/* The probe page: finds out what this phone and browser can do, for planning the next phases. It sends nothing anywhere,
   asks for each permission only after a tap, never starts listening to the microphone, and never shows or keeps a position. */

const $ = (id) => document.getElementById(id);
const say = (id, text, ok) => {
  const el = $(id);
  el.textContent = text;
  el.className = "result " + (ok === true ? "ok" : ok === false ? "no" : "");
};

say("ua", `Browser: ${navigator.userAgent}`);
const standalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
say("standalone", standalone ? "Opened from the Home Screen." : "Opened in the browser (add it to the Home Screen to test that too).", standalone);

/* A clip's frame rate: play it and time the frames the browser shows. */
$("clip").addEventListener("change", async () => {
  const file = $("clip").files[0];
  if (!file) return;
  const v = $("video");
  if (!("requestVideoFrameCallback" in HTMLVideoElement.prototype)) return say("fps", "This browser cannot time a video's frames.", false);
  const url = URL.createObjectURL(file);
  v.src = url;
  say("fps", "Timing the frames…");
  try {
    await v.play();
    const times = [];
    await new Promise((resolve) => {
      const cb = (now, meta) => {
        times.push(meta.mediaTime);
        if (times.length < 90 && !v.ended) v.requestVideoFrameCallback(cb);
        else resolve();
      };
      v.requestVideoFrameCallback(cb);
      setTimeout(resolve, 6000);
    });
    v.pause();
    const gaps = times.slice(1).map((t, i) => t - times[i]).filter((g) => g > 0).sort((a, b) => a - b);
    if (gaps.length < 5) return say("fps", "Could not time enough frames.", false);
    const fps = 1 / gaps[Math.floor(gaps.length / 2)];
    say("fps", `About ${Math.round(fps)} frames a second (${v.videoWidth} by ${v.videoHeight}). Jump Lab needs 60.`, fps >= 55);
  } catch {
    say("fps", "This video could not be played here.", false);
  } finally {
    URL.revokeObjectURL(url);
  }
});

$("persist").addEventListener("click", async () => {
  if (!navigator.storage || !navigator.storage.persist) return say("persist-r", "This browser cannot be asked to keep stored files.", false);
  const ok = await navigator.storage.persist();
  say("persist-r", ok ? "Stored files will be kept." : "The browser said no: stored files may be cleared after a while.", ok);
});

$("motion").addEventListener("click", async () => {
  try {
    if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
      const r = await DeviceOrientationEvent.requestPermission();
      return say("motion-r", r === "granted" ? "Motion allowed." : "Motion was refused.", r === "granted");
    }
    say("motion-r", typeof DeviceOrientationEvent !== "undefined" ? "Motion works without asking here." : "No motion on this device.", typeof DeviceOrientationEvent !== "undefined");
  } catch {
    say("motion-r", "Asking for motion failed.", false);
  }
});

$("geo").addEventListener("click", () => {
  if (!navigator.geolocation) return say("geo-r", "No location on this device.", false);
  say("geo-r", "Asking…");
  navigator.geolocation.getCurrentPosition(
    (pos) => say("geo-r", `Location works, exact to about ${Math.round(pos.coords.accuracy)} metres.`, true),
    (err) => say("geo-r", err.code === 1 ? "Location was refused." : "Location did not work.", false),
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
  );
});

const push = "PushManager" in window && "serviceWorker" in navigator && "Notification" in window;
say("push", push ? "Alerts from a website look possible here." : standalone ? "No website alerts, even from the Home Screen." : "No website alerts in the browser. On an iPhone, try again from the Home Screen.", push);
/* Only whether speech recognition exists. It is never started, so no sound is recorded or sent. */
const speech = "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
say("speech", speech ? "Speech recognition exists in this browser (not started)." : "No speech recognition in this browser.", speech);
