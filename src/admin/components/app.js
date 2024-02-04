/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';

/**
 * Components
 */
import WelcomeTab from './welcome';

const App = () => {
    return (
        <Fragment>
            <div className="container">
                <div className="header">
                    <div className="header-content flex">
                        <div className="brand-area flex">
                            <div className="brand-logo">
                                <svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width={30} height={30} rx={2} fill="#7456F2" />
                                    <circle cx={15} cy={15} r="7.5" stroke="white" strokeWidth={5} />
                                    <path d="M5 4C5 2.89543 5.89543 2 7 2H8C9.10457 2 10 2.89543 10 4V15H5V4Z" fill="white" />
                                    <path
                                        d="M25 26C25 27.1046 24.1046 28 23 28L22 28C20.8954 28 20 27.1046 20 26L20 15L25 15L25 26Z"
                                        fill="white"
                                    />
                                    <line x1="15.1" y1={10} x2="15.1" y2={20} stroke="white" strokeWidth="0.2" />
                                    <circle cx={15} cy={15} r="1.9" fill="#7456F2" stroke="white" strokeWidth="0.2" />
                                </svg>

                                <h3 className="brand-title">{__('Beaf - Before After Comparison Slider', 'image-comparision-block')}</h3>
                            </div>
                        </div>
                        <div className="changes-log flex">
                            <a href="https://beaf.gutenbergkits.com" target="_blank" rel="nofollow noreferrer" className="gutslider-prop">
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path
                                        fillRule="evenodd"
                                        d="M11.5 1.246c.832-.855 2.913.642 0 2.566-2.913-1.924-.832-3.421 0-2.566M9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4m13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276ZM15 2.165c.555-.57 1.942.428 0 1.711-1.942-1.283-.555-2.281 0-1.71Z"
                                    />
                                </svg>
                                {__(' Get Beaf Pro', 'image-comparision-block')}
                            </a>
                        </div>
                    </div>
                </div>
                <div className="tabs-body">
                    <WelcomeTab />
                </div>
            </div>
        </Fragment>
    );
};

export default App;
