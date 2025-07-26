// public/app.js
/* global L */

const map = L.map('map').setView([20, 0], 2);

// OpenStreetMap tile layer (demo usage)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
}).addTo(map);

map.on('click', async (e) => {
  const { lat, lng } = e.latlng;

  // Show a "working" popup immediately at the click point
  const popup = L.popup({ maxWidth: 360 })
    .setLatLng([lat, lng])
    .setContent(`<div><b>Analyzing climate risks…</b><br>${lat.toFixed(4)}, ${lng.toFixed(4)}</div>`)
    .openOn(map);

  try {
    // (Optional) Reverse geocode for a friendlier name (best-effort)
    const locationName = await reverseGeocode(lat, lng).catch(() => null);

    // Call your backend proxy — never call OpenAI directly from the browser.
    const res = await fetch('/api/climate-risk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lng, locationName })
    });

    if (!res.ok) throw new Error('Server error');

    const data = await res.json();
    if (!data.ok) throw new Error(data.error || 'Unknown error');

    // Basic sanitization: block scripts if any slipped in (defense-in-depth)
    const safeHtml = (data.html || '')
      .replace(/<script/gi, '&lt;script')
      .replace(/<\/script>/gi, '&lt;/script&gt;');

    popup.setContent(safeHtml);
  } catch (err) {
    console.error(err);
    popup.setContent(
      `<div><b>Sorry, the risk scan failed.</b><br>Try again in a moment.</div>`
    );
  }
});

/**
 * Reverse geocode using Nominatim (OSM) to get a display name.
 * This is optional and best-effort; for production, consider your own geocoder and usage policy.
 */
async function reverseGeocode(lat, lng) {
  const url = new URL('https://nominatim.openstreetmap.org/reverse');
  url.search = new URLSearchParams({
    format: 'jsonv2',
    lat: String(lat),
    lon: String(lng),
    zoom: '10',
    addressdetails: '0'
  }).toString();

  const res = await fetch(url.toString(), {
    headers: { 'Accept': 'application/json' }
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.display_name || null;
}
