// ==UserScript==
// @name         NoReboot-AMI
// @namespace    https://console.aws.amazon.com/
// @version      0.1
// @description  Stop you from restarting machines by mistake.
// @author       Guilherme Caulada
// @match        https://console.aws.amazon.com/ec2/home?*
// @match        https://console.aws.amazon.com/ec2/*/home?*
// @grant        none
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

(function() {
    'use strict';
    const checkbox = "input[type=checkbox][id*=NoReboot]:visible"

    function waitForElement(selector, callback, present = true, maxtries = false, interval = 100) {
        const poller = setInterval(() => {
            const el = jQuery(selector)
            const retry = maxtries === false || maxtries-- > 0
            if (present && retry && el.length < 1) return
            if (!present && retry && el.length >= 1) return
            clearInterval(poller)
            callback(el || null)
        }, interval)
    }

    function noReboot() {
        waitForElement(checkbox, (el) => {
            el[0].click();
            waitForElement(checkbox, noReboot, false)
        });
    }
    noReboot()
})();
