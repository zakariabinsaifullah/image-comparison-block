(function ($) {
    $(document).on('click', '.dci-button-allow, .dci-button-skip', function () {
        $.ajax({
            url: DCI_SDK.ajax_url,
            type: 'POST',
            data: {
                action: 'dci_sdk_insights',
                button_val: this.value,
                nonce: DCI_SDK.nonce
            },
            success(response) {
                console.log(response);
                if (response.status === 'success') {
                    location.reload();
                } else {
                    alert(response.message);
                }
            }
        });
    });

    $(document).on('click', '.dci-global-notice .notice-dismiss', function () {
        $.ajax({
            url: DCI_SDK.ajax_url,
            type: 'POST',
            data: {
                action: 'dci_sdk_dismiss_notice',
                nonce: DCI_SDK.nonce
            }
        });
    });
})(jQuery);
