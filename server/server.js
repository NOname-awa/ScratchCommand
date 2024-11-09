const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
const port = process.argv.slice(2)[0] || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'Command Executor' });
});

app.post('/execute', (req, res) => {
    const command = req.body.command;
    const shellPath = req.body.shell || '/usr/bin/bash';

    console.log(`执行：${command} 使用 shell: ${shellPath}`);
    exec(command, { shell: shellPath }, (error, stdout, stderr) => {
        if (error) {
            res.status(500).send(`Error: ${stderr}`);
        } else {
            res.send(stdout);
        }
    });
});

app.listen(port, () => {
    console.log(`服务：http://localhost:${port}`);
});
