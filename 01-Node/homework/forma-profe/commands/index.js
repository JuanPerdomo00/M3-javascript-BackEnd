const fs = require('fs');
const request = require('request');

const echo = (args, print) => {
    print(args.join(' '))
}

const pwd = (args, print) => {
    print(__dirname.split('\\').at(-1))
}

const date = (args, print) => {
    print(Date())
}

const ls = (args, print) => {
    fs.readdir('.', (err, files) => {
        err
        ? console.log(err)
        : print(files.join('\n'))
    })
}

const cat = (args, print) => {
    fs.readFile(args[0], 'utf-8', (err, data) => {
        print(data)
    })
}

const head = (args, print) => {
    fs.readFile(args[0], 'utf-8', (err, data) => {
        print(data.split('\n').splice(0, 8).join('\n'))
    })
}

const tail = (args, print) => {
    fs.readFile(args[0], 'utf-8', (err, data) => {
        print(data.split('\n').splice(-5).join('\n'))
    })
}

const curl = (args, print) => {
    request(args[0], (err, data) => {
        print(data.body)
    })
}

module.exports = {
    echo,
    pwd,
    date,
    ls,
    cat,
    head,
    tail,
    curl
}