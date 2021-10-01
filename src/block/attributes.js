const attributes= {
    beforeImageUrl: {
        type: 'string'
    },
    beforeImageAlt: {
        type: 'string'
    },
    beforeImageId: {
        type: 'number'
    },
    afterImageUrl: {
        type: 'string'
    },
    afterImageAlt: {
        type: 'string'
    },
    afterImageId: {
        type: 'number'
    },
    verticalMode: {
        type: 'boolean',
        default: false
    },
    hover: {
        type: 'boolean',
        default: false
    },
    showLabel: {
        type: 'boolean',
        default: false,
    },
    leftImageLabel: {
        type: 'string',
        default: 'Before'
    },
    rightImageLabel: {
        type: 'string',
        default: 'After'
    },
};

export default attributes; 
