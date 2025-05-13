const widgetContext = require.context(
  // The directory to search within. Adjust as needed.
  "./",
  // Whether or not to search subdirectories.
  true,
  // A regular expression matching your widget file extensions.
  /\.widgets\.(ts|tsx|js|jsx)$/
);

// Automatically require each module.
widgetContext.keys().forEach(widgetContext);

// Optionally, export something if needed (e.g. an array of modules)
export default widgetContext.keys().map(widgetContext);
