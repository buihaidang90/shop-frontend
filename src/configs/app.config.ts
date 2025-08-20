export default {
    appName: import.meta.env.VITE_APP_NAME ?? 'Shop-Frontend',
    isDebug: import.meta.env.VITE_APP_DEBUG === 'true' || import.meta.env.VITE_APP_DEBUG === 'yes' || import.meta.env.VITE_APP_DEBUG === '1',
    isLogging: import.meta.env.VITE_APP_LOGGING === 'true' || import.meta.env.VITE_APP_LOGGING === 'yes' || import.meta.env.VITE_APP_LOGGING === '1',
    apiUrl: import.meta.env.VITE_API_URL,
//   baseURL: import.meta.env.VITE_BACKEND_URL,
//   publicUrl: import.meta.env.VITE_PUBLIC_URL,
}