// ============================================================
// CyberCore Solutions - Shared Security Event System
// Cross-tab communication via BroadcastChannel + localStorage
// ============================================================

// ── EmailJS Configuration (Action Required) ────────────────
const EMAIL_JS_SERVICE_ID = 'service_zwg0c7c';
const EMAIL_JS_TEMPLATE_ID = 'template_rkvml1m';
const EMAIL_JS_PUBLIC_KEY = 'Ryg2q-J9sCpKNxid_';

// Dynamically load the EmailJS SDK
(function() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.onload = () => {
        emailjs.init(EMAIL_JS_PUBLIC_KEY);
        console.log("✅ EmailJS Initialized");
    };
    document.head.appendChild(script);
})();

// ── Employee Database ──────────────────────────────────────
const EMPLOYEES = [
    {
        id: 'EMP001',
        name: 'Prathik Gowda',
        email: 'prathikgowda5463@gmail.com',
        password: 'AdminSecure!99',
        role: 'Admin',
        department: 'Executive',
        accessLevel: 5,
        location: 'New York, USA',
        avatar: 'PG'
    },
    {
        id: 'EMP002',
        name: 'Anirudh',
        email: 'jpanirudh612@gmail.com',
        password: 'DevOpsUser$24',
        role: 'Developer',
        department: 'Technology',
        accessLevel: 3,
        location: 'London, UK',
        avatar: 'AN'
    },
    {
        id: 'EMP003',
        name: 'Ananya',
        email: 'ananyakv111@gmail.com',
        password: 'DataAnalyst#77',
        role: 'Analyst',
        department: 'Analytics',
        accessLevel: 2,
        location: 'Tokyo, Japan',
        avatar: 'AK'
    },
    {
        id: 'EMP004',
        name: 'Poornima',
        email: 'poornimapraven@gmail.com',
        password: 'HrManager@2026',
        role: 'HR Manager',
        department: 'Human Resources',
        accessLevel: 2,
        location: 'Sydney, Australia',
        avatar: 'PR'
    },
    {
        id: 'EMP005',
        name: 'Apurva',
        email: 'apurvaappu573@gmail.com',
        password: 'QA_Tester%55',
        role: 'Tester',
        department: 'Technology',
        accessLevel: 2,
        location: 'Mumbai, India',
        avatar: 'AP'
    }
];

// ── Threat Type Definitions ────────────────────────────────
const THREAT_TYPES = {
    BRUTE_FORCE: {
        id: 'BRUTE_FORCE',
        name: 'Brute Force Attack',
        severity: 'CRITICAL',
        icon: '🔓',
        color: '#ff1744',
        description: 'Multiple failed login attempts detected'
    },
    DATA_EXFILTRATION: {
        id: 'DATA_EXFILTRATION',
        name: 'Data Exfiltration',
        severity: 'HIGH',
        icon: '📤',
        color: '#ff9100',
        description: 'Unusual data download pattern detected'
    },
    INSIDER_THREAT: {
        id: 'INSIDER_THREAT',
        name: 'Insider Threat',
        severity: 'HIGH',
        icon: '🕵️',
        color: '#ff6d00',
        description: 'Unauthorized access to restricted resources'
    },
    IMPOSSIBLE_TRAVEL: {
        id: 'IMPOSSIBLE_TRAVEL',
        name: 'Impossible Travel',
        severity: 'MEDIUM',
        icon: '✈️',
        color: '#ffd600',
        description: 'Login from geographically impossible locations'
    },
    PRIVILEGE_ESCALATION: {
        id: 'PRIVILEGE_ESCALATION',
        name: 'Privilege Escalation',
        severity: 'CRITICAL',
        icon: '⚡',
        color: '#d500f9',
        description: 'Unauthorized attempt to elevate system privileges'
    }
};

// ── Severity Levels ────────────────────────────────────────
const SEVERITY = {
    CRITICAL: { level: 4, color: '#ff1744', bg: 'rgba(255,23,68,0.15)', label: 'CRITICAL' },
    HIGH: { level: 3, color: '#ff9100', bg: 'rgba(255,145,0,0.15)', label: 'HIGH' },
    MEDIUM: { level: 2, color: '#ffd600', bg: 'rgba(255,214,0,0.15)', label: 'MEDIUM' },
    LOW: { level: 1, color: '#00e676', bg: 'rgba(0,230,118,0.15)', label: 'LOW' }
};

// ── Locations for Impossible Travel ────────────────────────
const LOCATIONS = [
    { city: 'New York', country: 'USA', coords: '40.7128° N, 74.0060° W' },
    { city: 'London', country: 'UK', coords: '51.5074° N, 0.1278° W' },
    { city: 'Tokyo', country: 'Japan', coords: '35.6762° N, 139.6503° E' },
    { city: 'Sydney', country: 'Australia', coords: '33.8688° S, 151.2093° E' },
    { city: 'Moscow', country: 'Russia', coords: '55.7558° N, 37.6173° E' },
    { city: 'Dubai', country: 'UAE', coords: '25.2048° N, 55.2708° E' },
    { city: 'São Paulo', country: 'Brazil', coords: '23.5505° S, 46.6333° W' },
    { city: 'Mumbai', country: 'India', coords: '19.0760° N, 72.8777° E' }
];

// ── Company Files (for data exfiltration & insider threat) ─
const COMPANY_FILES = {
    'Executive': [
        { name: 'Q4_Financial_Report.pdf', size: '4.2 MB', classified: true },
        { name: 'Board_Meeting_Minutes.docx', size: '1.1 MB', classified: true },
        { name: 'Strategic_Plan_2025.pptx', size: '8.5 MB', classified: true },
        { name: 'Company_Valuation.xlsx', size: '2.3 MB', classified: true }
    ],
    'Technology': [
        { name: 'System_Architecture.pdf', size: '3.7 MB', classified: false },
        { name: 'API_Keys_Production.env', size: '0.5 MB', classified: true },
        { name: 'Server_Credentials.txt', size: '0.2 MB', classified: true },
        { name: 'Cloud_Infrastructure.docx', size: '2.1 MB', classified: false }
    ],
    'Engineering': [
        { name: 'Source_Code_Main.zip', size: '45.2 MB', classified: false },
        { name: 'Database_Schema.sql', size: '1.8 MB', classified: false },
        { name: 'Deployment_Scripts.sh', size: '0.3 MB', classified: false },
        { name: 'Test_Results_Q4.pdf', size: '5.1 MB', classified: false }
    ],
    'Human Resources': [
        { name: 'Employee_Salaries.xlsx', size: '3.2 MB', classified: true },
        { name: 'Performance_Reviews.pdf', size: '7.8 MB', classified: true },
        { name: 'Training_Schedule.docx', size: '0.9 MB', classified: false },
        { name: 'Benefits_Package.pdf', size: '1.5 MB', classified: false }
    ],
    'Analytics': [
        { name: 'Customer_Data_2024.csv', size: '12.4 MB', classified: true },
        { name: 'Market_Analysis.pdf', size: '6.3 MB', classified: false },
        { name: 'Revenue_Dashboard.xlsx', size: '2.7 MB', classified: false },
        { name: 'User_Behavior_Report.pdf', size: '4.1 MB', classified: false }
    ]
};

// ── Security Event Bus ─────────────────────────────────────
class SecurityEventBus {
    constructor() {
        this.channel = new BroadcastChannel('cybercore-security');
        this.listeners = {};
        
        // Caches to preserve synchronous getter compatibility
        this.eventsCache = JSON.parse(localStorage.getItem('security-events') || '[]');
        this.sessionsCache = JSON.parse(localStorage.getItem('active-sessions') || '[]');
        this.activityCache = JSON.parse(localStorage.getItem('activity-log') || '[]');

        // Initialize Firebase Syncing
        this._initFirebaseSync();
    }

    _initFirebaseSync() {
        // Wait for Firebase to be ready via the globally injected script
        const waitInterval = setInterval(() => {
            if (window.firebase && window.firebase.database) {
                clearInterval(waitInterval);
                window.db = window.firebase.database();
                console.log("🔗 Connecting SecurityEventBus to Firebase Realtime Database...");
                
                // Continuous Sync: Security Events
                window.db.ref('cybercore/security-events').on('value', (snap) => {
                    if (snap.val()) {
                        // Firebase returns an object of pushes, we convert to array and sort reverse chronological
                        const arr = Object.values(snap.val()).sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
                        this.eventsCache = arr;
                        localStorage.setItem('security-events', JSON.stringify(arr.slice(0,200)));
                        this._emit('threat', arr[0]); // emit newest
                    }
                });

                // Continuous Sync: Active Sessions
                window.db.ref('cybercore/active-sessions').on('value', (snap) => {
                    if (snap.val()) {
                        this.sessionsCache = snap.val();
                        localStorage.setItem('active-sessions', JSON.stringify(this.sessionsCache));
                        this._emit('session', this.sessionsCache);
                    } else {
                        this.sessionsCache = [];
                        this._emit('session', []);
                    }
                });

                // Continuous Sync: Activity Log
                window.db.ref('cybercore/activity-log').on('value', (snap) => {
                    if (snap.val()) {
                        const arr = Object.values(snap.val()).sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
                        this.activityCache = arr;
                        localStorage.setItem('activity-log', JSON.stringify(arr.slice(0,500)));
                        this._emit('activity', arr[0]);
                    }
                });
            }
        }, 200);
    }

    // Helper: Send Real Email (EmailJS)
    sendThreatEmailAlert(threat, employeeEmail, employeeName) {
        if (!window.emailjs) {
            console.error('EmailJS SDK failed to load or is not yet initialized.');
            return;
        }

        const baseUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/'));
        const advisorUrl = `${baseUrl}/chatbot.html?threat=${threat.type || 'UNKNOWN'}&name=${encodeURIComponent(employeeName || 'Employee')}`;
        
        const templateParams = {
            to_email: employeeEmail,
            to_name: employeeName || 'Employee',
            threat_type: threat.threatName || threat.type || 'Unknown Threat',
            severity: threat.severity || 'UNKNOWN',
            ip_address: threat.sourceIP || 'Unknown IP',
            location: threat.newLocation || 'Unknown Location',
            timestamp: new Date(threat.timestamp).toLocaleString(),
            description: threat.description || 'A security violation has occurred on your account.',
            advisor_link: advisorUrl
        };

        window.emailjs.send(EMAIL_JS_SERVICE_ID, EMAIL_JS_TEMPLATE_ID, templateParams)
            .then((response) => {
                console.log('✅ SUCCESS: Threat email sent to ' + employeeEmail, response.status, response.text);
            }, (error) => {
                console.error('❌ FAILED to send threat email', error);
            });
    }

    // Report a new security threat
    reportThreat(threatData) {
        const event = {
            id: 'THR-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
            timestamp: new Date().toISOString(),
            ...threatData
        };

        let targetEmpEmail = null;
        let targetEmpName = null;
        if (event.empId) {
            const emp = EMPLOYEES.find(e => e.id === event.empId);
            if (emp) {
                targetEmpEmail = emp.email;
                targetEmpName = emp.name;
            }
        } else if (event.targetAccount) {
            const emp = EMPLOYEES.find(e => e.email === event.targetAccount);
            if (emp) {
                targetEmpEmail = emp.email;
                targetEmpName = emp.name;
            } else {
                targetEmpEmail = event.targetAccount;
                targetEmpName = "User";
            }
        }

        const isExcluded = 
            event.type === 'PRIVILEGE_ESCALATION' || event.type === 'Privilege Escalation' || 
            event.threatName === 'Privilege Escalation' || event.threatName === 'PRIVILEGE_ESCALATION' ||
            event.type === 'INSIDER_THREAT' || event.type === 'Insider Threat' ||
            event.threatName === 'Insider Threat' || event.threatName === 'INSIDER_THREAT';

        if (targetEmpEmail && !isExcluded) {
            this.sendThreatEmailAlert(event, targetEmpEmail, targetEmpName);
        } else if (targetEmpEmail) {
            console.log(`⚠️ Email skipped for ${event.type} to avoid disrupting intentional behavior.`);
        }

        // Push to Firebase instantly
        if (window.db) {
            window.db.ref('cybercore/security-events').push(event);
        } else {
            // Fallback if not connected yet
            this.eventsCache.unshift(event);
        }

        return event;
    }

    // Update active sessions
    updateSession(sessionData) {
        const existingIdx = this.sessionsCache.findIndex(s => s.empId === sessionData.empId);

        if (sessionData.action === 'login') {
            const session = {
                empId: sessionData.empId,
                empName: sessionData.empName,
                role: sessionData.role,
                department: sessionData.department,
                location: sessionData.location,
                loginTime: new Date().toISOString(),
                ipAddress: this._generateIP(),
                status: 'active'
            };
            if (existingIdx >= 0) {
                this.sessionsCache[existingIdx] = session;
            } else {
                this.sessionsCache.push(session);
            }
        } else if (sessionData.action === 'logout') {
            if (existingIdx >= 0) {
                this.sessionsCache.splice(existingIdx, 1);
            }
        } else if (sessionData.action === 'clear_all') {
            this.sessionsCache = [];
        }

        // Overwrite full array to Firebase
        if (window.db) {
            window.db.ref('cybercore/active-sessions').set(this.sessionsCache);
        }
    }

    // Log activity
    logActivity(activityData) {
        const activity = {
            id: 'ACT-' + Date.now(),
            timestamp: new Date().toISOString(),
            ...activityData
        };

        if (window.db) {
            window.db.ref('cybercore/activity-log').push(activity);
        }
    }

    // Listen for threats from Firebase changes
    onThreat(callback) {
        this._on('threat', callback);
    }

    // Listen for session updates
    onSessionUpdate(callback) {
        this._on('session', callback);
    }

    // Listen for activity
    onActivity(callback) {
        this._on('activity', callback);
    }

    // Synchronous Getters (Pulling from Live Firebase Cache)
    getEvents() {
        return this.eventsCache;
    }

    getSessions() {
        return this.sessionsCache;
    }

    getActivities() {
        return this.activityCache;
    }

    // Clear all data
    clearAll() {
        // Destroy Database
        if (window.db) {
            window.db.ref('cybercore').remove();
        }
        localStorage.removeItem('security-events');
        localStorage.removeItem('active-sessions');
        localStorage.removeItem('activity-log');
        localStorage.removeItem('failed-attempts');
        this.eventsCache = [];
        this.sessionsCache = [];
        this.activityCache = [];
    }

    // Internal event system
    _on(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }

    _emit(event, data) {
        (this.listeners[event] || []).forEach(cb => cb(data));
    }

    // Generate fake IP
    _generateIP() {
        return `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    }
}

// ── Helper Functions ───────────────────────────────────────
function formatTime(isoString) {
    const d = new Date(isoString);
    return d.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function formatDateTime(isoString) {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' + formatTime(isoString);
}

function timeSince(isoString) {
    const seconds = Math.floor((new Date() - new Date(isoString)) / 1000);
    if (seconds < 60) return seconds + 's ago';
    if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
    if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
    return Math.floor(seconds / 86400) + 'd ago';
}

// Global instance
const securityBus = new SecurityEventBus();

// ── Auto Demo Feature (For Hackathon Presentations) ────────
function startAutoDemo() {
    console.log("🚀 Starting Auto Demo: Generating threats every 30 seconds for live monitoring.");
    
    setInterval(() => {
        const randomEmp = EMPLOYEES[Math.floor(Math.random() * EMPLOYEES.length)];
        const types = Object.keys(THREAT_TYPES);
        const randomType = types[Math.floor(Math.random() * types.length)];
        const threatMeta = THREAT_TYPES[randomType];

        // Format to properly populate the UI
        const demoData = {
            type: randomType,
            threatName: threatMeta.name,
            severity: threatMeta.severity,
            description: threatMeta.description + ` (Auto Demo Event)`,
            empId: randomEmp.id,
            empName: randomEmp.name,
            sourceIP: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
            icon: threatMeta.icon,
            color: threatMeta.color
        };

        securityBus.reportThreat(demoData);
    }, 30000); // Trigger a threat every 30 seconds
}

// Only run the auto-demo when viewing the SOC dashboard 
// This prevents multiple browser tabs from creating overlapping intervals
if (window.location.pathname.includes('security.html')) {
    setTimeout(() => {
        // startAutoDemo(); // Uncomment to automatically start on load, or we can add a toggle button!
    }, 1000);
}
