
const map = L.map('map').setView([47.3769, 8.5417], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const eventsLayer = L.layerGroup().addTo(map);

// Load events
fetch('data/events.json')
  .then(res => res.json())
  .then(events => {
    eventsLayer.clearLayers();
    events.forEach(ev => {
      const r = ev.size === 'gross' ? 16 : ev.size === 'mittel' ? 10 : 5;
      L.circleMarker([ev.lat, ev.lng], {
        radius: r,
        color: 'red'
      }).bindPopup(`${ev.name}<br>${ev.date} ${ev.time}`).addTo(eventsLayer);
    });
  });
