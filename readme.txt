=== Image Comparison Block ===
Contributors: binsaifullah
Tags: image compare, before after, image comparison, slider, block
Requires at least: 6.6
Tested up to: 7.1
Requires PHP: 7.4
Stable tag: 1.7.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A lightweight, accessible before/after image comparison block for the WordPress block editor.

== Description ==

**Image Comparison Block** adds an "Image Compare" block to the block editor so you can showcase before and after images with a draggable slider. It is built with native block editor components, has no third-party JavaScript dependencies, and loads its small front-end script only on pages that use the block.

[See Demos](https://demos.makegutenblock.com/image-compare-block/)

[youtube https://www.youtube.com/watch?v=OylHrkczwK4]

### Key Features

* Simple, lightweight and fast. No jQuery or external libraries.
* Built with native block editor components.
* Horizontal and vertical comparison.
* Drag, click, or swipe on touch devices to compare.
* Optional "move on hover" mode.
* Adjustable starting position.
* Optional before and after labels, always visible or shown on hover.
* Handle styles: circle, square or line, with custom color, background, size and line width.
* Label styles: position, text color, background and font size.
* Border, rounded corners, shadow and aspect ratio (crops both images evenly).
* Wide and full width alignment, and margin controls.
* Responsive images with `srcset` for images from the media library.
* Accessible: the handle is keyboard operable (arrow keys, Page Up/Down, Home/End) and announced as a slider to screen readers.
* Live, interactive preview in the editor.
* Respects the "reduce motion" accessibility setting.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/image-compare-block` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the "Plugins" screen in WordPress.
3. Open the block editor and add the "Image Compare" block from the Media category, or type `/image compare`.
4. Select a before image and an after image.

== Frequently Asked Questions ==

= Is it responsive? =

Yes. The block scales with its container and serves responsive images from the media library.

= Does it work on touch devices? =

Yes. Swipe across the image to move the slider. Vertical page scrolling still works.

= Is it accessible? =

Yes. The slider handle can be focused with the keyboard and moved with the arrow keys, Page Up/Down, Home and End. It is exposed to assistive technology as a slider with its current value.

= Will my existing blocks keep working after updating? =

Yes. Blocks created with older versions are upgraded automatically. On the front end they use the new slider straight away, and the next time you open the post in the editor they are migrated with no validation errors.

= Have you used any block builder? =

No, it is built with native block editor components only.

== Screenshots ==

1. A before and after comparison on the front end, with labels and a rounded 16:9 frame.
2. The Settings tab: choose the images and alt text, orientation, starting position and hover mode.
3. The Styles tab: aspect ratio, border, handle style and colors, and label styles.

== Changelog ==

= 1.7.0 =
* Rebuilt the block with block.json (API version 3) and @wordpress/scripts.
* New: Server-side rendering with responsive images (`srcset`/`sizes`).
* New: Lightweight slider shared by the editor and front end. Removed the bundled third-party libraries.
* New: Organized sidebar with Settings (Images, Slider, Labels) and Styles (Handle, Labels) tabs.
* New: Handle style, color, background, size and line width options.
* New: Label position, colors and font size options.
* New: Border, radius, shadow and aspect ratio support.
* New: Starting position and "show labels on hover" settings.
* New: Swap images and replace images from the block toolbar.
* New: Alt text controls for both images.
* New: Wide/full alignment and margin support.
* New: Keyboard and screen reader support for the slider handle.
* New: Interactive preview in the editor.
* Improved: Touch support that does not block page scrolling.
* Improved: The front-end script and styles only load on pages that use the block.
* Improved: All output is escaped and all strings are translatable.
* Removed: Redirect to the plugin page on activation.
* Fixed: Removed the deprecated `wp-editor` dependency.
* Fixed: Stray "undefined" CSS class in saved block markup.
* Existing blocks are migrated automatically.

= 1.0.0 =
* Initial release.

== Upgrade Notice ==

= 1.7.0 =
Major update with a rebuilt, accessible slider and new settings. Existing blocks are migrated automatically. Requires WordPress 6.6 and PHP 7.4.
