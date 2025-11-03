// fuck u lunar scammers

import fetch from "node-fetch"; 

async function checkLocalLauncherStatus() {
    try {
        const baseURL = "http://127.0.0.1:3000"; 
        const statusResponse = await fetch(`${baseURL}/launcher/status`);
        const statusData = await statusResponse.json();
        console.log("Status from local server:", statusData);
        console.log("Client version:", "1.2");

        if (statusData.version !== "1.2") {
            console.warn("Launcher version mismatch! Please update.");
        }

        const http = await import('http');
        http.get(`${baseURL}/api/launcher/poll-auth`, (res) => {
            // poll auth :3
            let data = "";
            res.on("data", chunk => data += chunk);
            res.on("end", () => {
                try {
                    const authData = JSON.parse(data);
                    console.log("Local auth poll data:", authData);
                } catch (err) {
                    console.error("Error parsing auth poll response:", err);
                }
            });
        }).on("error", err => {
            console.error("HTTP GET error:", err);
        });

     const username = "LUNA";
        const emailResponse = await fetch(`${baseURL}/account/api/get-email?username=${encodeURIComponent(username)}`);
        const emailData = await emailResponse.json();
        console.log("Local email data for user:", emailData);

    } catch (err) {
        console.error("Error in local launcher API workflow:", err);
    }
}

checkLocalLauncherStatus();
