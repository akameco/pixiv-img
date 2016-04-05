import test from 'ava';
import path from 'path';
import del from 'del';
import pathExists from 'path-exists';
import fn from './';
const imgUrl = 'http://i3.pixiv.net/img-original/img/2016/03/31/00/31/46/56100246_p0.jpg';
const fakeUrl = 'http://i3.pixiv.net/img-original/img/2016/03/31/00/31/46/fake.jpg';

test.after('cleanup', async t => {
	await del(['*.jpg', 'fixtures/*.jpg']);
	t.pass();
});

test('download image', async t => {
	t.is(await fn(imgUrl), path.basename(imgUrl));
});

test('output path', async t => {
	await fn(imgUrl, 'fixtures/output.jpg');
	t.true(await pathExists('fixtures/output.jpg'));
});

test('throw type error', async t => {
	try {
		await fn(null);
		t.fail('Exception was not thrown');
	} catch (e) {
		t.regex(e.message, /string/);
	}
});

test('throw http error', async t => {
	try {
		await fn(fakeUrl);
		t.fail('Exception was not thrown');
	} catch (err) {
		t.ok(err);
		t.is(err.message, 'Response code 404 (Not Found)');
	}
});
