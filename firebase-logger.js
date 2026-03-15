import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, set, serverTimestamp }
    from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCFr3NSVwQnlJTYjglYQ0Jgn0PlouwssGI",
    authDomain: "atlansa-f5847.firebaseapp.com",
    databaseURL: "https://atlansa-f5847-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "atlansa-f5847",
    storageBucket: "atlansa-f5847.firebasestorage.app",
    messagingSenderId: "356429773942",
    appId: "1:356429773942:web:fd3138be6fb7b9f3fa3357"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function logVisitor() {
    try {
        // Fetch public IP via ipify
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();

        const visitorData = {
            ip: data.ip,
            userAgent: navigator.userAgent,
            language: navigator.language,
            referrer: document.referrer || "direct",
            page: window.location.href,
            timestamp: serverTimestamp()   // server-side UTC time
        };

        // Build a readable timestamp key: "2026-03-16_01-53-42"
        const now = new Date();
        const pad = n => String(n).padStart(2, "0");
        const key = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
            + `_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;

        await set(ref(db, `visitors/${key}`), visitorData);
    } catch (err) {
        console.warn("[logger] could not log visitor:", err.message);
    }
}

logVisitor();
