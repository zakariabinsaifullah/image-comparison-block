/**
 * Render the WordPress.org banner and icon into .wordpress-org/.
 *
 * Usage: npm run brand
 * Requires Google Chrome (uses Playwright's "chrome" channel).
 */
const fs = require( 'fs' );
const path = require( 'path' );
const { chromium } = require( 'playwright' );
const { banner, icon } = require( './scene' );

const OUT = path.resolve( __dirname, '../../.wordpress-org' );

const targets = [
	{ file: 'banner-1544x500.png', svg: banner, width: 1544, height: 500 },
	{ file: 'banner-772x250.png', svg: banner, width: 772, height: 250 },
	{ file: 'icon-256x256.png', svg: icon, width: 256, height: 256 },
	{ file: 'icon-128x128.png', svg: icon, width: 128, height: 128 },
];

( async () => {
	fs.mkdirSync( OUT, { recursive: true } );
	fs.writeFileSync( path.join( OUT, 'icon.svg' ), icon() );

	const browser = await chromium.launch( { channel: 'chrome' } );
	for ( const t of targets ) {
		const page = await browser.newPage( {
			viewport: { width: t.width, height: t.height },
		} );
		const markup = t
			.svg()
			.replace( / width="\d+" height="\d+"/, ' width="100%" height="100%"' );
		await page.setContent(
			`<html><body style="margin:0;overflow:hidden">${ markup }</body></html>`
		);
		await page.screenshot( {
			path: path.join( OUT, t.file ),
			omitBackground: false,
		} );
		await page.close();
		process.stdout.write( `✓ ${ t.file }\n` );
	}
	await browser.close();
} )();
