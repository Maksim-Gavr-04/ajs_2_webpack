// Подключение модуля 'path' из Node.js для работы с путями файлов
const path = require('path'); 
// Подключение плагина 'html-webpack-plugin' для генерации HTML файлов:
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
// Подключение плагина 'mini-css-extract-plugin' для извлечения CSS в отдельные файлы:
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  // Указание точки входа в приложение
  entry: './src/index.js',
  // Описываем, куда следует поместить результат работы:
  output: {
    // Указание пути для вывода собранных файлов в папку 'dist' в текущем каталоге:
    path: path.resolve(__dirname, 'dist'),
    // Имя файла со сборкой:
    filename: 'main.js'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        // Определение, что эти правила применяются к JavaScript-файлам:
        test: /\.js$/i, 
        // Исключение папки 'node_modules' из обработки:
        exclude: /node_modules/,
        use: {
          // Использование Babel для транспиляции JavaScript:
          loader: 'babel-loader',
        },
      },
      {
        // Определение, что эти правила применяются к HTML-файлам:
        test: /\.html$/i,
        // Использование 'html-loader' для обработки HTML-файлов:
        loader: "html-loader",
      },
      {
        // Определение, что эти правила применяются к CSS-файлам:
        test: /\.css$/i,
        // Использование 'MiniCSSExtractPlugin.loader' и 'css-loader' для обработки CSS-файлов:
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Указание исходного HTML-файла для генерации
      filename: 'main.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
}
