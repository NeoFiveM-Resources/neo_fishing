//@ts-check

import {exec, exists, getFiles} from './utils.js';
import {createBuilder, createFxmanifest} from '@overextended/fx-utils';

const watch = process.argv.includes('--watch');
const web = await exists('./web');
const dropLabels = ['$BROWSER'];

if (!watch) dropLabels.push('$DEV');

createBuilder(
    watch,
    {
        keepNames: true,
        legalComments: 'inline',
        bundle: true,
        treeShaking: true,
    },
    [
        {
            name: 'server',
            options: {
                platform: 'node',
                target: ['node22'],
                format: 'cjs',
                dropLabels: [...dropLabels, '$CLIENT'],
            },
        },
        {
            name: 'client',
            options: {
                platform: 'browser',
                target: ['es2021'],
                format: 'iife',
                dropLabels: [...dropLabels, '$SERVER'],
            },
        },
    ],
    async (outfiles) => {
        const files = await getFiles('dist/web', 'static', 'locales');
        await createFxmanifest({
            client_scripts: [outfiles.client, '@ox_lib/init.lua'],
            server_scripts: [outfiles.server],
            files: ['locales/*.json', ...files],
            dependencies: ['/server:13019', '/onesync', 'oxmysql', 'ox_lib', 'ox_target'],
            metadata: {
                ui_page: 'dist/web/index.html',
                lua54: 'yes',
                node_version: '22',
            },
        });

        if (web && !watch) await exec("cd ./web && ng build --base-href /dist/web/ --configuration production");
    }
);

if (web && watch) await exec("cd ./web && ng build --watch --base-href /dist/web/ --configuration development");
