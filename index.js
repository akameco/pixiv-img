'use strict';
const got = require('got');
const path = require('path');
const fs = require('fs');

module.exports = function (imgUrl, output) {
	return new Promise((resolve, reject) => {
		if (typeof imgUrl !== 'string') {
			reject(new TypeError('Expected a string'));
		}

		output = output || path.basename(imgUrl);

		const options = {
			encoding: null,
			headers: {
				Referer: 'http://www.pixiv.net/'
			}
		};

		got.stream(imgUrl, options).pipe(fs.createWriteStream(output)).on('close', () => {
			resolve(output);
		});
	});
};
