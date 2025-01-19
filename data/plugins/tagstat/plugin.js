'use strict';

const {
  freq,
} = require('./resources');

/** @param {FsPlugin} plugin */
const Init = plugin => {
  plugin.resources
    .Group('tagstat')
    .Add(freq);
}
