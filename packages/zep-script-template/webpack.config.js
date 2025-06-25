const path = require("path");

class SequentialChunkRenamerPlugin {
    apply(compiler) {
        compiler.hooks.emit.tap("SequentialChunkRenamerPlugin", (compilation) => {
            const chunks = compilation.chunks.filter((chunk) => chunk.name !== "main").sort((a, b) => a.id - b.id);

            chunks.forEach((chunk, idx) => {
                const oldName = Array.from(chunk.files).find((f) => f.endsWith(".js") && f !== "main.js");
                if (!oldName) return;

                const newName = `chunk-local-${String(idx + 1).padStart(3, "0")}.js`;

                compilation.assets[newName] = compilation.assets[oldName];
                delete compilation.assets[oldName];
            });
        });
    }
}

module.exports = {
    mode: "production",
    entry: "./main.ts",
    module: {
        rules: [
            { test: /\.ts$/, use: "babel-loader", exclude: /node_modules/ },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: false,
                },
                exclude: /node_modules/
            }
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
        alias: {
            "zep-script": path.resolve(__dirname, "node_modules/zep-script"),
        },
    },

    output: {
        filename: "[name].js",
        chunkFilename: "[name].js",
        globalObject: "this",
        path: path.resolve(__dirname, "res"),
    },

    optimization: {
        minimize: false,
        chunkIds: "natural",
        runtimeChunk: false,

        splitChunks: {
            chunks: "all",
            minSize: 50 * 1024,
            maxSize: 128 * 1024,
            automaticNameDelimiter: "-",
            cacheGroups: {
                default: false,
                vendors: false,
                local: {
                    test: /[\\/]libs[\\/]/,
                    chunks: "all",
                    priority: 10,
                    reuseExistingChunk: true,
                },
            },
        },
    },

    plugins: [new SequentialChunkRenamerPlugin()],
};
