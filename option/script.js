// Terminal functionality
const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');

// Available commands and their responses
const commands = {
    help: 'Available commands: help, about, skills, experience, contact, projects, uptime, clear',
    about: 'Senior Site Reliability Engineer with 15+ years of experience building and maintaining large-scale distributed systems. Passionate about automation, monitoring, and creating reliable infrastructure. When not debugging production issues, I enjoy running, photography, and exploring new technologies.',
    skills: 'Core Skills:\n• Cloud Platforms: AWS, GCP, Azure\n• Containers: Docker, Kubernetes\n• Monitoring: Prometheus, Grafana, ELK Stack\n• Programming: Python, Go, Bash\n• IaC: Terraform, Ansible\n• CI/CD: Jenkins, GitLab CI, GitHub Actions',
    experience: 'Professional Experience:\n• 15+ years in Site Reliability Engineering\n• Built monitoring systems for 99.99% uptime\n• Managed infrastructure serving millions of users\n• Led incident response and post-mortem processes\n• Automated deployment pipelines and scaling\n• Mentored junior engineers and cross-functional teams',
    contact: 'Get in touch:\n• Email: sre@yourname.com\n• LinkedIn: /in/yourprofile\n• GitHub: /yourusername\n• Location: Available for remote or hybrid opportunities',
    projects: 'Recent Projects:\n• Kubernetes Auto-scaling Solution\n• Prometheus Monitoring Stack\n• Infrastructure as Code Templates\n• Incident Response Toolkit\n• SLO/SLI Calculator\n• Log Analysis Automation',
    uptime: `System uptime: ${Math.floor(Math.random() * 1000)} days, ${Math.floor(Math.random() * 24)} hours, ${Math.floor(Math.random() * 60)} minutes`,
    clear: 'CLEAR_TERMINAL',
    whoami: 'Senior Site Reliability Engineer',
    pwd: '/home/visitor/portfolio',
    ls: 'about.txt  skills.md  experience.log  projects/  contact.info',
    date: new Date().toString(),
};

// Handle terminal input
terminalInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const command = this.value.trim().toLowerCase();
        const output = document.createElement('div');
        
        // Display the command
        const commandLine = document.createElement('div');
        commandLine.innerHTML = `<span class="prompt">visitor@portfolio:</span><span class="path">~</span>$ ${this.value}`;
        terminalOutput.appendChild(commandLine);
        
        // Process command
        if (command === 'clear') {
            terminalOutput.innerHTML = '<div class="output">Terminal cleared.</div>';
        } else if (commands[command]) {
            output.className = 'output';
            output.innerHTML = commands[command].replace(/\n/g, '<br>');
            terminalOutput.appendChild(output);
        } else if (command === '') {
            // Do nothing for empty command
        } else {
            output.className = 'output';
            output.innerHTML = `bash: ${command}: command not found<br>Type 'help' for available commands.`;
            terminalOutput.appendChild(output);
        }
        
        // Clear input and scroll to bottom
        this.value = '';
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});

// Focus terminal input when clicking anywhere in the terminal
document.querySelector('.interactive-terminal').addEventListener('click', function() {
    terminalInput.focus();
});

// Auto-focus on load
window.addEventListener('load', function() {
    terminalInput.focus();
});

// Typing effect function (optional - can be used for animations)
function typeWriter(element, text, speed = 50) {
    element.innerHTML = '';
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Smooth scroll for navigation
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Additional interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add some easter eggs
    const easterEggs = {
        'sudo': 'Nice try! You don\'t have sudo privileges here. 😄',
        'rm -rf /': 'Whoa there! Let\'s keep things safe. 🛡️',
        'exit': 'There\'s no escape from this portfolio! 🚪',
        'top': 'PID    COMMAND     %CPU\n1337   portfolio    95.0\n42     creativity   5.0',
        'ps': 'PID TTY          TIME CMD\n1337 pts/0    00:00:01 portfolio\n1338 pts/0    00:00:00 bash',
        'uname': 'Portfolio OS 1.0 (Creative Terminal Distribution)',
        'fortune': 'A good SRE is like a good joke - if you have to explain it, it\'s probably not working.',
    };
    
    // Add easter eggs to commands
    Object.assign(commands, easterEggs);
});

// Add terminal history functionality
let commandHistory = [];
let historyIndex = -1;

terminalInput.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            this.value = commandHistory[commandHistory.length - 1 - historyIndex] || '';
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            this.value = commandHistory[commandHistory.length - 1 - historyIndex] || '';
        } else if (historyIndex === 0) {
            historyIndex = -1;
            this.value = '';
        }
    } else if (e.key === 'Enter') {
        const command = this.value.trim();
        if (command) {
            commandHistory.push(command);
            historyIndex = -1;
        }
    }
});