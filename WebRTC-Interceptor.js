// ==UserScript==
// @name         WebRTC Interceptor
// @namespace    /
// @version      1.4
// @description  Intercepts WebRTC connections to detect IP addresses and fetch ISP and City information.
// @author       t.me/butterflyclicks
// @match        https://azarlive.com/*
// @grant        none
// @license      GNU GPLv3
// ==/UserScript==

(function () {
    'use strict';

    // Create and style the container for displaying IP addresses
    const ipContainer = document.createElement('div');
    ipContainer.id = 'ip-container';
    Object.assign(ipContainer.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        width: '420px',
        maxHeight: '500px',
        overflowY: 'auto',
        backgroundColor: '#1e1e2f',
        border: '1px solid #2a2a3e',
        borderRadius: '15px',
        padding: '15px',
        zIndex: '10000',
        fontFamily: '"Roboto", sans-serif',
        fontSize: '14px',
        color: '#f0f0f0',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
        animation: 'fadeIn 0.3s ease-in-out',
    });
    ipContainer.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <h2 style="margin: 0; font-size: 18px; color: #00aaff;">WebRTC Interceptor</h2>
            <span id="scanned-ip-count" style="font-size: 14px; color: #aaa;">Scanned IPs: 0</span>
            <button id="close-ip-container" style="background: none; border: none; color: #f0f0f0; font-size: 16px; cursor: pointer;">✖</button>
        </div>
        <div id="ip-addresses"></div>
        <div style="margin-top: 15px; text-align: center;">
            <a href="https://discord.gg/4ph275Sg" target="_blank" style="display: inline-block; background-color: #7289da; color: white; padding: 10px 20px; text-decoration: none; font-weight: bold; border-radius: 8px; transition: background-color 0.3s;">Join us on Discord</a>
        </div>
    `;
    document.body.appendChild(ipContainer);

    document.getElementById('close-ip-container').addEventListener('click', () => {
        document.body.removeChild(ipContainer);
    });

    // Core logic to fetch IP addresses from RTCPeerConnection
    window.oRTCPeerConnection = window.oRTCPeerConnection || window.RTCPeerConnection;
    window.RTCPeerConnection = function (...args) {
        const pc = new window.oRTCPeerConnection(...args);

        pc.oaddIceCandidate = pc.addIceCandidate;

        pc.addIceCandidate = function (iceCandidate, ...rest) {
            const fields = iceCandidate.candidate.split(' ');

            if (fields[7] === 'srflx') {
                const ipAddress = fields[4];
                const currentTime = new Date().toLocaleTimeString();
                console.group('Detected IP Address');
                console.log('IP Address:', ipAddress);
                console.groupEnd();

                // Clear history before adding the new IP
                const ipList = document.getElementById('ip-addresses');
                ipList.innerHTML = '';  // Clear the previous IPs

                // Create IP item with "Fetching additional data" message
                const ipItem = document.createElement('div');
                Object.assign(ipItem.style, {
                    marginBottom: '10px',
                    padding: '10px',
                    backgroundColor: '#2a2a3e',
                    borderRadius: '10px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                    transition: 'transform 0.2s',
                });
                ipItem.onmouseover = () => {
                    ipItem.style.transform = 'scale(1.02)';
                };
                ipItem.onmouseout = () => {
                    ipItem.style.transform = 'scale(1)';
                };
                ipItem.innerHTML = `
                    <div><strong>Time:</strong> ${currentTime}</div>
                    <div><strong>IP Address:</strong> ${ipAddress}</div>
                    <div><strong>ISP:</strong> Fetching additional data...</div>
                    <div><strong>City:</strong> Fetching additional data...</div>
                    <button style="margin-top: 8px; padding: 8px 12px; background-color: #4caf50; color: white; border: none; border-radius: 6px; cursor: pointer;">Copy</button>
                `;
                ipList.appendChild(ipItem);

                // Update IP count
                const ipCountElement = document.getElementById('scanned-ip-count');
                const currentCount = parseInt(ipCountElement.textContent.replace('Scanned IPs: ', ''));
                ipCountElement.textContent = `Scanned IPs: ${currentCount + 1}`;

                // Fetch additional data (ISP and city info) using ipapi
                fetch(`https://ipapi.co/${ipAddress}/json/`)
                    .then(response => response.json())
                    .then(data => {
                        const ispInfo = data.org || 'Unknown ISP';
                        const cityInfo = data.city || 'Unknown City';

                        // Update the IP item with fetched data
                        const ispElement = ipItem.querySelector('div:nth-child(3)');
                        const cityElement = ipItem.querySelector('div:nth-child(4)');
                        
                        // Ensure correct data is displayed after fetch
                        ispElement.textContent = `ISP: ${ispInfo}`;
                        cityElement.textContent = `City: ${cityInfo}`;
                    })
                    .catch(error => {
                        console.error('Error fetching ISP and city information:', error);
                        // Handle error (if any)
                        const ispElement = ipItem.querySelector('div:nth-child(3)');
                        const cityElement = ipItem.querySelector('div:nth-child(4)');
                        
                        ispElement.textContent = `ISP: Error fetching data`;
                        cityElement.textContent = `City: Error fetching data`;
                    });

                // Add copy functionality
                const copyButton = ipItem.querySelector('button');
                copyButton.addEventListener('click', () => {
                    navigator.clipboard.writeText(ipAddress).then(() => {
                        copyButton.textContent = 'Copied!';
                        setTimeout(() => {
                            copyButton.textContent = 'Copy';
                        }, 2000);
                    });
                });
            }

            return pc.oaddIceCandidate(iceCandidate, ...rest);
        };

        return pc;
    };

    console.log('WebRTC Interceptor initialized. Intercepting WebRTC connections.');
})();
