
import svgs from './svg.js';
import base64 from './base64';



function encodeSvg(data, quotes) {
  if (quotes === 'double') {
    data = data.replace(/"/g, '\'');
  }
  else {
    data = data.replace(/'/g, '"');
  }
  data = data.replace('<svg', (~data.indexOf('xmlns') ? '<svg' : '<svg xmlns="http://www.w3.org/2000/svg"'));
  data = data.replace(/"/g, '\'')
    .replace(/%/g, '%25')
    .replace(/#/g, '%23')
    .replace(/{/g, '%7B')
    .replace(/}/g, '%7D')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')
    .replace(/\s+/g, ' ')
  return data;
}

function resolveSvg(name, size, color) {

  let svgBody = svgs[name];
  svgBody = svgBody.replace(/class="\w+\b"/ig, 'class="ol-icon"');
  if (size) {
    svgBody = svgBody.replace(/style="([^\"]+)"/ig, 'style="$1font-size:' + size + 'px;"');
  }
  if (color) {
    svgBody = svgBody.replace(/style="([^\"]+)"/ig, 'style="$1color:' + color + '"');
  }
  return svgBody;
}

// const result = olSvgIcon('back', 16, "green", "base64")
// console.log(result)
function olSvgIcon(name, size, color, type = '') {
  const prefix = 'data:image/svg+xml';
  let result = resolveSvg(name, size, color);
  if (type === 'origin') {
    return result;
  } else if (type === 'base64') {
    result = prefix + ";base64," + base64.encode(result);
  } else {
    result = prefix + "," + encodeSvg(result);
  }
  return result;
}


export default { olSvgIcon }

// console.log(olSvgIcon('check', 16, 'green', "base64"));



