// ==UserScript==
// @name         Facepunch Twitch Drops
// @namespace    http://tampermonkey.net/
// @version      0.2.1
// @author       Horodep
// @namespace    https://github.com/Horodep/Custom-UserScripts/
// @updateURL    https://raw.githubusercontent.com/Horodep/Custom-UserScripts/main/facepunch-twitch-drops.user.js
// @supportURL   https://github.com/Horodep/Custom-UserScripts/
// @match        https://twitch.facepunch.com/
// @icon         https://twitch.facepunch.com/favicon.png
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    var drops = $('.drops-container > .drop-box');

    Array.from(drops).forEach(function callback(val) {
        try{
            var video = $(val).find('.drop-box-body > video > source');
            if ($(video).length == 0) return;
            var uri = $(video)[0].src;
            var id = uri.replace("https://files.facepunch.com/", '').replace(".mp4", '');
            console.log(id);

            var value = GM_getValue(id) ?? false;

            if (value) $(val).css ( { opacity: "0.1" } );

            var wrapper = $('<div>', { class: "customcheck" });
            $(val).append(wrapper);
            var round = $('<div>', { class: "round" });
            $(wrapper).append(round);
            $(round).append($('<input>', { type: "checkbox", id: id, checked: value, click: onClick }));
            $(round).append($('<label>', { for: id }));
        }catch(e){
            console.log(e);
            console.log($(val));
        }
    });

    function onClick(event) {
        var target = event.target;
        GM_setValue(target.id, target.checked);
        var box = $(target)[0].parentElement.parentElement.parentElement;
        $(box).css ( { opacity: target.checked ? "0.1" : "1" } );
    }

    GM_addStyle ( `
    @media screen and (min-width: 1204px) {
        .container {
            max-width: 100%;
        }
    }
    
    @media screen and (min-width: 1024px) {
        .container {
            max-width: 100%;
        }
    }
    
    .container {
        max-width: 100%;
    }
    
    .section.drops .drops-container.is-row-3 .drop-box {
        flex: 0 0 calc(20% - 50px);
    }

    .drop-box-body{
        aspect-ratio : 1 / 1;
        min-height: 260px !important;
    }

    .customcheck .round {
        position: absolute;
        right: 10px;
        bottom: 10px;
    }

    .customcheck .round label {
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 50%;
        cursor: pointer;
        height: 56px;
        width: 56px;
        display: block;
    }

    .customcheck .round label:after {
        border: 4px solid #fff;
        border-top: none;
        border-right: none;
        content: "";
        height: 12px;
        left: 16px;
        opacity: 0;
        position: absolute;
        top: 19px;
        transform: rotate(-45deg);
        width: 24px;
    }

    .customcheck .round input[type="checkbox"] {
        visibility: hidden;
        display: none;
        opacity: 0;
    }

    .customcheck .round input[type="checkbox"]:checked + label {
        background-color: #66bb6a;
        border-color: #66bb6a;
    }

    .customcheck .round input[type="checkbox"]:checked + label:after {
        opacity: 1;
    }
    ` );
})();
