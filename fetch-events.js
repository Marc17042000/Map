
const fetch = require('node-fetch');
const fs = require('fs');

(async () => {
  const res = await fetch('https://www.zuerich.com/en/api/v2/data');
  const json = await res.json();
  const events = json.objects.filter(o => o['@type']?.includes('Event'));
  const mapped = events.map(e => ({
    name: e.name?.de || e.name?.en || 'Event',
    date: e.startDate?.slice(0, 10),
    time: e.startDate?.slice(11, 16),
    lat: e.geo?.latitude,
    lng: e.geo?.longitude,
    size: 'mittel'
  })).filter(e => e.lat && e.lng);
  fs.writeFileSync('data/events.json', JSON.stringify(mapped, null, 2));
})();
