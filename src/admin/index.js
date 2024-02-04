// import styles
import './style.scss';

/**
 * WordPress dependencies
 */

import { render } from '@wordpress/element';

import App from './components/app';
const PhotoComparisonAdmin = () => {
    return <App />;
};

/**
 * Render the block editor.
 */

window.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('photo-comparison-admin');
    if (el) {
        render(<PhotoComparisonAdmin />, el);
    }
});
