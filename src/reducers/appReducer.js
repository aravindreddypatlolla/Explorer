import { success, error } from 'react-notification-system-redux';
// actions
export const AppActions = {
    notify: (type, options)=> {
        if(type === "success") {
            return success(options);
        }
    }
}