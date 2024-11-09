class CommandExecutor {
    constructor(runtime) {
        this.runtime = runtime;
        this.shell = '/usr/bin/bash';
        this.port = '55000';
    }

    getInfo() {
        return {
            id: 'commandexecutor',
            name: '执行命令',
            color1: '#29cc00',
            color2: '#21a300',
            color3: '#21a300',
            blocks: [
                {
                    opcode: 'setShell',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '设置 shell 为 [SHELL]',
                    arguments: {
                        SHELL: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '/usr/bin/bash'
                        }
                    }
                },
                {
                    opcode: 'setPort',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '设置端口为 [PORT]',
                    arguments: {
                        PORT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '55000'
                        }
                    }
                },
                {
                    opcode: 'isServiceRunning',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '端口 [PORT] 上的命令服务是否运行',
                    arguments: {
                        PORT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '55000'
                        }
                    }
                },
                '---',
                {
                    opcode: 'toNull',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '抛弃输出 [CMD]',
                },
                {
                    opcode: 'executeCommand',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '执行命令 [CMD]',
                    arguments: {
                        CMD: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'echo Hello World'
                        }
                    }
                }
            ]
        };
    }

    setShell({ SHELL }) {
        this.shell = String(SHELL);
    }

    setPort({ PORT }) {
        this.port = String(PORT);
    }

    toNull() { }

    isServiceRunning({ PORT }) {
        return fetch(`http://localhost:${PORT}/health`)
            .then(response => {
                if (response.ok) {
                    return response.json().then(data => data.service === 'Command Executor');
                }
                return false;
            })
            .catch(() => false);
    }

    executeCommand({ CMD }) {
        const command = CMD;
        const shell = this.shell;
        return fetch(`http://localhost:${this.port}/execute`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ command, shell })
        })
            .then(response => response.text())
            .then(data => {
                console.log('Command output:', data);
                return data;
            })
            .catch(error => {
                console.error('Error:', error);
                return 'Error executing command';
            });
    }
}

Scratch.extensions.register(new CommandExecutor());
