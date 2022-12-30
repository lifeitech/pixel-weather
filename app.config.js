module.exports = ({config}) => {
    return {
    ...config,
    "hooks": {
        "postPublish": [
          {
            "file": "sentry-expo/upload-sourcemaps",
            "config": {
              "organization": "lifeitech",
              "project": "weather-app",
              "authToken": process.env.SENTRY_AUTH_TOKEN
            }
          }
        ]
      },
  }
}