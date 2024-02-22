export const getClientGeolocation = () => {
  const opt = {
    enableHighAccuracy: true,
    timeout: 3000,
    maximumAge: 0,
  };

  navigator.geolocation.getCurrentPosition(geoSucceed, () => {}, opt);
};

const geoSucceed: PositionCallback = (geo) => {
  if (geo) {
    const { latitude, longitude, accuracy } = geo.coords;
    localStorage.setItem(
      'geolocation',
      JSON.stringify({ latitude, longitude, accuracy })
    );
  }
};
