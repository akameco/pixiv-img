import test from 'ava';
import path from 'path';
import del from 'del';
import pathExists from 'path-exists';
import fn from './';
const imgUrl = 'http://i3.pixiv.net/img-original/img/2016/03/31/00/31/46/56100246_p0.jpg';

test.after('cleanup', async t => {
	await del(['*.jpg', 'fixtures/*.jpg']);
	t.pass();
});

test('download image', async t => {
	t.is(await fn(imgUrl), path.basename(imgUrl));
});

test('download image', async t => {
	await fn(imgUrl, 'fixtures/output.jpg');
	t.true(await pathExists('fixtures/output.jpg'));
});
