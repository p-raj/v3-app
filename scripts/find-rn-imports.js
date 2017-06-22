const walk = require('babylon-walk');
const babylon = require('babylon');
const glob = require('glob');

const fs = require('fs');
const path = require('path');

const zip = (a, b, fn) => a.forEach((el, i) => fn(el, b[i], i));
const promisify = fn => new Promise((res, rej) => {
    const done = (err, val) => (err ? rej(err) : res(val));
    fn(done);
});
const getFile = fpath => promisify(cb => fs.readFile(fpath, 'utf8', cb));
const getFiles = fpath => promisify(cb => fs.readdir(fpath, cb));
const getGlobbedFiles = (g, opts) => promisify(cb => glob(g, opts, cb));

function getAST(data, file) {
    let tree;
    try {
        tree = babylon.parse(data, {
            sourceType: 'module',
            plugins: [
                'jsx',
                'flow',
                'objectRestSpread',
                'exportExtensions',
                'classProperties',
            ],
        });
        return tree;
    } catch (e) {
        console.error(file, e);
        return null;
    }
}

function getReactNativeImports(tree, collector) {
    walk.simple(tree, {
        ImportDeclaration: (node) => {
            if (node.source.value === 'react-native') {
                const names = node.specifiers
                    .filter(spec => spec.type === 'ImportSpecifier')
                    .map(spec => spec.imported.name);
                collector.push(...names);
            }
        },
    });
    return collector;
}

function getReactNativeImportsFromPath(file, collector) {
    return getFile(file)
        .then(str => getAST(str, file))
        .then(tree => getReactNativeImports(tree, collector));
}


const results = [];
getGlobbedFiles(process.argv[2], { dot: false, absolute: true })
    .then(files => Promise.all(files.map(f => getReactNativeImportsFromPath(f, results))))
    .then(() => {
        const amounts = {};
        results.forEach(name => {
            if (!amounts[name]) {
                amounts[name] = 0;
            }
            amounts[name] += 1;
        });
        process.stdout.write(`name\tcount\n`);
        Object.keys(amounts).forEach(key => {
            process.stdout.write(`${key}\t${amounts[key]}\n`);
        });
    });