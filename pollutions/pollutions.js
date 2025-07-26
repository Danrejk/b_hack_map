async function fetchPoint(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&hourly=temperature_2m,pressure_msl,winddirection_10m,windspeed_10m&forecast_days=1&timezone=UTC`;

  const resp = await fetch(url);
  if (!resp.ok) throw new Error("API error");

  const json = await resp.json();
  const times = json.hourly.time;

  const now = new Date();
  const currentHour = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours()
  ));
  const isoHour = currentHour.toISOString().slice(0, 13) + ":00";

  let idx = times.indexOf(isoHour);
  if (idx === -1) idx = 0;

  return [lat, lon, json.hourly.temperature_2m[idx]];
}

async function loadHeatPoints() {
  const lats = [];
  for (let lat = 47.5; lat <= 54.5; lat += 1) lats.push(lat);
  const lons = [];
  for (let lon = 6.0; lon <= 14.5; lon += 1) lons.push(lon);

  const promises = [];
  for (const lat of lats) {
    for (const lon of lons) {
      promises.push(fetchPoint(lat, lon).catch(() => null));
    }
  }

  const heatPoints = (await Promise.all(promises)).filter(p => p);

  // Normalize temperatures to 0..1
  const temps = heatPoints.map(p => p[2]);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const norm = heatPoints.map(([lat, lon, t]) => [lat, lon, (t - minTemp) / (maxTemp - minTemp || 1)]);

  return norm;
}

loadHeatPoints().then(points => {
  window.heatPoints = points;        // make available to non‑module script
  window.dispatchEvent(new Event("heatDataReady"));
  console.log(points)
}).catch(err => console.error(err));