const capitaliseFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const formatHyphen = (region) =>
  `${capitaliseFirstLetter(region).slice(0, region.search('-'))} ${
    region.charAt(region.search('-') + 1).toUpperCase() +
    region.slice(region.search('-') + 2, region.length)
  }`;

const formatRegion = (region) =>
  region.includes('-') ? formatHyphen(region) : capitaliseFirstLetter(region);

export default formatRegion;
