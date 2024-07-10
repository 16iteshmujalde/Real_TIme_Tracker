const socket = io();
// console.log("heyyy");

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      socket.emit("sendLocation", { latitude, longitude });
    },
    (error) => {
      console.log(error);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout:5000
    }
  );
}
const map =L.map("map").setView([0, 0], 15);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:"Itesh_live_Tracker"

}).addTo(map)

const marker={};
socket.on("receiveLocation",(data)=>{
    const {id,latitude,longitude}=data
    map.setView([latitude,longitude],15);
    if(marker[id]){
        marker[id].setLatLng([latitude,longitude]);
    }
    else{
        marker[id]=L.marker([latitude,longitude]).addTo(map)
    }
})
// socket.on("user_disconnected",(id)=>{
//     if(marker[id]){
//         map.removeLayer(marker[id])
//         delete marker[id]
//     }
// })