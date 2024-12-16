# WebRTC Interceptor

[![License: GPLv3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

WebRTC Interceptor is a powerful userscript designed to intercept WebRTC connections, extract IP addresses, and fetch detailed information such as **ISP** and **City**. This tool provides a sleek graphical user interface (GUI) for displaying the detected IPs in real-time and offers additional features for enhanced usability.

## Features

- **Intercept WebRTC Connections**  
  Detects IP addresses from WebRTC candidates using `RTCPeerConnection`.

- **Real-time IP Address Logging**  
  Automatically logs the detected public IP address in a modern, interactive GUI.

- **ISP and City Information**  
  Fetches detailed information, including ISP and City, for each detected IP using `ipapi.co`.

- **Copy Functionality**  
  Easily copy detected IP addresses to the clipboard with a single click.

- **Modern, Responsive GUI**  
  Features a sleek, dark-themed GUI that dynamically updates as new IPs are detected.

- **Clear History Automatically**  
  Automatically clears the previous history when a new IP is detected to avoid clutter.

## How It Works

WebRTC Interceptor overrides the `RTCPeerConnection` API to intercept WebRTC traffic. When an IP candidate is detected, the script parses the candidate to extract the public IP address. The IP is then passed to `ipapi.co` for additional details such as ISP and City. The results are displayed in a responsive GUI.

### Core Workflow

1. **Intercept WebRTC Traffic:**  
   Override the `addIceCandidate` method to listen for WebRTC candidates.
   
2. **Extract IP Address:**  
   Parse the `srflx` (Server Reflexive) candidate to extract the public IP.

3. **Fetch Additional Details:**  
   Use the `ipapi.co` API to fetch ISP and City information.

4. **Update GUI:**  
   Dynamically update the GUI with the detected IP address and related details.

## Installation

### Prerequisites

- A userscript manager such as:
  - [Tampermonkey](https://www.tampermonkey.net/) (recommended)
  - [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)
  - [Violentmonkey](https://violentmonkey.github.io/)

### Steps

1. Install a userscript manager.
2. Create a new userscript in your manager.
3. Copy the script code into the editor and save it.
4. Open [azarlive.com](https://azarlive.com) or any supported WebRTC-enabled site to start intercepting IPs.

## Usage

1. **Open a Supported WebRTC Site:**  
   Navigate to a website that uses WebRTC, such as a video conferencing or live-streaming platform.

2. **View Detected IPs:**  
   Once a WebRTC connection is established, the GUI will display the detected IP address along with its ISP and City information.

3. **Copy IPs to Clipboard:**  
   Use the "Copy" button next to an IP address to copy it directly to the clipboard.

4. **Close the GUI:**  
   Click the **✖** button in the top-right corner of the GUI to close the interface.

## GUI Overview

- **Header**:  
  Displays the script title (`WebRTC Interceptor`) and a live count of detected IPs.
  
- **IP List**:  
  Dynamically updated list showing the detected IP, ISP, and City information.

- **Copy Button**:  
  Each entry includes a button to copy the IP address to the clipboard.

- **Discord Link**:  
  A direct link to the project's Discord community.

## Configuration

No additional configuration is needed. The script is ready to use out of the box.

## API Integration

This script uses the following APIs:

1. **[ipapi.co](https://ipapi.co/):**  
   - Endpoint: `https://ipapi.co/{ip}/json/`  
   - Provides ISP, City, and other geographical details for the detected IP.


