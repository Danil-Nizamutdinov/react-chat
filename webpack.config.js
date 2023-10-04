const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

let target = "web";
let mode = "development"; // По умолчанию режим development
if (process.env.NODE_ENV === "production") {
  // Режим production, если
  // при запуске вебпака было указано --mode=production
  mode = "production";
}

const plugins = [
  new HtmlWebpackPlugin({
    template: "./src/index.html", // Данный html будет использован как шаблон
  }),
]; // Создаем массив плагинов

if (process.env.SERVE) {
  // Используем плагин только если запускаем devServer
  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
  mode,
  plugins,
  target,
  resolve: {
    extensions: ["*", ".js", ".jsx", ".less"],
  },

  entry: "./src/index.js", // Указываем точку входа - главный модуль приложения,
  output: {
    path: path.resolve(__dirname, "dist"), // Директория, в которой будет
    // размещаться итоговый бандл, папка dist в корне приложения
    assetModuleFilename: "assets/[hash][ext][query]", // Все ассеты будут
    // складываться в dist/assets
    clean: true, // Очищает директорию dist перед обновлением бандла
  },

  devtool: "source-map", // ошибки
  devServer: {
    hot: true, // Включает автоматическую перезагрузку страницы при изменениях
    historyApiFallback: true,
    port: 8080,
  },
  module: {
    rules: [
      { test: /\.(html)$/, use: ["html-loader"] }, // Добавляем загрузчик для html
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "less-loader" },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: mode === "production" ? "asset" : "asset/resource", // В продакшен режиме
        // изображения размером до 8кб будут инлайнится в код
        // В режиме разработки все изображения будут помещаться в dist/assets
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // не обрабатываем файлы из node_modules
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true, // Использование кэша для избежания рекомпиляции
            // при каждом запуске
          },
        },
      },
      {
        test: /\.jsx?$/, // обновляем регулярное выражение для поддержки jsx
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
};
