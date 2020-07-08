const { resolve } = require('path');
const fs = require('fs');
const superagent = require('superagent');
const iconJson = require('./iconfont.json');

const svgsMap = { name: 'hello' };
if (iconJson) {
  const items = iconJson.glyphs;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    superagent.get('https://www.iconfont.cn/api/icon/iconInfo.json?id=' + item.icon_id).end((error, res) => {
      if (error) {
        return;
      }

      if (res.body) {
        if (res.body.code == 200) {
          const data = res.body.data;
          svgsMap[data.name] = data.show_svg;
          // fs.writeFileSync(resolve(__dirname, '../svgs/ol-icon-' +  data.name + '.svg'), res.body.data.show_svg);
          if (i >= (items.length - 1)) {
            const content = `export default ${JSON.stringify(svgsMap)}`;
            fs.writeFileSync(resolve(__dirname, "../svg.js"), content);
          }
        }
      }

    });

  }

}



