/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal Components
 */
import Video from './welcome-parts/video';
import Card from './welcome-parts/card';

const WelcomeTab = () => {
    return (
        <div className="welcome-tab-elements">
            <div className="tab-container flex">
                <div className="flex-2">
                    <Video
                        title={__('Welcome to Beaf Slider Lite', 'image-comparision-block')}
                        description={__(
                            'Beaf Slider is a Gutenberg based block plugin that allows you to showcase Before After Comparison in the Gutenberg editor. Watch this video to get started.',
                            'image-comparision-block'
                        )}
                        videoId="OylHrkczwK4"
                        actions={[
                            {
                                label: __('View Demos', 'image-comparision-block'),
                                link: 'https://beaf.gutenbergkits.com/demos',
                                btnType: 'primary'
                            },
                            {
                                label: __('Related Videos', 'image-comparision-block'),
                                link: 'https://www.youtube.com/playlist?list=PLPpb8_vlwMIYTSagQKF159CABHYEn-7Lo',
                                btnType: 'secondary'
                            },
                            {
                                label: __('Visit Our Website', 'image-comparision-block'),
                                link: 'https://gutenbergkits.com',
                                btnType: 'secondary'
                            }
                        ]}
                    />
                </div>
                <div className="flex-1">
                    <Card
                        title={__('Report Bugs', 'image-comparision-block')}
                        description={__(
                            'If you find any bugs, please let us know. We will fix it as soon as possible.',
                            'image-comparision-block'
                        )}
                        action={{
                            label: __('Report Now', 'image-comparision-block'),
                            link: 'https://support.gutenbergkits.com'
                        }}
                    />
                    <Card
                        title={__('Contact Us', 'image-comparision-block')}
                        description={__(
                            'If you have any questions or need help, please contact us. We are happy to help you!',
                            'image-comparision-block'
                        )}
                        action={{
                            label: __('Contact Us', 'image-comparision-block'),
                            link: 'https://gutenbergkits.com/contact'
                        }}
                    />
                    <Card
                        title={__('Get More Block Plugins', 'image-comparision-block')}
                        description={__(
                            'If you love this block plugin, please visit our website to get more block plugins for Gutenberg editor.',
                            'image-comparision-block'
                        )}
                        action={{
                            label: __('Find More', 'image-comparision-block'),
                            link: 'https://gutenbergkits.com'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default WelcomeTab;
