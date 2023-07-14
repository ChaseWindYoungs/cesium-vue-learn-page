<template>
  <div id="mainMap"></div>
</template>
<script setup>
import { onMounted } from 'vue';
import * as Cesium from 'cesium';
import  { mockData } from './mockData.ts';
import  { defaultAccessToken } from './mockData.ts';


onMounted(async () => {
  Cesium.Ion.defaultAccessToken = defaultAccessToken;
  const viewer = new Cesium.Viewer('mainMap', {
    terrain: Cesium.Terrain.fromWorldTerrain()
  });
  const osmBuildings = await Cesium.createOsmBuildingsAsync();
  viewer.scene.primitives.add(osmBuildings);

  const dataPoint = {
    longitude: -122.38985,
    latitude: 37.61864,
    height: -27.32
  };
  const pointEntity = viewer.entities.add({
    description: `First data point at (${dataPoint.longitude}, ${dataPoint.latitude})`,
    position: Cesium.Cartesian3.fromDegrees(
      dataPoint.longitude,
      dataPoint.latitude,
      dataPoint.height
    ),
    point: { pixelSize: 10, color: Cesium.Color.RED }
  });
  viewer.flyTo(pointEntity);

  const flightData = JSON.parse(mockData);
  const timeStepInSeconds = 30;
  const totalSeconds = timeStepInSeconds * (flightData.length - 1);
  const start = Cesium.JulianDate.fromIso8601('2020-03-09T23:10:00Z');
  const stop = Cesium.JulianDate.addSeconds(
    start,
    totalSeconds,
    new Cesium.JulianDate()
  );
  viewer.clock.startTime = start.clone();
  viewer.clock.stopTime = stop.clone();
  viewer.clock.currentTime = start.clone();
  viewer.timeline.zoomTo(start, stop);

  viewer.clock.multiplier = 50;

  viewer.clock.shouldAnimate = true;

  const positionProperty = new Cesium.SampledPositionProperty();

  for (let i = 0; i < flightData.length; i++) {
    const dataPoint = flightData[i];

    const time = Cesium.JulianDate.addSeconds(
      start,
      i * timeStepInSeconds,
      new Cesium.JulianDate()
    );
    const position = Cesium.Cartesian3.fromDegrees(
      dataPoint.longitude,
      dataPoint.latitude,
      dataPoint.height
    );
    positionProperty.addSample(time, position);

    viewer.entities.add({
      description: `Location: (${dataPoint.longitude}, ${dataPoint.latitude}, ${dataPoint.height})`,
      position: position,
      point: { pixelSize: 10, color: Cesium.Color.RED }
    });
  }

  async function loadModel() {
    const airplaneUri = await Cesium.IonResource.fromAssetId(1969305);
    const airplaneEntity = viewer.entities.add({
      availability: new Cesium.TimeIntervalCollection([
        new Cesium.TimeInterval({ start: start, stop: stop })
      ]),
      position: positionProperty,
      model: { uri: airplaneUri },
      orientation: new Cesium.VelocityOrientationProperty(positionProperty),
      path: new Cesium.PathGraphics({ width: 3 })
    });
    viewer.trackedEntity = airplaneEntity;
  }

  loadModel();
  const airplaneEntity = viewer.entities.add({
    availability: new Cesium.TimeIntervalCollection([
      new Cesium.TimeInterval({ start: start, stop: stop })
    ]),
    position: positionProperty,
    point: { pixelSize: 30, color: Cesium.Color.GREEN },
    path: new Cesium.PathGraphics({ width: 3 })
  });
  viewer.trackedEntity = airplaneEntity;
});
</script>
<style scoped>
#mainMap {
  width: 100%;
  height: 100vh;
  background: #aabbcc;
}
</style>
