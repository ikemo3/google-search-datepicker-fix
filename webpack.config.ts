import { Configuration } from 'webpack';
import { join } from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const config: Configuration = {
    mode: 'development',
    entry: {
        google: join(__dirname, 'apps', 'content_script', 'google.ts'),
    },
    output: {
        path: join(__dirname, 'dist'),
        filename: 'content_script/[name].js',
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader' },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: 'apps/manifest.json',
                    to: '',
                },
                {
                    from: 'apps/_locales',
                    to: '_locales',
                },
                {
                    from: 'apps/icons',
                    to: 'icons',
                },
                {
                    from: 'apps/.web-extension-id',
                    to: '',
                },
            ],
        }),
    ],
    devtool: 'source-map',
};

export default config;
