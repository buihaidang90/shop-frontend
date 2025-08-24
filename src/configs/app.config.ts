export default {
    appName: import.meta.env.VITE_APP_NAME ?? 'Shop-Frontend',
    isDebug: true,// import.meta.env.VITE_APP_DEBUG === 'true' || import.meta.env.VITE_APP_DEBUG === 'yes' || import.meta.env.VITE_APP_DEBUG === '1',
    isLogging: import.meta.env.VITE_APP_LOGGING === 'true' || import.meta.env.VITE_APP_LOGGING === 'yes' || import.meta.env.VITE_APP_LOGGING === '1',
    apiUrl: import.meta.env.VITE_API_URL,
}